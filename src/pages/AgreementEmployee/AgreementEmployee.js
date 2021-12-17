import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import housingActions from '../../state/actions/housing'
import employeesAction from '../../state/actions/employees'
import { Wrapper } from '../../components/UI'
import { HeadingWithButton } from '../../components/Shared'
import Saving from '../../components/AgreementEmployee/Saving'
import DiagnosticSection from '../../components/AgreementEmployee/Diagnostic'
import PhaseTimeLine from '../../components/AgreementEmployee/PhaseTimeLine'
import { EmployeeDetailsForm } from '../../components/Employee'

const useStyles = makeStyles((theme) => ({
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  }
}))

const Employee = () => {
  const classes = useStyles()
  const { employeeId } = useParams()
  const [loading, setLoading] = useState(false)
  const { employee } = useSelector((state) => state.employees)
  const dispatch = useDispatch()
  const history = useHistory()

  const fetchDetails = () => {
    setLoading(true)
    dispatch(housingActions.getEmployee(employeeId)).then(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    dispatch(employeesAction.getEmployeeDetails(employeeId))
    fetchDetails()
  }, [])
  return (
    <Box>
      <Wrapper>
        <HeadingWithButton
          title={`${employee?.names} ${employee?.paternal_surname}`}
          loading={loading}
          goBack={() => {
            history.goBack()
          }}
        />
        <Box px={1}>
          <Box mt={2}>
            <Box>
              <Typography className={classes.subHeading}>
                Detalles de trabajador
              </Typography>
              <EmployeeDetailsForm loading={loading} data={employee} />
            </Box>
          </Box>
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography className={classes.subHeading}>
                  Datos de ahorro
                </Typography>
                <Saving handler={fetchDetails} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography className={classes.subHeading}>
                  Datos de diagnóstico
                </Typography>
                <DiagnosticSection loading={loading} handler={fetchDetails} />
              </Grid>
            </Grid>
          </Box>
          <Box mt={2}>
            <Typography className={classes.subHeading}>
              Etapas de proceso
            </Typography>
            <PhaseTimeLine employeeId={employeeId} />
          </Box>
        </Box>
      </Wrapper>
    </Box>
  )
}
export default Employee
