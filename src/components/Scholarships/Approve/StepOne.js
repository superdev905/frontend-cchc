import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { LabeledRow, Text } from '../../UI'
import useStyles from './styles'
import Actions from '../../Companies/Create/Actions'
import scholarshipsActions from '../../../state/actions/scholarships'

const StepOne = ({ onClose, onNext }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { application } = useSelector((state) => state.scholarships)

  const getPostulationDetails = (id) => {
    dispatch(scholarshipsActions.getPostulationDetails(id))
  }

  useEffect(() => {
    getPostulationDetails()
  }, [])

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
      <Actions
        showBackIcon={false}
        handleBack={onClose}
        backText="Cancelar"
        handleNext={onNext}
      />{' '}
    </Box>
  )
}

export default StepOne
