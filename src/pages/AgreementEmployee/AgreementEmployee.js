import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import housingActions from '../../state/actions/housing'
import employeesAction from '../../state/actions/employees'
import { LabeledRow, Text, Wrapper } from '../../components/UI'
import { HeadingWithButton } from '../../components/Shared'
import Saving from '../../components/AgreementEmployee/Saving'
import DiagnosticSection from '../../components/AgreementEmployee/Diagnostic'
import PhaseTimeLine from '../../components/AgreementEmployee/PhaseTimeLine'

const useStyles = makeStyles((theme) => ({
  subHeading: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  }
}))

const Employee = () => {
  const classes = useStyles()
  const { employeeId } = useParams()
  const [loading, setLoading] = useState(false)
  const { employee } = useSelector((state) => state.employees)
  const { employeeData } = useSelector((state) => state.housing)
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
        <Box mt={2}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <Typography className={classes.subHeading}>
                  Detalles de trabajador
                </Typography>
                <LabeledRow label="Run:">
                  <Text loading={loading} loaderWidth="40%">
                    {employee?.run}
                  </Text>
                </LabeledRow>
                <LabeledRow label="Nombres:">
                  <Text loading={loading} loaderWidth="40%">
                    {employee?.names}
                  </Text>
                </LabeledRow>
                <LabeledRow label="Apellidos:">
                  <Text loading={loading} loaderWidth="40%">
                    {`${employee?.paternal_surname} ${
                      employee?.maternal_surname || ''
                    }`}
                  </Text>
                </LabeledRow>
                <LabeledRow label="Sexo:">
                  <Text loading={loading} loaderWidth="20%">
                    {employee?.gender}
                  </Text>
                </LabeledRow>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography className={classes.subHeading}>
                  Detalles de contacto
                </Typography>
                <LabeledRow label="Dirección">
                  <Text loading={loading} loaderWidth="10%"></Text>
                </LabeledRow>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box mt={2}>
          <Typography className={classes.subHeading}>
            Datos de ahorro
          </Typography>
          <Saving handler={fetchDetails} />
        </Box>
        <Box mt={2}>
          <Typography className={classes.subHeading}>
            Datos de diagnostico
          </Typography>
          <DiagnosticSection loading={loading} handler={fetchDetails} />
        </Box>

        <Box mt={2}>
          <Typography className={classes.subHeading}>
            Etapas de proceso
          </Typography>
          <PhaseTimeLine employeeId={employeeData?.id} />
        </Box>
      </Wrapper>
    </Box>
  )
}
export default Employee
