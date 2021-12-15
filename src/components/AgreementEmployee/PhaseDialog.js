import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { DatePicker, Dialog } from '../Shared'
import { Button, Select, SubmitButton } from '../UI'
import { useSuccess } from '../../hooks'

const validationSchema = Yup.object().shape({
  status: Yup.string().required('Seleccione estado').nullable(),
  startDate: Yup.date().nullable(),
  endDate: Yup.date().nullable()
})

const PhaseDialog = ({
  open,
  onClose,
  data,
  submitFunction,
  successFunction
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    initialValues: {
      status: data.status || null,
      startDate: data?.startDate || null,
      endDate: data?.endDate || null
    },
    onSubmit: (values) => {
      submitFunction(values)
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            successFunction()
            onClose()
            enqueueSnackbar('Etapa actualizada', { variant: 'success' })
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Box>
        <Typography align="center" variant="h6">
          Actualizar etapa
        </Typography>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Select
                label="Estado"
                required
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
              >
                <option value="">Selecciona una entidad</option>
                {['INICIADA', 'PENDIENTE', 'TERMINADA', 'NO APLICA'].map(
                  (item) => (
                    <option key={`option-status-${item}`} value={item}>
                      {item}
                    </option>
                  )
                )}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Fecha de inicio"
                value={formik.values.startDate}
                onChange={(date) => {
                  formik.setFieldValue('startDate', date)
                  formik.setFieldValue('endDate', null)
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Fecha de din"
                value={formik.values.endDate}
                onChange={(date) => {
                  formik.setFieldValue('endDate', date)
                }}
                disabledPast
                minDate={formik.values.startDate}
              />
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <SubmitButton
              disabled={!formik.isValid}
              onClick={formik.handleSubmit}
              loading={formik.isSubmitting}
              success={success}
            >
              Actualizar
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default PhaseDialog
