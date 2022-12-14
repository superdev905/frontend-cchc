import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiDownload as DownloadIcon } from 'react-icons/fi'
import { Box, Chip, Grid, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import protocolsActions from '../../state/actions/protocols'
import filesActions from '../../state/actions/files'
import { useToggle } from '../../hooks'
import { formatDate } from '../../formatters'
import { DataTable } from '../Shared'
import Can from '../Can'
import {
  SearchInput,
  Button,
  Wrapper,
  Select,
  StatusChip,
  ActionsTable
} from '../UI'
import DetailsDraw from './Details'
import ProtocolDialog from './Dialog'

const ProtocolsList = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(null)
  const [filters, setFilters] = useState({
    page: 1,
    size: 30,
    search: '',
    status: ''
  })
  const { list } = useSelector((state) => state.protocols)
  const { open: openDetails, toggleOpen: toggleOpenDetails } = useToggle()
  const { open: openCreate, toggleOpen: toggleOpenCreate } = useToggle()

  const handleStatusChange = (e) => {
    setFilters({ ...filters, status: e.target.value })
  }

  const createProtocol = (values) =>
    dispatch(protocolsActions.createProtocol(values))

  const fetchProtocols = () => {
    setLoading(true)
    const query = { ...filters }

    if (query.status) {
      query.validity = query.status === 'VIGENTE'
      delete query.status
    }
    delete query.status
    dispatch(
      protocolsActions.getProtocols({
        ...query,
        search: query.search.trim()
      })
    ).then(() => {
      setLoading(false)
    })
  }
  const searchButton = () => {
    fetchProtocols()
  }

  useEffect(() => {
    fetchProtocols()
  }, [])

  return (
    <Box>
      <Wrapper>
        <Box>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} md={2}>
              <Select name="status" onChange={handleStatusChange}>
                <option value="">Todos</option>
                {[
                  { name: 'VIGENTE', index: 'VIGENTE' },
                  { name: 'NO VIGENTE', index: 'NO_VIGENTE' }
                ].map((item) => (
                  <option key={`option-valid-${item.index}`} value={item.index}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <SearchInput
                value={filters.search}
                placeholder="Buscar Por Nombre"
                onChange={(e) => {
                  setFilters({ ...filters, search: e.target.value })
                }}
              >
                <IconButton onClick={searchButton}>
                  <SearchIcon color="primary" fontSize="large" />
                </IconButton>
              </SearchInput>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="flex-end">
                <Can
                  availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
                  yes={() => (
                    <Button onClick={toggleOpenCreate}>Nuevo Protocolo</Button>
                  )}
                  no={() => null}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <DataTable
          data={list}
          progressPending={loading}
          emptyMessage={
            filters.search
              ? `No se encontraron resultados para: ${filters.search}`
              : 'No hay datos por mostrar'
          }
          highlightOnHover
          pointerOnHover
          columns={[
            {
              name: 'Titulo',
              selector: (row) => row.title,
              sortable: true
            },

            {
              name: 'Fecha de inicio',
              selector: (row) => formatDate(row.startDate, {})
            },
            {
              name: 'Fecha de fin',
              selector: (row) => formatDate(row.endDate, {})
            },
            {
              name: 'Estado',
              selector: (row) => (
                <StatusChip
                  label={row.isValid ? 'Vigente' : 'No vigente'}
                  success={row.isValid}
                  error={!row.isValid}
                />
              )
            },
            {
              name: 'Modulos',
              selector: (row) => (
                <>
                  {row.modules.map((item) => (
                    <Chip
                      key={`${row.title}-chip-${item.id}`}
                      color="primary"
                      label={item.module.name}
                    />
                  ))}
                </>
              )
            },
            {
              name: 'Opciones',
              right: true,
              selector: (row) => (
                <ActionsTable
                  onView={() => {
                    setCurrent(row)
                    toggleOpenDetails()
                  }}
                  moreOptions={[
                    {
                      icon: <DownloadIcon />,
                      onClick: () => {
                        dispatch(
                          filesActions.downloadFile(
                            row.file.fileUrl,
                            row.file.fileName
                          )
                        )
                      }
                    }
                  ]}
                />
              )
            }
          ]}
          pagination
          onRowClicked={(row) => {
            setCurrent(row)
            toggleOpenDetails()
          }}
          paginationRowsPerPageOptions={[30, 40]}
          paginationPerPage={filters.size}
          paginationServer={true}
          onChangeRowsPerPage={(limit) => {
            setFilters({ ...filters, size: limit })
          }}
          onChangePage={(page) => {
            setFilters({ ...filters, page })
          }}
        />
        {openCreate && (
          <ProtocolDialog
            open={openCreate}
            onClose={toggleOpenCreate}
            submitFunction={createProtocol}
          />
        )}
        {openDetails && current && (
          <DetailsDraw
            protocolId={current.id}
            open={openDetails}
            onClose={toggleOpenDetails}
          />
        )}
      </Wrapper>
    </Box>
  )
}

export default ProtocolsList
