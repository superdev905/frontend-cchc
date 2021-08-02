import { Box } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { formatDate } from '../../formatters'
import { useToggle } from '../../hooks'
import employeesActions from '../../state/actions/employees'
import { DataTable } from '../Shared'
import { Button, Wrapper } from '../UI'
import EmployeeForm from './EmployeeForm'

const ListEmployees = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [tableData, setTableData] = useState([])
  const { open, toggleOpen } = useToggle()
  const { list: listEmployees } = useSelector((state) => state.employees)

  const fetchEmployees = () => {
    dispatch(employeesActions.getEmployees())
  }
  const onRowClick = (row) => {
    history.push(`/employee/${row.id}/info`)
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
  }, [])

  return (
    <Wrapper>
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={toggleOpen}>Nuevo trabajador</Button>
      </Box>
      <DataTable
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
        successFunction={fetchEmployees}
      />
    </Wrapper>
  )
}

export default ListEmployees
