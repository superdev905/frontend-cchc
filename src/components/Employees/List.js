import { Box } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { formatDate } from '../../formatters'
import employeesActions from '../../state/actions/employees'
import { DataTable } from '../Shared'
import { Button, Wrapper } from '../UI'

const ListEmployees = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [tableData, setTableData] = useState([])
  const { list: listEmployees } = useSelector((state) => state.employees)

  const fetchEmployees = () => {
    dispatch(employeesActions.getEmployees())
  }

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
        <Button
          onClick={() => {
            history.push('/employee/new')
          }}
        >
          Nuevo trabajador
        </Button>
      </Box>
      <DataTable
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
      />
    </Wrapper>
  )
}

export default ListEmployees
