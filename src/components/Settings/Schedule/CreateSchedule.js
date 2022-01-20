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
  start_time: Yup.date().nullable().required('Sleccione hora de inicio'),
  end_time: Yup.date().nullable().required('Sleccione hora de fin')
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
      start_time:
        type === 'UPDATE'
          ? new Date(`December 17, 1995 ${data?.start_time}`)
          : new Date('December 17, 1995 08:00:00'),
      end_time:
        type === 'UPDATE'
          ? new Date(`December 17, 1995 ${data?.end_time}`)
          : new Date('December 17, 1995 18:00:00')
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({
        name: values.name,
        start_time: new Date(values.start_time).toLocaleTimeString(),
        end_time: new Date(values.end_time).toLocaleTimeString(),
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
                    value={formik.values.start_time}
                    onChange={(date) => {
                      if (date < formik.values.end_time) {
                        formik.setFieldValue('start_time', new Date(date))
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <InputLabel required>Hora de fin</InputLabel>
                  <TimePicker
                    value={formik.values.end_time}
                    onChange={(date) => {
                      if (date > formik.values.start_time) {
                        formik.setFieldValue('end_time', new Date(date))
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
              disabled={!formik.isValid}
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
