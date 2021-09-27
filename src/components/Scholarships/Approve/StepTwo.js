import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Typography } from '@material-ui/core'
import { SubmitButton, TextArea } from '../../UI'
import scholarshipsActions from '../../../state/actions/scholarships'
import useStyles from './styles'
// import filesActions from '../../../state/actions/files'

const validationSchema = Yup.object({
  comments: Yup.string()
})

const StepTwo = ({
  onClose,
  type,
  data,
  successFunc,
  submitFunction,
  successMessage
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { application } = useSelector((state) => state.scholarships)

  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      comments: type === 'UPDATE' ? data.comments : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({
        ...values,
        date: new Date(values.date).toISOString()
      })
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })
          setTimeout(() => {
            resetForm()
            onClose()
            if (successFunc) {
              successFunc()
            }
          }, 500)
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, {
            variant: 'error'
          })
        })
    }
  })

  const appId = application.id

  const onApprove = () => {
    dispatch(
      scholarshipsActions.postulationApprove(appId, {
        state: 'APROBADA',
        date: new Date(),
        comments: formik.values.comments
      })
    )
    enqueueSnackbar('Postulación aprobada exitosamente', {
      autoHideDuration: 1500,
      variant: 'success'
    })
  }

  const onReject = () => {
    dispatch(
      scholarshipsActions.postulationReject(appId, {
        state: 'RECHAZADA',
        date: new Date(),
        comments: formik.values.comments
      })
    )
    enqueueSnackbar('Postulación rechazada exitosamente', {
      autoHideDuration: 1500,
      variant: 'success'
    })
  }

  const onReview = () => {
    dispatch(
      scholarshipsActions.postulationRevision(appId, {
        state: 'POR_REVISAR',
        date: new Date(),
        comments: formik.values.comments
      })
    )
    enqueueSnackbar(
      'Solicitud de revisión de postulación agregada exitosamente',
      {
        autoHideDuration: 1500,
        variant: 'success'
      }
    )
  }

  const getIsRequired = (form) => {
    if (form.comments) return true
    return false
  }

  return (
    <Box className={classes.form}>
      <Typography className={classes.subtitle} align="center">
        Comentarios{' '}
      </Typography>
      <Box>
        <TextArea
          name="comments"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.comments}
          helperText={formik.touched.comments && formik.errors.comments}
          error={formik.touched.comments && Boolean(formik.errors.comments)}
        />
      </Box>
      <Box className={classes.actions}>
        <SubmitButton
          disabled={
            !formik.isValid ||
            formik.isSubmitting ||
            !getIsRequired(formik.values)
          }
          onClick={onReview}
        >
          Solicitar Revisión
        </SubmitButton>
        <SubmitButton
          disabled={!formik.isValid || formik.isSubmitting}
          onClick={onReject}
        >
          Rechazar
        </SubmitButton>
        <SubmitButton
          disabled={!formik.isValid || formik.isSubmitting}
          onClick={onApprove}
        >
          Aprobar
        </SubmitButton>
      </Box>
    </Box>
  )
}

export default StepTwo
