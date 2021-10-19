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
  careerId: Yup.string().required('Seleccione nombre de carrera'),
  averageLastYear: Yup.string().required('Ingrese averageLastYear'),
  semester: Yup.string().required('Ingrese año de carrera'),
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
      careerId: type === 'UPDATE' ? data.careerId : '',
      averageLastYear: type === 'UPDATE' ? data.averageLastYear : '',
      semester: type === 'UPDATE' ? data.semester : '',
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
                name="averageLastYear"
                value={formik.values.averageLastYear}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.averageLastYear &&
                  Boolean(formik.errors.averageLastYear)
                }
                helperText={
                  formik.touched.averageLastYear &&
                  formik.errors.averageLastYear
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Año de carrera"
                required
                name="semester"
                value={formik.values.semester}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.semester && Boolean(formik.errors.semester)
                }
                helperText={formik.touched.semester && formik.errors.semester}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Nombre de Carrera"
                required
                name="careerId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.careerId}
                helperText={formik.touched.careerId && formik.errors.careerId}
                error={
                  formik.touched.careerId && Boolean(formik.errors.careerId)
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
