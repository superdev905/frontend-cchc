import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box } from '@material-ui/core'
import employeesActions from '../../state/actions/employees'
import {
  EmployeeDetails,
  EmployeeFamiliarGroup,
  EmployeeInfoContact
} from '../../components/Employee'

const Employee = () => {
  const dispatch = useDispatch()
  const { idEmployee } = useParams()
  const [loading, setLoading] = useState(false)

  const getEmployee = () => {
    setLoading(true)
    dispatch(employeesActions.getEmployeeDetails(idEmployee))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    getEmployee()
  }, [])
  return (
    <Box>
      <EmployeeDetails loading={loading} fetchFunction={getEmployee} />
      <EmployeeInfoContact />
      <EmployeeFamiliarGroup />
    </Box>
  )
}

export default Employee
