import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Dialog } from '../../Shared'
import { Button, SubmitButton } from '../../UI'
import { useSuccess } from '../../../hooks'
import {
  BeaTrackingSchema,
  CommonTrackingSchema,
  PmaTrackingSchema
} from './schemas'
import PmaTracking from './PmaTracking'
import CommonTracking from './CommonTracking'
import BEATracking from './BEATracking'

const BenefitDialog = ({
  open,
  onClose,
  benefitId,
  data,
  scholarshipType,
  type,
  submitFunction,
  successFunction,
  successMessage
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const { isMobile } = useSelector((state) => state.ui)
  /* const { benefitsList } = useSelector((state) => state.scholarships) */
  const { success, changeSuccess } = useSuccess()

  const getValidationSchema = (typeName) => {
    if (typeName === 'PMA') return PmaTrackingSchema
    if (typeName === 'ACADEMIC_EXCELLENCE_SCHOLARSHIP') return BeaTrackingSchema
    return CommonTrackingSchema
  }
  const getInitialValues = (typeName) => {
    if (typeName === 'BESH' || typeName === 'BEST')
      return {
        benefitId: type === 'UPDATE' ? data.benefitId : benefitId,
        scholarshipStatus: type === 'UPDATE' ? data.scholarshipStatus : '',
        businessName: type === 'UPDATE' ? data.businessName : '',
        totalCourses: type === 'UPDATE' ? data.totalCourses : '',
        failedCourses: type === 'UPDATE' ? data.failedCourses : '',
        yearInProgress: type === 'UPDATE' ? data.yearInProgress : '',
        levelInProgress: type === 'UPDATE' ? data.levelInProgress : '',
        observations: type === 'UPDATE' ? data.observations : ''
      }

    if (typeName === 'ACADEMIC_EXCELLENCE_SCHOLARSHIP')
      return {
        benefitId: type === 'UPDATE' ? data.benefitId : benefitId,
        scholarshipStatus: type === 'UPDATE' ? data.scholarshipStatus : '',
        yearInProgress: type === 'UPDATE' ? data.yearInProgress : '',
        levelInProgress: type === 'UPDATE' ? data.levelInProgress : '',
        avgScoreFirstSemester:
          type === 'UPDATE' ? data.avgScoreFirstSemester : '',
        avgScoreSecondSemester:
          type === 'UPDATE' ? data.avgScoreSecondSemester : '',
        businessName: type === 'UPDATE' ? data.businessName : '',
        mandatoryActivity: type === 'UPDATE' ? data.mandatoryActivity : '',
        psychologicalInterview:
          type === 'UPDATE' ? data.psychologicalInterview : '',
        observations: type === 'UPDATE' ? data.observations : ''
      }

    return {
      benefitId: type === 'UPDATE' ? data.benefitId : benefitId,
      scholarshipStatus: type === 'UPDATE' ? data.scholarshipStatus : '',
      observations: type === 'UPDATE' ? data.observations : ''
    }
  }

  const renderForm = (typeName, form) => {
    if (typeName === 'PMA')
      return <PmaTracking form={form} /* benefits={benefitsList}  */ />
    if (typeName === 'ACADEMIC_EXCELLENCE_SCHOLARSHIP')
      return <BEATracking form={form} /* benefits={benefitsList} */ />
    return <CommonTracking form={form} /* benefits={benefitsList}  */ />
  }

  const formik = useFormik({
    validationSchema: getValidationSchema(scholarshipType),
    validateOnMount: true,
    initialValues: getInitialValues(scholarshipType),
    onSubmit: (values) => {
      submitFunction({
        ...values,
        observations: values.observations.toUpperCase(),
        date: new Date()
      })
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, { variant: 'success' })
          changeSuccess(true, () => {
            if (successFunction) {
              successFunction()
            }
            onClose()
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })

  const handleClose = () => {
    formik.resetForm()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Box p={2}>
        <Typography
          align="center"
          style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '15px' }}
        >
          {`${type === 'UPDATE' ? 'Editar' : 'Crear'} `} seguimiento
        </Typography>

        {renderForm(scholarshipType, formik)}
        <Box textAlign="center">
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <SubmitButton
            loading={formik.isSubmitting}
            onClick={formik.handleSubmit}
            disabled={!formik.isValid}
            success={success}
          >{`${type === 'UPDATE' ? 'Actualizar' : 'Crear'}`}</SubmitButton>
        </Box>
      </Box>
    </Dialog>
  )
}

BenefitDialog.defaultProps = {
  type: 'ADD'
}

export default BenefitDialog
