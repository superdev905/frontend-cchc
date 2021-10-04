import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Box, Grid } from '@material-ui/core'
import { Button, SearchInput, Select, Wrapper } from '../UI'
import { formatSearchWithRut } from '../../formatters'
import Can from '../Can'
import { scholarshipConfig } from '../../config'

const CoursesList = () => {
  const [filters, setFilters] = useState({
    page: 1,
    size: 30,
    search: '',
    status: ''
  })

  const onSearchChange = (e) => {
    const { value } = e.target

    setFilters({
      ...filters,
      search: formatSearchWithRut(value.toString()),
      page: 1
    })
  }
  const handleStatusChange = (e) => {
    setFilters({ ...filters, status: e.target.value })
  }

  return (
    <Wrapper>
      <Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={2}>
            <Select name="status" onChange={handleStatusChange}>
              <option value="">Todos</option>
              {scholarshipConfig.revisionStatus.map((item) => (
                <option
                  key={`application--filters-${item.key}`}
                  value={item.status}
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
              placeholder="Buscar por: Trabajador, curso, empresa"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="flex-end">
              <Can
                availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
                yes={() => <Button>Nuevo curso</Button>}
                no={() => null}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  )
}

export default withRouter(CoursesList)
