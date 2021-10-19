import { capitalize } from 'lodash'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog } from '../../Shared'
import { Button, Select, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'

const statusList = ['OPCION 1', 'OPCION 2', 'OPCION 3']

const validationSchema = Yup.object().shape({
  careerName: Yup.string().required('Seleccione nombre de carrera'),
  promedio: Yup.string().required('Ingrese promedio'),
  ageCareer: Yup.string().required('Ingrese año de carrera'),
  tracking: Yup.string().required('Ingrese segumiento')
})

const Scholarship = ({
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
      careerName: type === 'UPDATE' ? data.careerName : '',
      promedio: type === 'UPDATE' ? data.promedio : '',
      ageCareer: type === 'UPDATE' ? data.ageCareer : '',
      tracking: type === 'UPDATE' ? data.tracking : ''
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${type === 'UPDATE' ? 'Actualizar' : 'Nueva'} restricción por beca`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Promedio de ultimo año cursado"
                required
                name="promedio"
                value={formik.values.promedio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.promedio && Boolean(formik.errors.promedio)
                }
                helperText={formik.touched.promedio && formik.errors.promedio}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Año de carrera"
                required
                name="ageCareer"
                value={formik.values.ageCareer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.ageCareer && Boolean(formik.errors.ageCareer)
                }
                helperText={formik.touched.ageCareer && formik.errors.ageCareer}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Nombre de Carrera"
                required
                name="careerName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.careerName}
                helperText={
                  formik.touched.careerName && formik.errors.careerName
                }
                error={
                  formik.touched.careerName && Boolean(formik.errors.careerName)
                }
              >
                <option value="">Seleccione nacionalidad</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Seguimiento"
                required
                name="tracking"
                value={formik.values.tracking}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.tracking && Boolean(formik.errors.tracking)
                }
                helperText={formik.touched.tracking && formik.errors.tracking}
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
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} restricción`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

Scholarship.defaultProps = {
  type: 'CREATE'
}

export default Scholarship
