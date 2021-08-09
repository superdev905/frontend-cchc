import { Box, Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { formatDate } from '../../formatters'
import { useToggle } from '../../hooks'
import employeesActions from '../../state/actions/employees'
import { DataTable } from '../Shared'
import { Button, SearchInput, Select, StatusChip, Wrapper } from '../UI'
import EmployeeForm from './EmployeeForm'

const ListEmployees = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    skip: 0,
    limit: 30,
    search: '',
    state: ''
  })
  const { open, toggleOpen } = useToggle()
  const { list: listEmployees } = useSelector((state) => state.employees)

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value })
  }

  const handleStateChange = (e) => {
    setFilters({ ...filters, state: e.target.value })
  }

  const fetchEmployees = () => {
    setLoading(true)
    dispatch(
      employeesActions.getEmployees({
        ...filters,
        search: filters.search.trim()
      })
    )
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  const onRowClick = (row) => {
    history.push(`/employee/${row.id}/info`)
  }

  const afterCreateEmployee = (createData) => {
    history.push(`/employee/${createData.id}/info`)
  }
  const createEmployee = (values) =>
    dispatch(employeesActions.createEmployee(values))

  useEffect(() => {
    setTableData(
      listEmployees.map((item) => ({
        ...item,
        last_name: `${item.paternal_surname} ${item.maternal_surname}`,
        born_date: formatDate(item.born_date)
      }))
    )
  }, [listEmployees])

  useEffect(() => {
    fetchEmployees()
  }, [filters])

  return (
    <Box>
      <Wrapper>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <Select
                value={filters.state}
                name="state"
                onChange={handleStateChange}
              >
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
                placeholder="Buscar por: Nombres, RUN"
                onChange={handleSearchChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={toggleOpen}>Nuevo trabajador</Button>
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
              : 'Aún no hay trabajadores creados'
          }
          highlightOnHover
          pointerOnHover
          columns={[
            {
              name: 'Run',
              selector: 'run',
              sortable: true
            },
            {
              name: 'Nombres',
              selector: 'names'
            },
            {
              name: 'Apellidos',
              selector: 'last_name',
              hide: 'md'
            },
            {
              name: 'Fecha de nacimiento',
              selector: 'born_date',
              hide: 'md'
            },
            {
              name: 'Estado',
              selector: '',
              hide: 'md',

              cell: (row) => (
                <StatusChip
                  label={`${row.state === 'DELETED' ? 'Eliminado' : 'Activo'} `}
                  success={row.state === 'CREATED'}
                  error={row.state === 'DELETED'}
                />
              )
            }
          ]}
          data={tableData}
          pagination
          onRowClicked={onRowClick}
        />
        <EmployeeForm
          open={open}
          onClose={toggleOpen}
          submitFunction={createEmployee}
          successMessage="Ficha de trabajador creado correctamente"
          successFunction={afterCreateEmployee}
        />
      </Wrapper>
    </Box>
  )
}

export default ListEmployees
