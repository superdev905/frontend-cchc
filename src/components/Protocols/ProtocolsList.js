import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, Grid } from '@material-ui/core'
import protocolsActions from '../../state/actions/Protocols'
import { DataTable } from '../Shared'
import Can from '../Can'
import { SearchInput, Button, Wrapper, Select } from '../UI'
import { formatDate } from '../../formatters'

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

  const handleStatusChange = (e) => {
    setFilters({ ...filters, status: e.target.value })
  }

  const onRowClick = (row) => {
    history.push(`/protocols/${row.id}`)
  }

  const fetchProtocols = () => {
    setLoading(true)
    dispatch(
      protocolsActions.getProtocols({
        ...filters,
        search: filters.search.trim()
      })
    ).then(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchProtocols()
  }, [filters])

  return (
    <Wrapper>
      <Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={2}>
            <Select name="status" onChange={handleStatusChange}>
              <option value="">Todos</option>
            </Select>
          </Grid>
          <Grid item xs={12} md={4}>
            <SearchInput
              value={filters.search}
              placeholder="Buscar Por Nombre"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="flex-end">
              <Can
                availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
                yes={() => <Button>Nuevo Protocolo</Button>}
                no={() => null}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <DataTable
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
            selector: (row) => row.title
          },
          {
            name: 'Modulos',
            selector: (row) => row.modules,
            hide: 'md'
          },
          {
            name: 'Fecha de inicio',
            selector: (row) => formatDate(row.startDate, {}),
            hide: 'md'
          },
          {
            name: 'Fecha de fin',
            selector: (row) => formatDate(row.endDate, {}),
            hide: 'md'
          },
          {
            name: 'Vigente',
            selector: (row) => row.isActive
          },
          {
            name: 'Archivo',
            selector: (row) => row.file,
            hide: 'md'
          }
        ]}
        pagination
        onRowClicked={onRowClick}
        paginationRowsPerPageOptions={[15]}
        paginationPerPage={filters.size}
        paginationServer={true}
        onChangeRowsPerPage={(limit) => {
          setFilters({ ...filters, size: limit })
        }}
        onChangePage={(page) => {
          setFilters({ ...filters, skip: page })
        }}
      />
    </Wrapper>
  )
}

export default ProtocolsList
