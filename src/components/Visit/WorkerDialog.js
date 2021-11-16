import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Dialog } from '../Shared'
import { Button, SubmitButton, TextField } from '../UI'
import { useSuccess } from '../../hooks'

const validationSchema = Yup.object().shape({
  company_workers: Yup.number().required('Ingrese trabajadores'),
  outsourced_workers: Yup.number().required('Ingrese trabajadores')
})

const WorkerDialog = ({
  open,
  onClose,
  submitFunction,
  data,
  successFunction
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const { isMobile } = useSelector((state) => state.ui)
  const { success, changeSuccess } = useSuccess()

  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    initialValues: {
      company_workers: data.company_workers,
      outsourced_workers: data.outsourced_workers
    },
    onSubmit: (values) => {
      submitFunction(values)
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            if (successFunction) {
              successFunction()
              onClose()
            }
            enqueueSnackbar('Datos actualizados', { variant: 'success' })
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })
  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMobile}>
      <Box>
        <Box mb={2}>
          <Typography align="center" variant="h6">
            Actualizar número de trabajadores
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                type="number"
                label="Trabajadores de casa"
                name="company_workers"
                value={formik.values.company_workers}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.company_workers &&
                  Boolean(formik.errors.company_workers)
                }
                helperText={
                  formik.touched.company_workers &&
                  Boolean(formik.errors.company_workers)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Trabajadores de subcontrato"
                required
                type="number"
                name="outsourced_workers"
                value={formik.values.outsourced_workers}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.outsourced_workers &&
                  Boolean(formik.errors.outsourced_workers)
                }
                helperText={
                  formik.touched.outsourced_workers &&
                  Boolean(formik.errors.outsourced_workers)
                }
              />
            </Grid>
          </Grid>
        </Box>
        <Box textAlign="center">
          <Button variant="outlined" onClick={onClose}>
            Cerrar
          </Button>
          <SubmitButton
            loading={formik.isSubmitting}
            disabled={!formik.isValid}
            onClick={formik.handleSubmit}
            success={success}
          >
            Actualizar
          </SubmitButton>
        </Box>
      </Box>
    </Dialog>
  )
}
export default WorkerDialog
