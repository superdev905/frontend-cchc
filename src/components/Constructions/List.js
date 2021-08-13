import { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid } from '@material-ui/core'
import constructionAction from '../../state/actions/constructions'
import { DataTable } from '../Shared'
import { SearchInput, Wrapper, StatusChip, Button, Select } from '../UI'
import ConstructionModal from './CreateModal'
import { useToggle } from '../../hooks'

const List = ({ ...props }) => {
  const dispatch = useDispatch()

  const { open, toggleOpen } = useToggle()
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    skip: 0,
    limit: 30,
    search: '',
    status: ''
  })
  const { list } = useSelector((state) => state.constructions)

  const searchChange = (e) => {
    setFilters({ ...filters, search: e.target.value })
  }

  const handleStatusChange = (e) => {
    setFilters({ ...filters, status: e.target.value })
  }

  const createConstruction = (values) =>
    dispatch(
      constructionAction.createConstruction({
        ...values,
        state: 'ACTIVE',
        typology_id: values.typology_id || null
      })
    )

  const handleRowClick = (row) => {
    props.history.push(`/obras/${row.id}`)
  }

  const fetchConstructions = () => {
    setLoading(true)
    dispatch(
      constructionAction.getConstructions({
        ...filters,
        search: filters.search.trim()
      })
    ).then(() => {
      setLoading(false)
    })
  }
  useEffect(() => {
    fetchConstructions()
  }, [filters])
  return (
    <div>
      <Wrapper>
        <Grid container spacing={1}>
          <Grid item xs={12} md={2}>
            <Select name="status" onChange={handleStatusChange}>
              <option value="">Todos</option>
              {[
                { key: 'VIGENTE', name: 'Vigente' },
                { key: 'NO_VIGENTE', name: 'No vigente' }
              ].map((item) => (
                <option key={`employee--filters-${item.key}`} value={item.key}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={4}>
            <SearchInput
              value={filters.search}
              placeholder="Buscar por: razón social, rut"
              onChange={searchChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={toggleOpen}>Nueva obra</Button>
            </Box>
          </Grid>
        </Grid>
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
              name: 'Nombre',
              selector: 'name',
              sortable: true
            },
            {
              name: 'Vigencia',
              selector: 'is_partner',
              cell: (row) => (
                <StatusChip
                  {...row}
                  success={row.status === 'VIGENTE'}
                  error={row.status === 'NO_VIGENTE'}
                  label={row.status === 'VIGENTE' ? 'Vigente' : 'No vigente'}
                />
              ),
              hide: 'md'
            },
            {
              name: 'Dirección',
              selector: 'address',
              hide: 'md'
            },
            {
              name: 'Empresa',
              selector: 'business.business_name',
              hide: 'md'
            }
          ]}
          data={list}
          onRowClicked={handleRowClick}
          pagination
        />
      </Wrapper>
      <ConstructionModal
        open={open}
        onClose={toggleOpen}
        selectClient={true}
        submitFunction={createConstruction}
        successMessage="Obra creada exitosamente"
        successFunction={fetchConstructions}
      />
    </div>
  )
}
export default withRouter(List)
