import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Dialog } from '../../Shared'
import { Button, SubmitButton } from '../../UI'
import { useSuccess } from '../../../hooks'
import PmaTracking from './PmaTracking'
import CommonTracking from './CommonTracking'

/**
 * year_in_progress: int = Field(alias="yearInProgress")
    level_in_progress: str = Field(alias="levelInProgress")
    total_courses: int = Field(alias="totalCourses")
    failed_courses: int = Field(alias="failedCourses")
    business_name: str = Field(alias="businessName")
    benefit_id: int = Field(alias="benefitId")
    scholarship_status: str = Field(alias="scholarshipStatus")
    approved_scholarship_id: int = Field(alias="approvedScholarshipId")
 */

const BeaTrackingSchema = Yup.object().shape({
  yearInProgress: Yup.number('Ingrese año válido').required(
    'Ingrese año en curso'
  ),
  levelInProgress: Yup.string().required('Ingrese nivel en curso'),
  totalCourses: Yup.number('Ingrese número válido').required(
    'Ingrese ramos totales'
  ),
  failedCourses: Yup.number('Ingrese número válido').required(
    'Ingrese ramos reprobados'
  ),
  businessName: Yup.string().required('Ingrese nombre de empresa actual'),
  benefitId: Yup.number().required('Selecciona beneficio'),
  scholarshipStatus: Yup.number().required('Seleccione estado de beca')
})
const PmaTrackingSchema = Yup.object().shape({
  benefitId: Yup.number().required('Seleccione beneficio'),
  scholarshipStatus: Yup.string().required('Seleccione estado de beca')
})
const BeshBestTrackingSchema = Yup.object().shape({
  benefitId: Yup.number().required('Seleccione beneficio'),
  scholarshipStatus: Yup.string().required('Seleccione estado de beca')
})

const BenefitDialog = ({
  open,
  onClose,
  data,
  scholarshipType,
  type,
  submitFunction,
  successFunction,
  successMessage
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const { isMobile } = useSelector((state) => state.ui)
  const { benefitsList } = useSelector((state) => state.scholarships)
  const { success, changeSuccess } = useSuccess()

  const getValidationSchema = (typeName) => {
    if (typeName === 'PMA') return PmaTrackingSchema
    if (typeName === 'BEA') return BeaTrackingSchema
    return BeshBestTrackingSchema
  }

  const renderForm = (typeName, form) => {
    if (typeName === 'PMA') return <PmaTracking form={form} />
    return <CommonTracking form={form} benefits={benefitsList} />
  }

  const formik = useFormik({
    validationSchema: getValidationSchema(scholarshipType),
    validateOnMount: true,
    initialValues: {
      benefitId: type === 'UPDATE' ? data.benefitId : '',
      scholarshipStatus: type === 'UPDATE' ? data.scholarshipStatus : ''
    },
    onSubmit: (values) => {
      submitFunction({ ...values, date: new Date() })
        .then(() => {
          enqueueSnackbar(successMessage, { variant: 'success' })
          changeSuccess(true, () => {
            formik.setSubmitting(false)
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
          Nuevo seguimiento
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
          >{`${
            type === 'UPDATE' ? 'Actualizar' : 'Crear'
          } Seguimiento`}</SubmitButton>
        </Box>
      </Box>
    </Dialog>
  )
}

BenefitDialog.defaultProps = {
  type: 'ADD'
}

export default BenefitDialog
