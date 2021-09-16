import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Box, Grid } from '@material-ui/core'
import scholarshipsActions from '../../state/actions/scholarships'
import { Button, SearchInput, Select, Wrapper } from '../UI'
import { formatSearchWithRut } from '../../formatters'
import CreateDialog from './Create/CreateDialog'

const ApplicationList = () => {
  const dispatch = useDispatch()
  const [filters, setFilters] = useState({
    page: 1,
    size: 30,
    search: '',
    state: ''
  })
  const { showCreateModal } = useSelector((state) => state.scholarships)

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

      <CreateDialog open={showCreateModal} onClose={toggleCreateModal} />
    </Box>
  )
}

export default withRouter(ApplicationList)
