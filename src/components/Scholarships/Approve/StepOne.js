import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { LabeledRow, SubmitButton, Text } from '../../UI'
import useStyles from './styles'
import Actions from '../../Companies/Create/Actions'
import scholarshipsActions from '../../../state/actions/scholarships'

const StepOne = ({ onClose }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { application } = useSelector((state) => state.scholarships)

  const getPostulationDetails = (id) => {
    dispatch(scholarshipsActions.getPostulationDetails(id))
  }

  useEffect(() => {
    getPostulationDetails()
  }, [])

  const onApprove = (id) => {
    dispatch(scholarshipsActions.postulationApprove(id))
      .then(() => {
        enqueueSnackbar('Postulación aprobada exitosamente', {
          variant: 'success'
        })
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const onReject = (id) => {
    dispatch(scholarshipsActions.postulationReject(id))
      .then(() => {
        enqueueSnackbar('Postulación rechazada exitosamente', {
          variant: 'success'
        })
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const onRevision = (id) => {
    dispatch(scholarshipsActions.postulationRevision(id))
      .then(() => {
        enqueueSnackbar('Solicitud de revisión creada', {
          variant: 'success'
        })
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  return (
    <Box className={classes.form}>
      <Box>
        <Typography align="center" className={classes.subtitle}>
          Postulación a <span> {application.scholarshipType.name}</span>
        </Typography>
      </Box>
      <Box>
        <Grid xs={6} md={6} lg={6} className={classes.infoBox}>
          <LabeledRow label="Beneficiario">
            <Text> {application.beneficiaryNames}</Text>
          </LabeledRow>
          <LabeledRow label="Rut Beneficiario">
            <Text>{application.beneficiaryRut}</Text>
          </LabeledRow>
        </Grid>

        <Grid xs={6} md={6} lg={6} className={classes.infoBox}>
          <LabeledRow label="Trabajador">
            <Text> {application.employeeNames}</Text>
          </LabeledRow>

          <LabeledRow label="Rut Trabajador">
            <Text> {application.employeeRut}</Text>
          </LabeledRow>

          <LabeledRow label="Empresa">
            <Text> {application.businessName}</Text>
          </LabeledRow>

          <LabeledRow label="Rut Empresa">
            <Text> {application.businessRut}</Text>
          </LabeledRow>
        </Grid>

        <Grid xs={6} md={6} lg={6} className={classes.infoBox}>
          <LabeledRow label="Carrera">
            <Text>{application.career.name}</Text>
          </LabeledRow>
          <LabeledRow label="Institucion">
            <Text>{application.schoolName}</Text>
          </LabeledRow>

          <LabeledRow label="Región">
            <Text>{application.schoolRegionDetails.name}</Text>
          </LabeledRow>

          <LabeledRow label="Comuna">
            <Text> {application.schoolCommuneDetails.name}</Text>
          </LabeledRow>
        </Grid>
      </Box>

      <Box textAlign="center">
        <SubmitButton onClick={onRevision}>Solicitar Revisión</SubmitButton>
        <SubmitButton danger onClick={onReject}>
          Rechazar
        </SubmitButton>
        <SubmitButton onClick={onApprove}>Aprobar</SubmitButton>
      </Box>
      <Actions showBackIcon={false} handleBack={onClose} backText="Cancelar" />
    </Box>
  )
}

export default StepOne
