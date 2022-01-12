import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FiDownload as DownloadIcon } from 'react-icons/fi'
import { Box, Chip, Grid } from '@material-ui/core'
import protocolsActions from '../../state/actions/protocols'
import filesActions from '../../state/actions/files'
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
import { formatDate } from '../../formatters'
import CreateProtocol from './Create'

const ProtocolsList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    page: 1,
    size: 30,
    search: '',
    status: ''
  })
  const { list, showCreateModal } = useSelector((state) => state.protocols)

  const handleStatusChange = (e) => {
    setFilters({ ...filters, status: e.target.value })
  }

  const onRowClick = (row) => {
    history.push(`/protocols/${row.id}`)
  }

  const toggleCreateModal = () => {
    dispatch(protocolsActions.toggleCreateModal(showCreateModal))
  }

  const addButtonClick = () => {
    dispatch(protocolsActions.toggleCreateModal(showCreateModal))
  }

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

  useEffect(() => {
    fetchProtocols()
  }, [filters])

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
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="flex-end">
                <Can
                  availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
                  yes={() => (
                    <Button onClick={addButtonClick}>Nuevo Protocolo</Button>
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
              : 'no hay postulaciones'
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
                  onView={() => {}}
                  moreOptions={[
                    {
                      icon: <DownloadIcon color="primary" />,
                      onClick: () => {
                        dispatch(filesActions.downloadFile(row.file.fileUrl))
                      }
                    }
                  ]}
                />
              )
            }
          ]}
          pagination
          onRowClicked={onRowClick}
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
      </Wrapper>

      <CreateProtocol open={showCreateModal} onClose={toggleCreateModal} />
    </Box>
  )
}

export default ProtocolsList
