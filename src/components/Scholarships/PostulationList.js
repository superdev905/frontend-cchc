import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, withRouter } from 'react-router-dom'
import { Box, Grid } from '@material-ui/core'
import { Button, SearchInput, Select, StatusChip, Wrapper } from '../UI'
import { formatSearchWithRut } from '../../formatters'
import scholarshipsActions from '../../state/actions/scholarships'
import CreateDialog from './Create/CreateDialog'
import { DataTable } from '../Shared'

const PostulationList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    page: 1,
    size: 30,
    search: '',
    state: ''
  })
  const { showCreateModal } = useSelector((state) => state.scholarships)
  const { total, applicationsList } = useSelector((state) => state.scholarships)

  const toggleCreateModal = () => {
    dispatch(scholarshipsActions.toggleCreateModal(showCreateModal))
  }

  const addButtonClick = () => {
    dispatch(scholarshipsActions.toggleCreateModal(showCreateModal))
  }

  const onSearchChange = (e) => {
    const { value } = e.target

    setFilters({
      ...filters,
      search: formatSearchWithRut(value.toString()),
      page: 1
    })
  }
  const handleStatusChange = (e) => {
    setFilters({ ...filters, state: e.target.value })
  }

  const onRowClick = (row) => {
    history.push(`/postulations/${row.id}`)
  }

  const fetchPostulations = () => {
    setLoading(true)
    dispatch(
      scholarshipsActions.getPostulations({
        ...filters,
        search: filters.search.trim()
      })
    ).then(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchPostulations()
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
                  { key: 'CREATED', name: 'Activos' },
                  { key: 'DELETED', name: 'Eliminados' }
                ].map((item) => (
                  <option
                    key={`employee--filters-${item.key}`}
                    value={item.key}
                  >
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <SearchInput
                value={filters.search}
                onChange={onSearchChange}
                placeholder="Buscar por: beca, estado"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={addButtonClick}>Nueva postulación</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Wrapper>
      <Wrapper>
        <DataTable
          progressPending={loading}
          emptyMessage={
            filters.search
              ? `No se encontraron resultados para: ${filters.search}`
              : 'Aún no hay postulaciones'
          }
          highlightOnHover
          pointerOnHover
          columns={[
            {
              name: 'Beca',
              selector: (row) => row.scholarshipType?.name,
              sortable: true
            },
            {
              name: 'Trabajador',
              selector: (row) => row.employeeNames
            },
            {
              name: 'Beneficiario',
              selector: (row) => row.beneficiaryNames,
              hide: 'md'
            },
            {
              name: 'Empresa',
              selector: (row) => row.businessName,
              hide: 'md'
            },
            {
              name: 'Estado',
              hide: 'md',

              cell: (row) => (
                <StatusChip
                  label={`${
                    row.state === 'DELETED' ? 'Rechazada' : 'Aprobada'
                  } `}
                  success={row.state === 'CREATED'}
                  error={row.state === 'DELETED'}
                />
              )
            }
          ]}
          data={applicationsList}
          pagination
          onRowClicked={onRowClick}
          paginationRowsPerPageOptions={[30, 40]}
          paginationPerPage={filters.limit}
          paginationServer={true}
          onChangeRowsPerPage={(limit) => {
            setFilters({ ...filters, limit })
          }}
          onChangePage={(page) => {
            setFilters({ ...filters, skip: page })
          }}
          paginationTotalRows={total}
        />
      </Wrapper>

      <CreateDialog open={showCreateModal} onClose={toggleCreateModal} />
    </Box>
  )
}

export default withRouter(PostulationList)
