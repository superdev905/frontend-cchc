import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Autocomplete } from '@material-ui/lab'
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  FormHelperText
} from '@material-ui/core'
import unemployedActions from '../../state/actions/unemployed'
import { months } from '../../config'
import { Dialog } from '../Shared'
import { Button, Select, SubmitButton, TextField } from '../UI'

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
}))

const validationSchema = Yup.object().shape({
  month: Yup.number().required('Seleccione mes'),
  period: Yup.number().required('Seleccione periodo'),
  benefitId: Yup.number().required('Seleccione benefit')
})

const PaymentDialog = ({ open, onClose }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const [periods, setPeriods] = useState([])
  const [benefits, setBenefits] = useState([])
  const [selectedBenefit, setSelectedBenefit] = useState(null)

  const formik = useFormik({
    validationSchema,
    validateOnChange: true,
    validateOnMount: true,
    initialValues: {
      period: '',
      month: '',
      benefitId: ''
    }
  })

  const getPeriods = () => {
    const currentYear = new Date().getFullYear()
    const minYear = currentYear - 1
    const yearsList = []
    for (let i = currentYear; i >= minYear; i -= 1) {
      yearsList.push(i)
    }
    return yearsList
  }

  const getBenefitsList = () => {
    dispatch(unemployedActions.getUnemployedBenefits()).then((res) => {
      setBenefits(res)
    })
  }

  useEffect(() => {
    if (open) {
      getBenefitsList()
      setPeriods(getPeriods())
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMobile} fullWidth>
      <Box>
        <Typography className={classes.title} align="center">
          Registrar pago
        </Typography>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Autocomplete
                options={benefits}
                value={selectedBenefit}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                onChange={(__, value) => {
                  setSelectedBenefit(value || null)
                  formik.setFieldValue('benefitId', value?.id || '')
                  formik.setFieldTouched('benefitId')
                }}
                renderOption={(option) => (
                  <Box>
                    <Typography>{option.name}</Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona beneficio"
                    placeholder="Beneficio"
                  />
                )}
              />
              {formik.touched.benefitId && Boolean(formik.errors.benefitId) && (
                <FormHelperText error>{formik.errors.benefitId}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <Select
                label={'Mes'}
                name="month"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                error={formik.touched.month && Boolean(formik.errors.month)}
                helperText={formik.touched.month && formik.errors.month}
              >
                <option value="">SELECCIONE MES</option>
                {months.map((item) => (
                  <option key={`month-option-${item.index}`} value={item.index}>
                    {item.name.toUpperCase()}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <Select
                label={'Periodo'}
                name="period"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                error={formik.touched.period && Boolean(formik.errors.period)}
                helperText={formik.touched.period && formik.errors.period}
              >
                <option value="">SELECCIONE PERIODO</option>
                {periods.map((item) => (
                  <option key={`period-option-${item}`}>{item}</option>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Box mt={2} textAlign="center">
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <SubmitButton>Guardar</SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

PaymentDialog.propTypes = {}

export default PaymentDialog
