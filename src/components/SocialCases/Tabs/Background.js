import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import moment from 'moment'
import { LabeledRow, Text, Button } from '../../UI'
import EmployeesActions from '../../../state/actions/employees'

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: '17px',
    fontWeight: 'bold',
    marginTop: '10px'
  }
}))

const Background = ({ loading }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { caseDetails } = useSelector((state) => state.socialCase)
  const { employee } = useSelector((state) => state.employees)
  const [prevision, setPrevision] = useState()
  const [hijos, setHijos] = useState(0)
  const born = moment(employee?.born_date)
  const today = moment()
  const age = born.diff(today, 'years')

  useEffect(() => {
    dispatch(EmployeesActions.getEmployeeDetails(caseDetails?.employeeId))
    dispatch(
      EmployeesActions.getPensionSituation({
        employee_id: caseDetails?.employeeId
      })
    ).then((data) => setPrevision(data[0]))
    dispatch(
      EmployeesActions.getEmployeeRelatives({
        employee_run: caseDetails?.employeeRut
      })
    ).then((data) => setHijos(data.length))
  }, [caseDetails])

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          style={{ fontSize: '19px', fontWeight: 'bold', marginLeft: '1%' }}
        >
          Detalles de Caso Social
        </Typography>
      </Box>
      <Box p={2}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography className={classes.heading}>
              Datos del Trabajador
            </Typography>
            <LabeledRow label={'Run'}>
              <Text loading={loading}>{caseDetails?.employeeRut} </Text>
            </LabeledRow>
            <LabeledRow label={'Nombres'}>
              <Text loading={loading}>{caseDetails?.employee?.names}</Text>
            </LabeledRow>
            <LabeledRow label={'Apellido paterno'}>
              <Text loading={loading}>
                {caseDetails?.employee?.paternalSurname}
              </Text>
            </LabeledRow>
            <LabeledRow label={'Apellido materno'}>
              <Text loading={loading}>
                {caseDetails?.employee?.maternalSurname}
              </Text>
            </LabeledRow>
            <LabeledRow label={'Edad'}>
              <Text loading={loading}>{age * -1}</Text>
            </LabeledRow>
            <LabeledRow label={'Dirección'}>
              <Text loading={loading}>{employee?.contact?.address}</Text>
            </LabeledRow>
            <LabeledRow label={'Teléfono'}>
              <Text loading={loading}>{employee?.contact?.mobile_phone}</Text>
            </LabeledRow>
            <LabeledRow label={'Correo Electrónico'}>
              <Text loading={loading}>{employee?.contact?.email}</Text>
            </LabeledRow>
            <LabeledRow label={'Estado Civil'}>
              <Text loading={loading}>
                {employee?.marital_status?.description}
              </Text>
            </LabeledRow>
            <LabeledRow label={'Hijos'}>
              <Text loading={loading}>{hijos}</Text>
            </LabeledRow>
            <LabeledRow label={'Afp'}>
              <Text loading={loading}>{prevision?.afp_isp?.description}</Text>
            </LabeledRow>
            <LabeledRow label={'Prevision'}>
              <Text loading={loading}>
                {prevision?.isapre_fonasa?.description}
              </Text>
            </LabeledRow>
            <LabeledRow label={'Tipo de Derivación'}>
              <Text loading={loading}>{caseDetails?.derivationState}</Text>
            </LabeledRow>
            <Link
              style={{ textDecoration: 'none' }}
              to={`/employee/${caseDetails?.employeeId}/info`}
            >
              <Button>Ver Datos Completos</Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className={classes.heading}>
              Detalle de Empresa
            </Typography>
            <LabeledRow label={'Run'}>
              <Text loading={loading}>{caseDetails?.business?.rut}</Text>
            </LabeledRow>
            <LabeledRow label={'Nombre'}>
              <Text loading={loading}>
                {caseDetails?.business?.businessName}
              </Text>
            </LabeledRow>
            <LabeledRow label={'Email'}>
              <Text loading={loading}>{caseDetails?.business?.email}</Text>
            </LabeledRow>
            <LabeledRow label={'Dirección'}>
              <Text loading={loading}>{caseDetails?.business?.address}</Text>
            </LabeledRow>
            <LabeledRow label={'Obra'}>
              <Text loading={loading}>
                {caseDetails?.constructionName || 'Sin obra'}
              </Text>
            </LabeledRow>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography className={classes.heading}>Area</Typography>
            <LabeledRow label={'Nombre'}>
              <Text loading={loading}>{caseDetails?.area?.name}</Text>
            </LabeledRow>
            <LabeledRow label={'Tema'}>
              <Text loading={loading}>{caseDetails?.tema?.name}</Text>
            </LabeledRow>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography className={classes.heading}>
              Información adicional
            </Typography>

            <LabeledRow width={200} label={'Profesional'}>
              <Text
                loading={loading}
              >{`${caseDetails?.professional?.names} ${caseDetails?.professional?.paternalSurname} ${caseDetails?.professional?.maternalSurname}`}</Text>
            </LabeledRow>
            <LabeledRow width={200} label={'Tipo de Solicitud'}>
              <Text loading={loading}>{caseDetails?.requestType}</Text>
            </LabeledRow>
            <LabeledRow width={200} label={'Comentario'}>
              <Text loading={loading}>{caseDetails?.observation}</Text>
            </LabeledRow>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Background
