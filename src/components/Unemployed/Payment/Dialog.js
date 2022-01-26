import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { Autocomplete } from '@material-ui/lab'
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  FormHelperText
} from '@material-ui/core'
import unemployedActions from '../../../state/actions/unemployed'
import { months } from '../../../config'
import { Dialog } from '../../Shared'
import { Button, Select, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'

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

const PaymentDialog = ({
  open,
  onClose,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { isMobile } = useSelector((state) => state.ui)
  const [currentDate] = useState(new Date())
  const [benefits, setBenefits] = useState([])
  const [selectedBenefit, setSelectedBenefit] = useState(null)
  const { success, changeSuccess } = useSuccess()

  const formik = useFormik({
    validationSchema,
    validateOnChange: true,
    validateOnMount: true,
    initialValues: {
      period: currentDate.getFullYear(),
      month: '',
      benefitId: ''
    },
    onSubmit: (values) => {
      submitFunction(values)
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            enqueueSnackbar(successMessage, { variant: 'success' })
            onClose()
            if (successFunction) {
              successFunction()
            }
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })

  const getBenefitsList = () => {
    dispatch(unemployedActions.getUnemployedBenefits()).then((res) => {
      setBenefits(res)
    })
  }

  useEffect(() => {
    if (open) {
      getBenefitsList()
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
                  setTimeout(() => {
                    formik.setFieldTouched('benefitId')
                  }, 500)
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
                  <option
                    key={`month-option-${item.index}`}
                    value={item.index}
                    disabled={item.index > currentDate.getMonth() + 1}
                  >
                    {item.name.toUpperCase()}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Período"
                value={currentDate.getFullYear()}
                inputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
          <Box mt={2} textAlign="center">
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              loading={formik.isSubmitting}
              disabled={!formik.isValid}
              success={success}
            >
              Guardar
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

PaymentDialog.defaultProps = {
  successMessage: 'Pago registrado!'
}

export default PaymentDialog
