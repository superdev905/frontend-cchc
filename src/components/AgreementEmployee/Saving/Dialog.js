import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { CurrencyTextField, Dialog } from '../../Shared'
import { Button, Select, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'

const validationSchema = Yup.object().shape({
  entity: Yup.string().required('Seleecione entidad'),
  accountNumber: Yup.string().required('Ingrese número de cuenta'),
  amount: Yup.number().required('Ingrese monto')
})

const SavingDialog = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successFunction
}) => {
  const { success, changeSuccess } = useSuccess()
  const { enqueueSnackbar } = useSnackbar()
  const { employee } = useSelector((state) => state.employees)
  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    initialValues: {
      entity: type === 'UPDATE' ? data.entity : '',
      accountNumber:
        type === 'UPDATE' ? data.accountNumber : employee?.account_number || '',
      amount: type === 'UPDATE' ? data.amount : ''
    },
    onSubmit: (values) => {
      submitFunction(values)
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            onClose()
            enqueueSnackbar(
              `Datos de ahorro ${
                type === 'UPDATE' ? 'actualizados' : 'creado'
              }`,
              { variant: 'success' }
            )
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
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Box>
        <Typography
          variant="h6"
          style={{ fontWeight: 'bold', marginBottom: 15 }}
          align="center"
        >{`${
          type === 'UPDATE' ? 'Actualizar ' : 'Agregar '
        }datos de ahorro`}</Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Select
                label="Entidad"
                required
                name="entity"
                value={formik.values.entity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.entity && Boolean(formik.errors.entity)}
                helperText={formik.touched.entity && formik.errors.entity}
              >
                <option value="">Selecciona una entidad</option>
                {['BANCOS', 'COOPERATIVAS', 'CAJAS DE COMPENSACION'].map(
                  (item) => (
                    <option key={`option-${item}`} value={item}>
                      {item}
                    </option>
                  )
                )}
              </Select>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                label="N° de cuenta"
                required
                name="accountNumber"
                value={formik.values.accountNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.accountNumber &&
                  Boolean(formik.errors.accountNumber)
                }
                helperText={
                  formik.touched.accountNumber && formik.errors.accountNumber
                }
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <CurrencyTextField
                label="Ahorro"
                required
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Button variant="outlined" onClick={onClose}>
              Cerrar
            </Button>
            <SubmitButton
              disabled={!formik.isValid}
              loading={formik.isSubmitting}
              success={success}
              onClick={formik.handleSubmit}
            >
              {type === 'UPDATED' ? 'Actualizar' : 'Guardar'}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

SavingDialog.defaultProps = {
  entity: 'CREATE'
}

export default SavingDialog
