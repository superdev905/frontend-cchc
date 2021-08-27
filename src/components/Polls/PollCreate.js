import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { DatePicker, Dialog } from '../Shared'
import { Button, Select, SubmitButton, TextField } from '../UI'
import { useSuccess } from '../../hooks'

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Seleccione obra'),
  //  start_date: Yup.date().required('Seleccione fecha de ingreso'),
  //  end_date: Yup.date().nullable(),
  state: Yup.string().nullable(),
  modules: Yup.string().required('Seleccione obra')
})

const PollCreate = ({
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
      title: type === 'UPDATE' ? data.title : '',
      start_date: type === 'UPDATE' ? data.start_date : '',
      end_date: type === 'UPDATE' ? data.end_date : '',
      modules: type === 'UPDATE' ? data.modules : '',
      state: type === 'UPDATE' ? data.state : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction(values)
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
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} Encuesta`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                label="Title"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Fecha de Incio"
                value={formik.values.start_date}
                required
                onChange={(date) => {
                  formik.setFieldValue('start_date', date)
                }}
                error={
                  formik.touched.start_date && Boolean(formik.errors.start_date)
                }
                helperText={
                  formik.touched.start_date && formik.errors.start_date
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Fecha de termino"
                value={formik.values.end_date}
                required
                onChange={(date) => {
                  formik.setFieldValue('end_date', date)
                }}
                error={
                  formik.touched.end_date && Boolean(formik.errors.end_date)
                }
                helperText={formik.touched.end_date && formik.errors.end_date}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Modulos"
                name="modules"
                onChange={formik.handleChange}
                value={formik.values.modules}
                required
                error={formik.touched.modules && Boolean(formik.errors.modules)}
                helperText={formik.touched.modules && formik.errors.modules}
              >
                <option value="">Seleccione una opción</option>
                {['VISITAS', 'EMPRESAS', 'OBRAS'].map((item, index) => (
                  <option key={`contract-type--${index}`} value={`${item}`}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Estado"
                name="state"
                onChange={formik.handleChange}
                value={formik.values.state}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              >
                <option value="">Seleccione una opción</option>
                {['ESTADO', 'ESTADO 2', 'ESTADO 3'].map((item, index) => (
                  <option key={`type--${index}`} value={`${item}`}>
                    {item}
                  </option>
                ))}
              </Select>
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
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} datos`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

PollCreate.defaultProps = {
  type: 'CREATE'
}

export default PollCreate
