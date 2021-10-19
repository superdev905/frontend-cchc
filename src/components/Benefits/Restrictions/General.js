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
  nationality: Yup.string().required('Seleccione nacionalidad'),
  rsh: Yup.string().required('Seleccione rsh'),
  legalCharge: Yup.string().required('Seleccione carga legal'),
  prevision: Yup.string().required('Seleccione previsión'),
  jubilado: Yup.string().required('Seleccione estado de jubilación'),
  reconocer: Yup.string().required('Seleccione si pertenece a reconocer'),
  age: Yup.string().required('Ingrese edad'),
  gender: Yup.string().required('Seleccione genero'),
  typeActivity: Yup.string().required('Seleccione tipo de actividad'),
  quienInscribe: Yup.string().required('Seleccione quien inscribe'),
  financiamiento: Yup.string().required('Seleccione financiamiento'),
  renta: Yup.string().required('Ingrese renta')
})

const General = ({
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
      nationality: type === 'UPDATE' ? data.nationality : '',
      rsh: type === 'UPDATE' ? data.rsh : '',
      legalCharge: type === 'UPDATE' ? data.legalCharge : '',
      prevision: type === 'UPDATE' ? data.prevision : '',
      jubilado: type === 'UPDATE' ? data.jubilado : '',
      reconocer: type === 'UPDATE' ? data.reconocer : '',
      age: type === 'UPDATE' ? data.age : '',
      gender: type === 'UPDATE' ? data.gender : '',
      typeActivity: type === 'UPDATE' ? data.typeActivity : '',
      quienInscribe: type === 'UPDATE' ? data.quienInscribe : '',
      financiamiento: type === 'UPDATE' ? data.financiamiento : '',
      renta: type === 'UPDATE' ? data.renta : ''
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
          {`${type === 'UPDATE' ? 'Actualizar' : 'Nueva'} restricción general`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Select
                label="Nacionalidad"
                required
                name="nationality"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nationality}
                helperText={
                  formik.touched.nationality && formik.errors.nationality
                }
                error={
                  formik.touched.nationality &&
                  Boolean(formik.errors.nationality)
                }
              >
                <option value="">Seleccione nacionalidad</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                label="RSH"
                required
                name="rsh"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rsh}
                helperText={formik.touched.rsh && formik.errors.rsh}
                error={formik.touched.rsh && Boolean(formik.errors.rsh)}
              >
                <option value="">Seleccione rsh</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                label="Carga legal"
                required
                name="legalCharge"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.legalCharge}
                helperText={
                  formik.touched.legalCharge && formik.errors.legalCharge
                }
                error={
                  formik.touched.legalCharge &&
                  Boolean(formik.errors.legalCharge)
                }
              >
                <option value="">Seleccione carga legal</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                label="Previsión"
                required
                name="prevision"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.prevision}
                helperText={formik.touched.prevision && formik.errors.prevision}
                error={
                  formik.touched.prevision && Boolean(formik.errors.prevision)
                }
              >
                <option value="">Seleccione previsión</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                label="Jubilado"
                required
                name="jubilado"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.jubilado}
                helperText={formik.touched.jubilado && formik.errors.jubilado}
                error={
                  formik.touched.jubilado && Boolean(formik.errors.jubilado)
                }
              >
                <option value="">Seleccione estado de jubilación</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                label="Pertenece a reconocer"
                required
                name="reconocer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.reconocer}
                helperText={formik.touched.reconocer && formik.errors.reconocer}
                error={
                  formik.touched.reconocer && Boolean(formik.errors.reconocer)
                }
              >
                <option value="">Seleccione opcion</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Edad"
                name="age"
                required
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.age && Boolean(formik.errors.age)}
                helperText={formik.touched.age && formik.errors.age}
                inputProps={{ maxLength: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                label="Sexo"
                required
                name="gender"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
                helperText={formik.touched.gender && formik.errors.gender}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
              >
                <option value="">Seleccione opcion</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                label="Tipo de actividad por participantes"
                required
                name="typeActivity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.typeActivity}
                helperText={
                  formik.touched.typeActivity && formik.errors.typeActivity
                }
                error={
                  formik.touched.typeActivity &&
                  Boolean(formik.errors.typeActivity)
                }
              >
                <option value="">Seleccione opcion</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                label="Quien inscribe"
                required
                name="quienInscribe"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.quienInscribe}
                helperText={
                  formik.touched.quienInscribe && formik.errors.quienInscribe
                }
                error={
                  formik.touched.quienInscribe &&
                  Boolean(formik.errors.quienInscribe)
                }
              >
                <option value="">Seleccione quien inscribe</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                label="Financiamiento"
                required
                name="financiamiento"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.financiamiento}
                helperText={
                  formik.touched.financiamiento && formik.errors.financiamiento
                }
                error={
                  formik.touched.financiamiento &&
                  Boolean(formik.errors.financiamiento)
                }
              >
                <option value="">Seleccione financiamiento</option>
                {statusList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Renta tope para postular"
                required
                name="renta"
                value={formik.values.renta}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.renta && Boolean(formik.errors.renta)}
                helperText={formik.touched.renta && formik.errors.renta}
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

General.defaultProps = {
  type: 'CREATE'
}

export default General
