import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { DatePicker, Dialog } from '../../Shared'
import { Button, Select, SubmitButton, TextArea } from '../../UI'
import { decisionList } from '../../../config'
import { useSuccess } from '../../../hooks'

const validationSchema = Yup.object().shape({
  date: Yup.date().nullable().required('Seleccione fecha'),
  status: Yup.string().required('Seleccione estado'),
  modality: Yup.string().required('Seleccione estado'),
  observation: Yup.string().required('Ingrese comentarios')
})

const ApproveDialog = ({
  open,
  onClose,
  data,
  submitFunction,
  successMessage
}) => {
  const { isMobile } = useSelector((state) => state.ui)
  const { success } = useSuccess()
  const { enqueueSnackbar } = useSnackbar()
  const formik = useFormik({
    validateOnMount: true,
    validateOnChange: true,
    validationSchema,
    initialValues: {
      date: data ? new Date(data.date) : null,
      status: data ? data.status : '',
      modality: data ? data.modality : '',
      observation: data ? data.observation : ''
    },
    onSubmit: (values) => {
      submitFunction(values)
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, { variant: 'success' })
          onClose()
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
        <Box mb={1}>
          <Typography
            align="center"
            variant="h6"
            style={{ fontWeight: 'bold' }}
          >
            Datos de envio
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2}>
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
              <DatePicker
                required
                label="Fecha"
                value={formik.values.date}
                onChange={(targetDate) => {
                  formik.setFieldValue('date', targetDate)
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Select
                required
                name="modality"
                label="Modalidad"
                value={formik.values.modality}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.modality && Boolean(formik.errors.modality)
                }
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
                  formik.touched.observation &&
                  Boolean(formik.errors.observation)
                }
                helperText={
                  formik.touched.observation && formik.errors.observation
                }
                maxLength={800}
              />
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              disabled={!formik.isValid || formik.isSubmitting}
              loading={formik.isSubmitting}
              success={success}
            >
              Guardar
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}
ApproveDialog.propTypes = {}

export default ApproveDialog
