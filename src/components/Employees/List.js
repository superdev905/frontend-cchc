import { Box, Chip, Grid, IconButton } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import { formatDate, formatSearchWithRut } from '../../formatters'
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
  const [looking, setLooking] = useState(false)
  const [filters, setFilters] = useState({
    page: 1,
    skip: 0,
    size: 10,
    search: '',
    state: ''
  })
  const { open, toggleOpen } = useToggle()
  const { user } = useSelector((state) => state.auth)
  const { list: listEmployees, totalDocs } = useSelector(
    (state) => state.employees
  )

  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      skip: 0,
      search: formatSearchWithRut(e.target.value)
    })
  }

  const handleStateChange = (e) => {
    setFilters({ ...filters, skip: 0, state: e.target.value })
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

  const searchButton = () => {
    setLooking(true)
    fetchEmployees()
  }

  const onRowClick = (row) => {
    history.push(`/employee/${row.id}/info`)
  }

  const afterCreateEmployee = (createData) => {
    history.push(`/employee/${createData.id}/info`)
  }

  const changePage = (page) => {
    setFilters({ ...filters, page })
    setLoading(true)
    dispatch(
      employeesActions.getEmployees({
        ...filters,
        page
      })
    )
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const createEmployee = (values) =>
    dispatch(
      employeesActions.createEmployee({ ...values, created_by: user.id })
    )

  useEffect(() => {
    setTableData(
      listEmployees.map((item) => ({
        ...item,
        last_name: `${item.paternal_surname} ${
          item.maternal_surname || ''
        }`.trim()
      }))
    )
  }, [listEmployees])

  useEffect(() => {
    if (setLooking(true)) {
      fetchEmployees()
    }
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
                status={looking}
                placeholder="Buscar por: Nombres, RUN"
                onChange={handleSearchChange}
              >
                <IconButton onClick={searchButton}>
                  <SearchIcon color="primary" fontSize="large" />
                </IconButton>
              </SearchInput>
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
              ? `Buscando : ${filters.search}`
              : 'Para encontrar Trabajadores utilice el buscador'
          }
          highlightOnHover
          pointerOnHover
          columns={[
            {
              name: 'Run',
              selector: (row) => row.run,
              sortable: true
            },
            {
              name: 'Nombres',
              selector: (row) => row.names
            },
            {
              name: 'Apellidos',
              selector: (row) => row.last_name
            },
            {
              name: 'Fecha ultima atención',
              selector: (row) =>
                row.last_attention_date
                  ? formatDate(row.last_attention_date, {})
                  : '---'
            },
            {
              name: 'Caso social',
              center: true,
              maxWidth: '150px',
              selector: (row) => (
                <Chip
                  label={row.has_social_case ? 'Si' : 'NO'}
                  color={row.has_social_case ? 'primary' : 'secondary'}
                />
              )
            },
            {
              name: 'Att. en seguimiento',
              center: true,
              selector: (row) => (
                <Chip
                  label={row.hast_follow_attentions ? 'Si' : 'NO'}
                  color={row.hast_follow_attentions ? 'primary' : 'secondary'}
                />
              )
            },
            {
              name: 'Estado',

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
          paginationRowsPerPageOptions={[10, 20, 30, 40]}
          paginationPerPage={filters.limit}
          paginationServer={true}
          onChangeRowsPerPage={(limit) => {
            setFilters({ ...filters, limit })
          }}
          onChangePage={changePage}
          paginationTotalRows={totalDocs}
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
