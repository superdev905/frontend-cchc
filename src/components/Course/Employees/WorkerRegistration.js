import * as Yup from 'yup'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { addMonths } from 'date-fns'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog } from '../../Shared'
import { Button, RutTextField, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'

const validationSchema = Yup.object().shape({
  rut: Yup.string().required('Ingrese rut'),
  name: Yup.string().required('Ingrese nombre del trabajador')
})

const WorkerRegistration = ({
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
      rut: type === 'UPDATE' ? data.rut : '',
      name: type === 'UPDATE' ? data.name : ''
    },
    onSubmit: (values) => {
      submitFunction({
        ...values,
        createDate: new Date(addMonths(new Date(), 1))
      })
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })

          changeSuccess(true, () => {
            onClose()
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
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'lg'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${type === 'Registrar' ? 'Actualizar' : 'Nuevo'} Trabajador`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <RutTextField
                label="Rut"
                name="rut"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rut}
                helperText={formik.touched.rut && formik.errors.rut}
                error={formik.touched.rut && Boolean(formik.errors.rut)}
                required
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Nombre"
                required
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
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
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} Trabajador`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

WorkerRegistration.defaultProps = {
  type: 'CREATE'
}

export default WorkerRegistration
