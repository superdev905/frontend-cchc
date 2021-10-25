import * as Yup from 'yup'
import { useState } from 'react'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { DatePicker, Dialog } from '../Shared'
import { Button, Select, SubmitButton, TextArea, TextField } from '../UI'
import { useSuccess } from '../../hooks'

const options = [1, 2, 3]

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Ingrese nombre del curso'),
  founding: Yup.number().required('Seleccione financiamiento'),
  annualQuotas: Yup.string().required('Ingrese cupos anuales'),
  benefitCost: Yup.string().required('Ingrese costo del beneficio'),
  startDate: Yup.string().required('Ingrese fecha de inicio'),
  endDate: Yup.string().required('Ingrese fecha de termino'),
  status: Yup.number().required('Seleccione estado'),
  reuseAmount: Yup.string().required('Ingrese cantidad de reutilización'),
  executionSchedule: Yup.string().required('Ingrese programacion de ejecución'),
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
      annualQuotas: type === 'UPDATE' ? data.annualQuotas : '',
      benefitCost: type === 'UPDATE' ? data.benefitCost : '',
      startDate: type === 'UPDATE' ? data.startDate : '',
      endDate: type === 'UPDATE' ? data.endDate : '',
      status: type === 'UPDATE' ? data.status : '',
      reuseAmount: type === 'UPDATE' ? data.reuseAmount : '',
      executionSchedule: type === 'UPDATE' ? data.executionSchedule : '',
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
            <Grid item xs={12} md={9}>
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

            <Grid item xs={12} md={12}>
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
                <option value="">Seleccione financiamiento</option>
                {options.map((item) => (
                  <option
                    value={item.id}
                  >{`${item.names} ${item.paternal_surname} ${item.maternal_surname}`}</option>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Cupos Anuales"
                name="annualQuotas"
                required
                value={formik.values.annualQuotas}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.annualQuotas &&
                  Boolean(formik.errors.annualQuotas)
                }
                helperText={
                  formik.touched.annualQuotas && formik.errors.annualQuotas
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
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

            <Grid item xs={12} md={12}>
              <Select
                label="Estado"
                required
                name="status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.status}
                helperText={formik.touched.status && formik.errors.status}
                error={formik.touched.status && Boolean(formik.errors.status)}
              >
                <option value="">Seleccione estado</option>
                {options.map((item) => (
                  <option
                    value={item.id}
                  >{`${item.names} ${item.paternal_surname} ${item.maternal_surname}`}</option>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Cantidad de reutilización"
                name="reuseAmount"
                required
                value={formik.values.reuseAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.reuseAmount &&
                  Boolean(formik.errors.reuseAmount)
                }
                helperText={
                  formik.touched.reuseAmount && formik.errors.reuseAmount
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Programación de ejecución"
                name="executionSchedule"
                required
                value={formik.values.executionSchedule}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.executionSchedule &&
                  Boolean(formik.errors.executionSchedule)
                }
                helperText={
                  formik.touched.executionSchedule &&
                  formik.errors.executionSchedule
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
