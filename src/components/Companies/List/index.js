import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Box, Grid } from '@material-ui/core'
import companiesActions from '../../../state/actions/companies'
import { ActionsTable, Button, SearchInput, Wrapper } from '../../UI'
import CreateCompany from '../Create'
import { DataTable } from '../../Shared'
import StatusChip from '../../UI/StatusChip'

const List = ({ ...props }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { list, showCreateModal, filters } = useSelector(
    (state) => state.companies
  )

  const toggleCreateModal = () => {
    dispatch(companiesActions.toggleCreateModal(showCreateModal))
  }

  const handleRowClick = (row) => {
    props.history.push(`/company/${row.id}/details`)
  }
  const addButtonClick = () => {
    dispatch(companiesActions.toggleCreateModal(showCreateModal))
  }

  const onSearchChange = (e) => {
    const { value } = e.target
    dispatch(
      companiesActions.updateFilters({
        ...filters,
        search: value.toString(),
        page: 0
      })
    )
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

  useEffect(() => {
    fetchCompanies()
  }, [filters])

  return (
    <Box>
      <Wrapper>
        <Box>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <SearchInput
                value={filters.search}
                onChange={onSearchChange}
                placeholder="Buscar por: razón social, rut"
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
              : 'Aún no se registraron empresas'
          }
          highlightOnHover
          pointerOnHover
          progressPending={loading}
          columns={[
            {
              name: 'Razón social',
              selector: 'business_name',
              sortable: true
            },
            {
              name: 'Rut',
              selector: 'rut'
            },
            {
              name: 'Correo',
              selector: 'email',

              hide: 'md'
            },
            {
              name: 'Estado',
              selector: 'state',
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
              name: 'Dirección',
              selector: 'address',
              hide: 'md'
            },
            {
              right: true,
              cell: (row) => <ActionsTable onView={() => handleRowClick(row)} />
            }
          ]}
          data={list}
          pagination
          onRowClicked={handleRowClick}
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
