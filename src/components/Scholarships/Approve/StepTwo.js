import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import { SubmitButton, TextArea, Button } from '../../UI'
import scholarshipsActions from '../../../state/actions/scholarships'
import useStyles from './styles'
import { useToggle, useSuccess } from '../../../hooks'
import { ConfirmDelete } from '../../Shared'

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
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { application, create } = useSelector((state) => state.scholarships)
  const { open: openApprove, toggleOpen: toggleOpenApprove } = useToggle()
  const { open: openReject, toggleOpen: toggleOpenReject } = useToggle()
  const { open: openReview, toggleOpen: toggleOpenReview } = useToggle()

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

  const goBack = () => {
    dispatch(
      scholarshipsActions.updateCreate({ ...create, step: create.step - 1 })
    )
  }
  const goNext = () => {
    dispatch(
      scholarshipsActions.updateCreate({ ...create, step: create.step + 1 })
    )
  }

  const appId = application.id

  const onApprove = () => {
    dispatch(
      scholarshipsActions.postulationApprove(appId, {
        state: 'APROBADA',
        date: new Date(),
        comments: formik.values.comments
      })
    )
      .then(() => {
        changeSuccess(true, () => {
          toggleOpenApprove()
          enqueueSnackbar('Postulación aprobada exitosamente', {
            variant: 'success'
          })
        })
        goNext()
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
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
      .then(() => {
        changeSuccess(true, () => {
          toggleOpenReject()
          enqueueSnackbar('Postulación rechazada exitosamente', {
            variant: 'success'
          })
        })
        goNext()
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
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
      .then(() => {
        changeSuccess(true, () => {
          toggleOpenReview()
          history.push(`/postulations/${appId}`)
          enqueueSnackbar('Solicitud de revisión creada exitosamente', {
            variant: 'success'
          })
        })
        goNext()
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
      })
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
        <Button startIcon={<BackIcon />} variant="outlined" onClick={goBack}>
          Anterior
        </Button>
        <SubmitButton
          disabled={
            !formik.isValid ||
            formik.isSubmitting ||
            !getIsRequired(formik.values)
          }
          onClick={toggleOpenReview}
        >
          Solicitar Revisión
        </SubmitButton>
        <SubmitButton
          disabled={!formik.isValid || formik.isSubmitting}
          onClick={toggleOpenReject}
        >
          Rechazar
        </SubmitButton>
        <SubmitButton
          disabled={!formik.isValid || formik.isSubmitting}
          onClick={toggleOpenApprove}
        >
          Aprobar
        </SubmitButton>
      </Box>

      {openApprove && (
        <ConfirmDelete
          open={openApprove}
          success={success}
          confirmText="Aprobar"
          onClose={toggleOpenApprove}
          message={<span>¿Estás seguro de aprobar esta postulación? </span>}
          onConfirm={() => onApprove(appId)}
        />
      )}

      {openReject && (
        <ConfirmDelete
          open={openReject}
          success={success}
          confirmText="Rechazar"
          onClose={toggleOpenReject}
          message={<span>¿Estás seguro de rechazar esta postulación? </span>}
          onConfirm={() => onReject(appId)}
        />
      )}

      {openReview && (
        <ConfirmDelete
          open={openReview}
          success={success}
          confirmText="Solicitar revisión"
          onClose={toggleOpenReview}
          message={
            <span>
              ¿Estás seguro de solicitar revisión de esta postulación?{' '}
            </span>
          }
          onConfirm={() => onReview(appId)}
        />
      )}
    </Box>
  )
}

export default StepTwo
