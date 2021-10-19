import * as Yup from 'yup'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { Box, Grid, Typography } from '@material-ui/core'
import { capitalize } from 'lodash'
import { Select, TextField } from '../UI'
import useStyles from './styles'
import Actions from './Actions'
import benefitsActions from '../../state/actions/benefits'
import { DatePicker } from '../Shared'

const statusList = ['APROBADA', 'RECHAZADA', 'CONDICIONAL']

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .min(5, 'Debe contener al menos 5 caracteres')
    .required('Ingrese código'),
  benefitName: Yup.string().required('Ingrese nombre del curso'),
  startDate: Yup.date().required('Seleccione fecha de inicio'),
  endDate: Yup.date().required('Seleccione fecha de termino'),
  status: Yup.string().required('Seleccione estado'),
  annualQuotas: Yup.string().required('Ingrese cupos anuales')
})

const StepOne = ({ onClose, data }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { create } = useSelector((state) => state.benefits)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      code: create?.benefit?.code || '',
      startDate: create?.benefit?.startDate || '',
      endDate: create?.benefit?.endDate || '',
      benefitName: create?.benefit?.benefitName || '',
      annualQuotas: create?.benefit?.annualQuotas || '',
      state: create?.benefit?.state || ''
    },
    onSubmit: (values) => {
      dispatch(
        benefitsActions.updateCreate({
          ...create,
          benefit: { ...create.benefit, ...values },
          step: create.step + 1
        })
      )
    }
  })

  useEffect(() => {
    if (data) {
      dispatch(
        benefitsActions.updateCreate({
          ...create,
          ...data
        })
      )
    }
  }, [data])

  return (
    <Box className={classes.form}>
      <Box>
        <Typography align="center" className={classes.subtitle}>
          Nuevo Beneficio
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Código"
              name="code"
              required
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
              inputProps={{ maxLength: 5 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Nombre del beneficio"
              name="benefitName"
              required
              value={formik.values.benefitName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.benefitName && Boolean(formik.errors.benefitName)
              }
              helperText={
                formik.touched.benefitName && formik.errors.benefitName
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DatePicker
              required
              label="Fecha de inicio"
              value={formik.values.startDate}
              helperText={formik.touched.startDate && formik.errors.startDate}
              error={
                formik.touched.startDate && Boolean(formik.errors.startDate)
              }
              onChange={(startDate) => {
                formik.setFieldTouched('startDate')
                formik.setFieldValue('startDate', startDate)
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DatePicker
              required
              label="Fecha de termino"
              value={formik.values.endDate}
              helperText={formik.touched.endDate && formik.errors.endDate}
              error={formik.touched.endDate && Boolean(formik.errors.endDate)}
              onChange={(endDate) => {
                formik.setFieldTouched('endDate')
                formik.setFieldValue('endDate', endDate)
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Select
              label="Estado"
              required
              name="state"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
              helperText={formik.touched.state && formik.errors.state}
              error={formik.touched.state && Boolean(formik.errors.state)}
            >
              <option value="">Seleccione estado</option>
              {statusList.map((item) => (
                <option value={item}>{capitalize(item)}</option>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Cupos anuales"
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
        </Grid>
      </Box>
      <Actions
        showBackIcon={false}
        handleBack={onClose}
        backText="Cancelar"
        disabledNext={formik.isValid}
        handleNext={formik.handleSubmit}
      />
    </Box>
  )
}

export default StepOne
