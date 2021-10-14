import * as Yup from 'yup'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { DatePicker, Dialog } from '../Shared'
import { Button, SubmitButton, TextField } from '../UI'
import { useSuccess } from '../../hooks'

const validationSchema = Yup.object().shape({
  date: Yup.string().required('Ingrese fecha'),
  assistance: Yup.string().required('Ingrese asistencia'),
  summary: Yup.string().required('Ingrese resumen')
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
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      date: type === 'UPDATE' ? data.date : '',
      assistance: type === 'UPDATE' ? data.assistance : '',
      summary: type === 'UPDATE' ? data.summary : ''
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
          {`${type === 'UPDATE' ? 'Actualizar' : 'Nueva'} Seguimiento`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DatePicker
                label="Fecha"
                value={formik.values.date}
                onChange={formik.handleChange}
                helperText={formik.touched.date && formik.errors.date}
                error={formik.touched.date && Boolean(formik.errors.date)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Asistencia"
                required
                name="assistance"
                value={formik.values.assistance}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.assistance && Boolean(formik.errors.assistance)
                }
                helperText={
                  formik.touched.assistance && formik.errors.assistance
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Resumen"
                required
                name="summary"
                value={formik.values.summary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.summary && Boolean(formik.errors.summary)}
                helperText={formik.touched.summary && formik.errors.summary}
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
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} Seguimiento`}
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
