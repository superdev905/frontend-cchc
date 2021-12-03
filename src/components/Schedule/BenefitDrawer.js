import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { months } from '../../config'
import { Button, Select } from '../UI'
import { Dialog } from '../Shared'

const validationSchema = Yup.object().shape({
  startMonth: Yup.string().required('Selecciones mes de inicio'),
  endMonth: Yup.string().required('Selecciones mes de inicio')
})

const BenefitDrawer = ({ open, onClose, onSubmit, benefit, data, type }) => {
  const { isMobile } = useSelector((state) => state.ui)

  const formik = useFormik({
    validateOnMount: true,
    validateOnChange: true,
    validationSchema,
    initialValues: {
      startMonth:
        type === 'UPDATE'
          ? months.find((item) => item.name === data.startMonth).index
          : '',
      endMonth:
        type === 'UPDATE'
          ? months.find((item) => item.name === data.endMonth).index
          : ''
    }
  })

  const handleSubmit = () => {
    const formattedValues = {
      startMonth: months.find(
        (item) => item.index === parseInt(formik.values.startMonth, 10)
      ).name,
      endMonth: months.find(
        (item) => item.index === parseInt(formik.values.endMonth, 10)
      ).name
    }
    onSubmit(benefit.id, formattedValues)
    onClose()
  }
  return (
    <Dialog
      anchor="right"
      fullWidth
      fullScreen={isMobile}
      open={open}
      onClose={onClose}
    >
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          Programar Beneficio
        </Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Select
                label="Mes de inicio"
                name="startMonth"
                value={formik.values.startMonth}
                onChange={(e) => {
                  formik.setFieldValue('startMonth', e.target.value)
                  formik.setFieldTouched('startMonth')
                  formik.setFieldValue('endMonth', '')
                }}
                helperText={
                  formik.touched.startMonth && formik.errors.startMonth
                }
                error={
                  formik.touched.startMonth && Boolean(formik.errors.startMonth)
                }
              >
                <option value="">SELECCIONE MES</option>
                {months.map((item) => (
                  <option
                    key={`end-month-option-${item.index}`}
                    value={item.index}
                  >
                    {item.name.toUpperCase()}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Mes de fin"
                name="endMonth"
                value={formik.values.endMonth}
                onChange={formik.handleChange}
                helperText={formik.touched.endMonth && formik.errors.endMonth}
                error={
                  formik.touched.endMonth && Boolean(formik.errors.endMonth)
                }
              >
                <option value="">SELECCIONE MES</option>
                {months.map((item) => (
                  <option
                    key={`end-month-option-${item.index}`}
                    value={item.index}
                    disabled={item.index <= formik.values.startMonth}
                  >
                    {item.name.toUpperCase()}
                  </option>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Box mt={2} textAlign="center">
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <Button disabled={!formik.isValid} onClick={handleSubmit}>
              Guardar
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

BenefitDrawer.defaultProps = {
  type: 'CREATE'
}

export default BenefitDrawer
