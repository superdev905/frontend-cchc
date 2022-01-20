import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog, TimePicker } from '../../Shared'
import { Button, SubmitButton, InputLabel, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Ingrese tipo de Jornada'),
  start_date: Yup.date().nullable().required('Sleccione hora de inicio'),
  end_date: Yup.date().nullable().required('Sleccione hora de fin')
})

const CreateSchedule = ({
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
  const { user } = useSelector((state) => state.auth)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      name: type === 'UPDATE' ? data?.name : '',
      start_date: type === 'UPDATE' ? new Date(17) : new Date(17),
      end_date: type === 'UPDATE' ? new Date(17) : new Date(17)
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({
        name: values.name,
        start_date: new Date(values.start_date).toISOString(),
        end_date: new Date(values.end_date).toISOString(),
        created_by: user.id
      })
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })

          changeSuccess(true, () => {
            onClose()
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'lg'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${type === 'Update' ? 'Actualizar' : 'Nueva'} Jornada`}
        </Typography>
        <Box p={2}>
          <Grid container>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    label="Nombre de Jornada"
                    required
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <InputLabel required>Hora de inicio</InputLabel>
                  <TimePicker
                    value={formik.values.start_date}
                    onChange={(date) => {
                      if (date < formik.values.end_date) {
                        formik.setFieldValue('start_date', new Date(date))
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <InputLabel required>Hora de fin</InputLabel>
                  <TimePicker
                    value={formik.values.end_date}
                    onChange={(date) => {
                      if (date > formik.values.start_date) {
                        formik.setFieldValue('end_date', new Date(date))
                      }
                    }}
                  />
                </Grid>
              </Grid>
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
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} Jornada`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

CreateSchedule.defaultProps = {
  type: 'CREATE'
}

export default CreateSchedule
