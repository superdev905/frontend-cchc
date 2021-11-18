import { Box, Typography } from '@material-ui/core'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import benefitsActions from '../../state/actions/benefits'
import { Dialog } from '../Shared'
import { Button, SubmitButton } from '../UI'
import BenefitForm from './Create/InfoForm'
import { benefitSchema } from './Create/schemas'
import { useSuccess } from '../../hooks'

const EditDialog = ({ open, onClose, benefit, successFunction }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { isMobile } = useSelector((state) => state.ui)
  const { success, changeSuccess } = useSuccess()
  const formik = useFormik({
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: benefitSchema,
    initialValues: {
      code: benefit?.code || '',
      startDate: benefit?.startDate || '',
      endDate: benefit?.endDate || '',
      name: benefit?.name || '',
      projectName: benefit?.projectName || '',
      usersQuantity: benefit?.usersQuantity || '',
      isActive: benefit?.isActive ? 'VIGENTE' : 'NO VIGENTE',
      totalCost: benefit?.totalCost || '',
      isCourse: benefit?.isCourse
    },
    onSubmit: (values) => {
      dispatch(
        benefitsActions.updateBenefit(benefit.id, {
          ...values,
          isActive: values.isActive === 'VIGENTE',
          createdDate: benefit.createdDate
        })
      )
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            enqueueSnackbar('Beneficio actualizado', { variant: 'success' })
            onClose()
            successFunction()
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth={'md'}
      onClose={onClose}
      fullScreen={isMobile}
    >
      <Typography
        align="center"
        style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}
      >
        Actualizar beneficio
      </Typography>
      <BenefitForm
        formik={formik}
        type="UPDATE"
        actions={
          <Box p={2} textAlign={'center'}>
            <Button variant={'outlined'} onClick={onClose}>
              Cancelar
            </Button>
            <SubmitButton
              loading={formik.isSubmitting}
              disabled={!formik.isValid || formik.isSubmitting}
              onClick={formik.handleSubmit}
              success={success}
            >
              Actualizar
            </SubmitButton>
          </Box>
        }
      />
    </Dialog>
  )
}

EditDialog.propTypes = {}

export default EditDialog
