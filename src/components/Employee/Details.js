/* import { useEffect } from 'react'
import { useParams } from 'react-router-dom' */
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import employeesActions from '../../state/actions/employees'
import { formatDate } from '../../formatters'
import { useToggle } from '../../hooks'
import { Button, LabeledRow, Text, Wrapper } from '../UI'
import { EmployeeForm } from '../Employees'

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: '17px',
    fontWeight: 'bold',
    marginTop: '10px'
  }
}))

const Details = ({ loading }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  /* const { idEmployee } = useParams() */
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { employee } = useSelector((state) => state.employees)

  const updateEmployeeInfo = (values) =>
    dispatch(
      employeesActions.updateEmployee(employee.id, {
        ...values,
        created_by: employee.created_by
      })
    )
  const getEmployeeDetails = () => {
    dispatch(employeesActions.getEmployeeDetails(employee.id))
  }

  /* useEffect(() => {
    getEmployeeDetails()
    console.log({ employee })
  }, []) */

  return (
    <Box width="100%">
      <Wrapper>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
            Datos personales
          </Typography>
          <Button onClick={toggleOpenEdit}>Editar</Button>
        </Box>
        <Box p={2}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <LabeledRow label={'Run'}>
                <Text loading={loading}>{employee?.run}</Text>
              </LabeledRow>
              <LabeledRow label={'Nombres'}>
                <Text loading={loading}>{employee?.names}</Text>
              </LabeledRow>
              <LabeledRow label={'Apellido paterno'}>
                <Text loading={loading}>{employee?.paternal_surname}</Text>
              </LabeledRow>
              <LabeledRow label={'Apellido materno'}>
                <Text loading={loading}>
                  {employee?.maternal_surname || `---`}
                </Text>
              </LabeledRow>
              <LabeledRow label={'Sexo'}>
                <Text loading={loading}>{employee?.gender}</Text>
              </LabeledRow>
            </Grid>
            <Grid item xs={12} md={6}>
              <LabeledRow label={'Estado civil'}>
                <Text loading={loading}>
                  {employee?.marital_status?.description}
                </Text>
              </LabeledRow>
              <LabeledRow label={'Nacionalidad'}>
                <Text loading={loading}>
                  {employee?.nationality?.description}
                </Text>
              </LabeledRow>
              <LabeledRow label={'Escolaridad'}>
                <Text loading={loading}>
                  {employee?.scholarship?.description}
                </Text>
              </LabeledRow>
              <LabeledRow label={'Etnia'}>
                <Text loading={loading}>{employee?.etnia}</Text>
              </LabeledRow>
              <LabeledRow width={170} label={'Fecha de nacimiento'}>
                <Text loading={loading}>{formatDate(employee?.born_date)}</Text>
              </LabeledRow>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography className={classes.heading}>
                Información económica
              </Typography>
              <LabeledRow label={'Nombre de banco'}>
                <Text loading={loading}>{employee?.bank?.description}</Text>
              </LabeledRow>
              <LabeledRow label={'Tipo de cuenta'}>
                <Text loading={loading}>{employee?.account_type}</Text>
              </LabeledRow>
              <LabeledRow label={'Número de cuenta'}>
                <Text loading={loading}>{employee?.account_number}</Text>
              </LabeledRow>
              <LabeledRow label={'RSH'}>
                <Text loading={loading}>{employee?.rsh}</Text>
              </LabeledRow>
              <LabeledRow label={'RSH %'}>
                <Text loading={loading}>
                  {employee?.rsh_percentage || `---`}
                </Text>
              </LabeledRow>
              <LabeledRow label={'Estado RSH'}>
                <Text loading={loading}>{employee?.rsh_status}</Text>
              </LabeledRow>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography className={classes.heading}>
                Información de discapacidad
              </Typography>

              <LabeledRow width={200} label={'Discapacidad'}>
                <Text loading={loading}>{employee?.disability}</Text>
              </LabeledRow>
              <LabeledRow width={200} label={'Credencial discapacidad'}>
                <Text loading={loading}>{employee?.credential_disability}</Text>
              </LabeledRow>
              <LabeledRow width={200} label={'Tipo de discapacidad'}>
                <Text loading={loading}>{employee?.disability_type}</Text>
              </LabeledRow>
              <LabeledRow width={200} label={'Discapacidad %'}>
                <Text loading={loading}>{employee?.disability_percentage}</Text>
              </LabeledRow>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography className={classes.heading}>
                Información adicional
              </Typography>

              <LabeledRow width={200} label={'Vivo'}>
                <Text loading={loading}>{employee?.alive}</Text>
              </LabeledRow>
            </Grid>
            {employee?.comments && (
              <Grid item xs={12}>
                <Typography
                  style={{
                    fontSize: '17px',
                    fontWeight: 'bold',
                    marginTop: '10px'
                  }}
                >
                  Comentarios
                </Typography>
                <Text loading={loading}>{employee?.comments}</Text>
              </Grid>
            )}
          </Grid>
        </Box>
      </Wrapper>
      {openEdit && (
        <EmployeeForm
          type="UPDATE"
          open={openEdit}
          successMessage="Datos personales actualizados"
          onClose={toggleOpenEdit}
          data={employee}
          submitFunction={updateEmployeeInfo}
          successFunction={getEmployeeDetails}
        />
      )}
    </Box>
  )
}

export default Details
