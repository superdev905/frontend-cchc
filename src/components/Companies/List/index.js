import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Box, Grid, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import companiesActions from '../../../state/actions/companies'
import { ActionsTable, Button, SearchInput, Select, Wrapper } from '../../UI'
import CreateCompany from '../Create'
import { DataTable } from '../../Shared'
import StatusChip from '../../UI/StatusChip'
import { formatSearchWithRut } from '../../../formatters'

const List = ({ ...props }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    search: '',
    state: ''
  })
  const {
    list,
    showCreateModal,
    total: totalDocs
  } = useSelector((state) => state.companies)

  const toggleCreateModal = () => {
    dispatch(companiesActions.toggleCreateModal(showCreateModal))
  }

  const handleRowClick = (row) => {
    props.history.push(`/company/${row.id}/details`)
  }
  const addButtonClick = () => {
    dispatch(companiesActions.toggleCreateModal(showCreateModal))
  }

  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      search: formatSearchWithRut(e.target.value.toString()),
      page: 1
    })
  }
  const handleStatusChange = (e) => {
    setFilters({ ...filters, state: e.target.value })
  }

  const fetchCompanies = () => {
    setLoading(true)
    dispatch(companiesActions.getCompanies(filters))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  const searchButton = () => {
    fetchCompanies()
  }
  useEffect(() => {
    fetchCompanies()
  }, [])

  return (
    <Box>
      <Wrapper>
        <Box>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} md={7}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
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
                <Grid item xs={12} md={9}>
                  <SearchInput
                    value={filters.search}
                    onChange={handleSearchChange}
                    placeholder="Buscar por: raz??n social, rut"
                  >
                    <IconButton onClick={searchButton}>
                      <SearchIcon color="primary" fontSize="large" />
                    </IconButton>
                  </SearchInput>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={addButtonClick}>Nueva empresa</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Wrapper>
      <Wrapper>
        <DataTable
          emptyMessage={
            filters.search
              ? `No se encontraron resultados para: ${filters.search}`
              : 'A??n no se registraron empresas'
          }
          highlightOnHover
          pointerOnHover
          progressPending={loading}
          columns={[
            {
              name: 'Raz??n social',
              selector: (row) => row.business_name,
              sortable: true
            },
            {
              name: 'Rut',
              selector: (row) => row.rut
            },
            {
              name: 'Correo',
              selector: (row) => row.email,
              hide: 'md'
            },
            {
              name: 'Estado',
              selector: (row) => row.state,
              hide: 'md',
              center: true,
              cell: (row) => (
                <StatusChip
                  label={row.state === 'CREATED' ? 'Activo' : 'Eliminado'}
                  error={row.state !== 'CREATED'}
                  success={row.state === 'CREATED'}
                />
              )
            },
            {
              name: 'Direcci??n',
              selector: (row) => row.address,
              hide: 'md'
            },
            {
              right: true,
              cell: (row) => <ActionsTable onView={() => handleRowClick(row)} />
            }
          ]}
          data={list}
          onRowClicked={handleRowClick}
          pagination
          paginationRowsPerPageOptions={[10, 20, 30, 40]}
          paginationPerPage={filters.size}
          paginationServer={true}
          onChangeRowsPerPage={(limit) => {
            setFilters({ ...filters, size: limit })
          }}
          onChangePage={(page) => {
            setFilters({ ...filters, page })
          }}
          paginationTotalRows={totalDocs}
        />
      </Wrapper>

      <CreateCompany
        open={showCreateModal}
        onClose={toggleCreateModal}
        successFunction={fetchCompanies}
      />
    </Box>
  )
}

export default withRouter(List)
