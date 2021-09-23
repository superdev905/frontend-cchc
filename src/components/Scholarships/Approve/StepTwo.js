import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Typography } from '@material-ui/core'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import { Button, SubmitButton, TextArea } from '../../UI'
import scholarshipsActions from '../../../state/actions/scholarships'
import useStyles from './styles'
import useSuccess from '../../../hooks/useSuccess'
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
  const { success, changeSuccess } = useSuccess()
  const { enqueueSnackbar } = useSnackbar()
  const { create } = useSelector((state) => state.scholarships)

  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      comments: type === 'UPDATE' ? data.comments : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction(values)
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(false)
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
          changeSuccess(false)
        })
    }
  })

  const goBack = () => {
    dispatch(
      scholarshipsActions.updateCreate({ ...create, step: create.step - 1 })
    )
  }

  return (
    <Box className={classes.form}>
      <Typography className={classes.subtitle} align="center">
        Comentarios{' '}
      </Typography>
      <Box>
        <TextArea
          name="comments"
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
          onClick={formik.handleSubmit}
          loading={formik.isSubmitting}
          success={success}
        >
          Enviar
        </SubmitButton>
      </Box>
    </Box>
  )
}

export default StepTwo
