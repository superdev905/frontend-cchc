import * as Yup from 'yup'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core'
import { DatePicker, Dialog } from '../../../Shared'
import { Button, SubmitButton, TextField } from '../../../UI'
import { useSuccess } from '../../../../hooks'

const validationSchema = Yup.object().shape({
  date: Yup.string().required('Seleccione fecha'),
  score: Yup.number().min(1).max(7).required('Ingrese nota')
})

const AddScore = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const { idCourse } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      courseId: idCourse,
      date: type === 'UPDATE' ? data.date : '',
      score: type === 'UPDATE' ? data.score : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({
        ...values,
        createDate: new Date().toISOString()
      })
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            onClose()
            enqueueSnackbar(successMessage, {
              variant: 'success'
            })
            resetForm()
            if (successFunction) {
              successFunction()
            }
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, {
            variant: 'error'
          })
        })
    }
  })

  useEffect(() => {
    if (open) {
      formik.resetForm()
    }
  }, [open, type])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${type === 'UPDATE' ? 'Actualizar' : 'Nueva'} Nota`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DatePicker
                required
                label="Fecha"
                value={formik.values.date}
                helperText={formik.touched.date && formik.errors.date}
                error={formik.touched.date && Boolean(formik.errors.date)}
                onChange={(date) => {
                  formik.setFieldTouched('date')
                  formik.setFieldValue('date', date)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nota"
                required
                name="score"
                value={formik.values.score}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.score && Boolean(formik.errors.score)}
                helperText={formik.touched.score && formik.errors.score}
              />
            </Grid>
          </Grid>

          <Box textAlign="center" marginTop="10px">
            <Button onClick={onClose} variant="outlined">
              Cancelar
            </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              disabled={!formik.isValid || formik.isSubmitting}
              loading={formik.isSubmitting}
              success={success}
            >
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} Nota`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

AddScore.defaultProps = {
  type: 'CREATE'
}

export default AddScore
