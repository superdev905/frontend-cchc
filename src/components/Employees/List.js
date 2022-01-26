import { Box, Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { formatDate, formatSearchWithRut } from '../../formatters'
import { useToggle } from '../../hooks'
import employeesActions from '../../state/actions/employees'
import assistanceActions from '../../state/actions/assistance'
import { DataTable } from '../Shared'
import { Button, SearchInput, Select, StatusChip, Wrapper } from '../UI'
import EmployeeForm from './EmployeeForm'

const ListEmployees = () => {
  const dispatch = useDispatch()
  const { idEmployee } = useParams()
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
        search: filters.search.trim(),
        include_total: true
      })
    )
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  const fetchList = () => {
    setLoading(true)
    dispatch(
      assistanceActions.getAttention({
        id_employee: idEmployee
      })
    ).then((data) => {
      setLoading(false)
      setTableData(
        data.map((item) => ({
          ...item,
          stringDate: formatDate(item.date, {}),
          is_social_case: `${item.is_social_case}`,
          status: `${item.status}`
        }))
      )
    })
  }
  const onRowClick = (row) => {
    history.push(`/employee/${row.id}/info`)
  }

  const afterCreateEmployee = (createData) => {
    history.push(`/employee/${createData.id}/info`)
  }
  const createEmployee = (values) =>
    dispatch(
      employeesActions.createEmployee({ ...values, created_by: user.id })
    )

  useEffect(() => {
    setTableData(
      listEmployees.map((item) => ({
        ...item,
        last_name: `${item.paternal_surname} ${item.maternal_surname}`
      }))
    )
  }, [listEmployees])

  useEffect(() => {
    fetchEmployees()
  }, [filters])

  useEffect(() => {
    fetchList()
  }, [])

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
              name: 'Fecha de ultima atención ',
              selector: (row) => row.stringDate
            },
            {
              name: 'Caso Social',
              selector: (row) => row.is_social_case
            },
            {
              name: 'Estado de Asistencia',
              selector: (row) => row.status
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
          paginationRowsPerPageOptions={[30, 40]}
          paginationPerPage={filters.limit}
          paginationServer={true}
          onChangeRowsPerPage={(limit) => {
            setFilters({ ...filters, limit })
          }}
          onChangePage={(page) => {
            setFilters({ ...filters, skip: page })
          }}
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
