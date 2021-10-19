import { capitalize } from 'lodash'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog } from '../../Shared'
import { Button, Select, SubmitButton } from '../../UI'
import { useSuccess } from '../../../hooks'

const statusList = ['OPCION 1', 'OPCION 2', 'OPCION 3']

const validationSchema = Yup.object().shape({
  empresa: Yup.string().required('Seleccione empresa'),
  obra: Yup.string().required('Seleccione obra'),
  tipoDeEmpresa: Yup.string().required('Seleccione tipo de empresa'),
  relacionServicioSocial: Yup.string().required(
    'Seleccione relacion servicio social'
  ),
  giroEmpresa: Yup.string().required('Seleccione giro de empresa'),
  tipoTrabajador: Yup.string().required('Seleccione tipo de trabajador'),
  cobertura: Yup.string().required('Seleccione cobertura'),
  oficinaRegional: Yup.string().required('Seleccione oficina regional')
})

const Company = ({
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
      empresa: type === 'UPDATE' ? data.empresa : '',
      obra: type === 'UPDATE' ? data.obra : '',
      tipoDeEmpresa: type === 'UPDATE' ? data.tipoDeEmpresa : '',
      relacionServicioSocial:
        type === 'UPDATE' ? data.relacionServicioSocial : '',
      giroEmpresa: type === 'UPDATE' ? data.giroEmpresa : '',
      tipoTrabajador: type === 'UPDATE' ? data.tipoTrabajador : '',
      cobertura: type === 'UPDATE' ? data.cobertura : '',
      oficinaRegional: type === 'UPDATE' ? data.oficinaRegional : ''
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
          {`${
            type === 'UPDATE' ? 'Actualizar' : 'Nueva'
          } restricción por empresa`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Select
                label="Empresa"
                required
                name="empresa"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.empresa}
                helperText={formik.touched.empresa && formik.errors.empresa}
                error={formik.touched.empresa && Boolean(formik.errors.empresa)}
              >
                <option value="">Seleccione empresa</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Obra"
                required
                name="obra"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.obra}
                helperText={formik.touched.obra && formik.errors.obra}
                error={formik.touched.obra && Boolean(formik.errors.obra)}
              >
                <option value="">Seleccione obra</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Tipo de empresa"
                required
                name="tipoDeEmpresa"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tipoDeEmpresa}
                helperText={
                  formik.touched.tipoDeEmpresa && formik.errors.tipoDeEmpresa
                }
                error={
                  formik.touched.tipoDeEmpresa &&
                  Boolean(formik.errors.tipoDeEmpresa)
                }
              >
                <option value="">Seleccione tipo de empresa</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Relación servicio social"
                required
                name="relacionServicioSocial"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.relacionServicioSocial}
                helperText={
                  formik.touched.relacionServicioSocial &&
                  formik.errors.relacionServicioSocial
                }
                error={
                  formik.touched.relacionServicioSocial &&
                  Boolean(formik.errors.relacionServicioSocial)
                }
              >
                <option value="">Seleccione relacion</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Giro empresa"
                required
                name="giroEmpresa"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.giroEmpresa}
                helperText={
                  formik.touched.giroEmpresa && formik.errors.giroEmpresa
                }
                error={
                  formik.touched.giroEmpresa &&
                  Boolean(formik.errors.giroEmpresa)
                }
              >
                <option value="">Seleccione giro</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Tipo de trabajador"
                required
                name="tipoTrabajador"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tipoTrabajador}
                helperText={
                  formik.touched.tipoTrabajador && formik.errors.tipoTrabajador
                }
                error={
                  formik.touched.tipoTrabajador &&
                  Boolean(formik.errors.tipoTrabajador)
                }
              >
                <option value="">Seleccione tipo</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <Select
                label="Cobertura"
                required
                name="cobertura"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cobertura}
                helperText={formik.touched.cobertura && formik.errors.cobertura}
                error={
                  formik.touched.cobertura && Boolean(formik.errors.cobertura)
                }
              >
                <option value="">Seleccione cobertura</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Oficina regional"
                required
                name="oficinaRegional"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.oficinaRegional}
                helperText={
                  formik.touched.oficinaRegional &&
                  formik.errors.oficinaRegional
                }
                error={
                  formik.touched.oficinaRegional &&
                  Boolean(formik.errors.oficinaRegional)
                }
              >
                <option value="">Seleccione oficina</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
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
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} restricción`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

Company.defaultProps = {
  type: 'CREATE'
}

export default Company
