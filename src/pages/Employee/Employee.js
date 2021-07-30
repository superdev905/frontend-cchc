import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Box, IconButton } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons/'
import employeesActions from '../../state/actions/employees'
import {
  EmployeeDetails,
  EmployeeFamiliarGroup,
  EmployeeInfoContact,
  EmployeeJobs,
  HousingSituation,
  PensionSituation,
  SpecializationHistory
} from '../../components/Employee'
import { PageHeading, Text } from '../../components/UI'

const Employee = () => {
  const dispatch = useDispatch()
  const { idEmployee } = useParams()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const { employee } = useSelector((state) => state.employees)

  const goBack = () => {
    history.goBack()
  }

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
      <Box display="flex" alignItems="center" marginBottom="10px">
        <IconButton onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
        <Text loading={loading}>
          <PageHeading>
            {employee &&
              `${employee.names} ${employee.paternal_surname} ${employee.maternal_surname}`}
          </PageHeading>
        </Text>
      </Box>
      <EmployeeDetails loading={loading} fetchFunction={getEmployee} />
      <EmployeeInfoContact />
      <EmployeeFamiliarGroup />
      <PensionSituation />
      <HousingSituation />
      <SpecializationHistory />
      <EmployeeJobs />
    </Box>
  )
}

export default Employee
