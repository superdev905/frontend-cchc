import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { CurrencyTextField, DatePicker, Dialog } from '../Shared'
import { Button, Select, SubmitButton, TextArea, TextField } from '../UI'
import { useSuccess } from '../../hooks'

const options = ['opcion1', 'opcioon2']
const statusList = ['VIGENTE', 'NO VIGENTE']

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Ingrese nombre del curso'),
  founding: Yup.string().required('Seleccione financiamiento'),
  annualAmount: Yup.string().required('Ingrese cupos anuales'),
  benefitCost: Yup.string().required('Ingrese costo del beneficio'),
  startDate: Yup.string().required('Ingrese fecha de inicio'),
  endDate: Yup.string().required('Ingrese fecha de termino'),
  isActive: Yup.string().required('Seleccione estado'),
  reuseQuantity: Yup.string().required('Ingrese cantidad de reutilización'),
  executeSchedule: Yup.number().required('Ingrese programacion de ejecución'),
  temporality: Yup.number().required('Ingrese temporalidad'),
  description: Yup.string().required('Ingrese descripción')
})

const CreateActivity = ({
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
      name: type === 'UPDATE' ? data.name : '',
      founding: type === 'UPDATE' ? data.founding : '',
      annualAmount: type === 'UPDATE' ? data.annualAmount : '',
      benefitCost: type === 'UPDATE' ? data.benefitCost : '',
      startDate: type === 'UPDATE' ? data.startDate : null,
      endDate: type === 'UPDATE' ? data.endDate : null,
      isActive: type === 'UPDATE' ? data.isActive : '',
      reuseQuantity: type === 'UPDATE' ? data.reuseQuantity : '',
      executeSchedule: type === 'UPDATE' ? data.executeSchedule : '',
      temporality: type === 'UPDATE' ? data.temporality : '',
      description: type === 'UPDATE' ? data.description : ''
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
          {`${type === 'UPDATE' ? 'Actualizar' : 'Nueva'} Actividad`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
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

            <Grid item xs={12} md={6}>
              <Select
                label="Financiamiento"
                required
                name="founding"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.founding}
                helperText={formik.touched.founding && formik.errors.founding}
                error={
                  formik.touched.founding && Boolean(formik.errors.founding)
                }
              >
                <option value="">SELECCIONE FINANCIAMIENTO</option>
                {options.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Cupos Anuales"
                name="annualAmount"
                required
                type="number"
                value={formik.values.annualAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.annualAmount &&
                  Boolean(formik.errors.annualAmount)
                }
                helperText={
                  formik.touched.annualAmount && formik.errors.annualAmount
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CurrencyTextField
                label="Costo del beneficio"
                name="benefitCost"
                required
                value={formik.values.benefitCost}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.benefitCost &&
                  Boolean(formik.errors.benefitCost)
                }
                helperText={
                  formik.touched.benefitCost && formik.errors.benefitCost
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                required
                label="Fecha de inicio"
                disabledFuture={false}
                value={formik.values.startDate}
                helperText={formik.touched.startDate && formik.errors.startDate}
                error={
                  formik.touched.startDate && Boolean(formik.errors.startDate)
                }
                onChange={(date) => {
                  formik.setFieldTouched('startDate')
                  formik.setFieldValue('startDate', date)
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DatePicker
                required
                label="Fecha de termino"
                minDate={formik.values.startDate}
                disabledPast
                disabledFuture={false}
                value={formik.values.endDate}
                helperText={formik.touched.endDate && formik.errors.endDate}
                error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                onChange={(date) => {
                  formik.setFieldTouched('endDate')
                  formik.setFieldValue('endDate', date)
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Select
                label="Estado"
                required
                name="isActive"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.isActive}
                helperText={formik.touched.isActive && formik.errors.isActive}
                error={
                  formik.touched.isActive && Boolean(formik.errors.isActive)
                }
              >
                <option value="">SELECCIONE ESTADO</option>
                {statusList.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Cantidad de reutilización"
                name="reuseQuantity"
                required
                type="number"
                value={formik.values.reuseQuantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.reuseQuantity &&
                  Boolean(formik.errors.reuseQuantity)
                }
                helperText={
                  formik.touched.reuseQuantity && formik.errors.reuseQuantity
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Programación de ejecución"
                name="executeSchedule"
                required
                value={formik.values.executeSchedule}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.executeSchedule &&
                  Boolean(formik.errors.executeSchedule)
                }
                helperText={
                  formik.touched.executeSchedule &&
                  formik.errors.executeSchedule
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Temporalidad"
                name="temporality"
                required
                type="number"
                value={formik.values.temporality}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.temporality &&
                  Boolean(formik.errors.temporality)
                }
                helperText={
                  formik.touched.temporality && formik.errors.temporality
                }
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextArea
                label="Descripción"
                required
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
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
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} Actividad`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

CreateActivity.defaultProps = {
  type: 'CREATE'
}

export default CreateActivity
