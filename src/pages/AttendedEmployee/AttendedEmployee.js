import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Box, IconButton } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons'
import AttentionDetails from '../../components/Visit/AttentionDetails'
import { PageHeading, Text } from '../../components/UI'
import employeesActions from '../../state/actions/employees'
import PersonalDetails from '../../components/Visit/PersonalDetail'
import VisitDetails from '../../components/Visit/VisitDetails'

const AttendedEmployee = () => {
  const { idVisit, idEmployee } = useParams()
  const { employee } = useSelector((state) => state.employees)
  const dispatch = useDispatch()
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  const getEmployee = useCallback(() => {
    dispatch(employeesActions.getEmployeeDetails(idEmployee))
  }, [])

  useEffect(() => {
    getEmployee()
  }, [idEmployee])
  return (
    <Box>
      <Box display="flex" alignItems="center">
        <IconButton onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
        <Text>
          <PageHeading>
            {employee &&
              `${employee.names} ${employee.paternal_surname} ${employee.maternal_surname} - Visita: ${idVisit}`}
          </PageHeading>
        </Text>
      </Box>
      <PersonalDetails />
      <VisitDetails />
      <AttentionDetails />
    </Box>
  )
}

export default AttendedEmployee
