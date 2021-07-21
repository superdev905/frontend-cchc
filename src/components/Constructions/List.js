import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import constructionAction from '../../state/actions/constructions'
import { DataTable } from '../Shared'
import { SearchInput, Wrapper, StatusChip } from '../UI'

const List = ({ ...props }) => {
  const dispatch = useDispatch()

  const { list, filters } = useSelector((state) => state.constructions)

  const searchChange = (e) => {
    dispatch(
      constructionAction.updateFilters({ ...filters, search: e.target.value })
    )
  }

  const handleRowClick = (row) => {
    props.history.push(`/obras/${row.id}`)
  }

  const fetchConstructions = () => {
    dispatch(constructionAction.getConstructions(filters))
  }
  useEffect(() => {
    fetchConstructions()
  }, [filters])
  return (
    <div>
      <Wrapper>
        <Grid container>
          <Grid item xs={6}>
            <SearchInput
              value={filters.search}
              placeholder="Buscar por empresa"
              onChange={searchChange}
            />
          </Grid>
        </Grid>
      </Wrapper>
      <Wrapper>
        <DataTable
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
              name: 'Estado',
              selector: 'is_partner',
              cell: (row) => (
                <StatusChip
                  {...row}
                  success={row.state === 'VIGENTE'}
                  error={row.state === 'NO_VIGENTE'}
                  label={row.state === 'VIGENTE' ? 'Vigente' : 'No vigente'}
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
    </div>
  )
}
export default withRouter(List)
