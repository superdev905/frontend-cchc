import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { DatePicker, Dialog, TimePicker } from '../../Shared'
import { Button, InputLabel, Select, SubmitButton, TextArea } from '../../UI'
import { decisionList } from '../../../config'
import { useSuccess } from '../../../hooks'

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Seleccione fecha').nullable(),
  status: Yup.string().required('Seleccione estado'),
  modality: Yup.string(),
  observation: Yup.string()
})

const MeetingDialog = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successMessage
}) => {
  const { isMobile } = useSelector((state) => state.ui)

  const { success, changeSuccess } = useSuccess()

  const { enqueueSnackbar } = useSnackbar()
  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    initialValues: {
      date: type === 'UPDATE' ? new Date(data.date) : null,
      status: type === 'UPDATE' ? data.status : '',
      modality: type === 'UPDATE' ? data.modality : '',
      observation: type === 'UPDATE' ? data.observation : ''
    },
    onSubmit: (values) => {
      submitFunction(values)
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            onClose()
            enqueueSnackbar(successMessage, { variant: 'success' })
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })

  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMobile} fullWidth>
      <Box>
        <Typography
          align="center"
          style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}
        >
          Nueva reunión
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <DatePicker
              required
              label="Fecha"
              value={formik.values.date}
              onChange={(targetDate) => {
                formik.setFieldValue('date', targetDate)
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel required>Hora</InputLabel>
            <TimePicker
              value={formik.values.date}
              onChange={(targetDate) => {
                formik.setFieldValue('date', targetDate)
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              required
              name="status"
              label="Estado"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
            >
              <option value="">Seleccione estado</option>
              {decisionList.map((item) => (
                <option key={`option-status-${item}`} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              required
              name="modality"
              label="Modalidad"
              value={formik.values.modality}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.modality && Boolean(formik.errors.modality)}
              helperText={formik.touched.modality && formik.errors.modality}
            >
              <option value="">Seleccione estado</option>
              {['ONLINE', 'PRESENCIAL'].map((item) => (
                <option key={`option-modality-${item}`} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextArea
              required
              name="observation"
              label="Observación"
              value={formik.values.observation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.observation && Boolean(formik.errors.observation)
              }
              helperText={
                formik.touched.observation && formik.errors.observation
              }
            />
          </Grid>
        </Grid>
        <Box textAlign="center" mt={2}>
          <Button onClick={onClose} variant="outlined">
            Cancelar
          </Button>
          <SubmitButton
            loading={formik.isSubmitting}
            success={success}
            onClick={formik.handleSubmit}
            disabled={!formik.isValid && formik.isSubmitting}
          >
            Guardar
          </SubmitButton>
        </Box>
      </Box>
    </Dialog>
  )
}

MeetingDialog.defaultProps = {
  type: 'CREATE'
}

export default MeetingDialog
