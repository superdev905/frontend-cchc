import { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Chip, Grid } from '@material-ui/core'
import constructionAction from '../../state/actions/constructions'
import { DataTable } from '../Shared'
import { SearchInput, Wrapper } from '../UI'

const List = ({ ...props }) => {
  const dispatch = useDispatch()
  const [filters, setFilters] = useState({ skip: 0, limit: 25 })
  const { list } = useSelector((state) => state.constructions)

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
              value={filters.search || ''}
              placeholder="Buscar por empresa"
              onChange={(e) => {
                setFilters({ ...filters, search: e.target.value })
              }}
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
              cell: (row) => <Chip {...row} label={row.state}></Chip>,
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
