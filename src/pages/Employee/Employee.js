import { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Box, IconButton } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons/'
import employeesActions from '../../state/actions/employees'
import { EmployeeTabs } from '../../components/Employee'
import { PageHeading, Text } from '../../components/UI'

const Employee = ({ children }) => {
  const dispatch = useDispatch()
  const { idEmployee } = useParams()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const { employee } = useSelector((state) => state.employees)

  const goBack = () => {
    history.goBack()
  }

  const getEmployee = useCallback(() => {
    setLoading(true)
    dispatch(employeesActions.getEmployeeDetails(idEmployee))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    getEmployee()
  }, [idEmployee])
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
      <EmployeeTabs>{children}</EmployeeTabs>
    </Box>
  )
}

export default memo(Employee)
