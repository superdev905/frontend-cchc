import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog } from '../../../Shared'
import { Button, SubmitButton, TextField } from '../../../UI'
import { useSuccess } from '../../../../hooks'

const validationSchema = Yup.object({
  attention_type_id: Yup.number().required('Seleccione tipo de Atención'),
  amount: Yup.number().required('Ingrese cantidad'),
})

const AssistanceType = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successFunction
}) => {
  const { isMobile } = useSelector((state) => state.ui)
  const { success, changeSuccess } = useSuccess()
  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      attention_type_id: type === 'UPDATE' ? data.attention_type_id : '',
      amount: type === 'UPDATE' ? data.amount : '',
    },
    onSubmit: (values) => {
      submitFunction(values)
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(false)
          if (successFunction) {
            successFunction()
          }
          onClose()
        })
        .catch(() => {
          changeSuccess(false)
          formik.setSubmitting(false)
        })
    }
  })
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
    >
      <Box>
        <Typography
          align="center"
          variant="h6"
          style={{ marginBottom: '15px' }}
        >
          Tipo de Atención
        </Typography>
        <Grid container>
          <Grid item xs={12} md={6} lg={4}>
            <Select
              label="Tipo de Atención"
              name="attention_type_id"
              required
              value={formik.values.attention_type_id}
              onChange={formik.handleChange}
              error={
                formik.touched.attention_type_id &&
                Boolean(formik.errors.attention_type_id)
              }
              helperText={
                formik.touched.attention_type_id && formik.errors.attention_type_id
              }
            >
              <option value="">Seleccione tipo de Atención</option>
              {types.map((item, i) => (
                <option key={`type-${i}-${item.id}`} value={item.id}>
                  {item.description}
                </option>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <TextField
              label="Cantidad"
              name="amount"
              required
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.amount &&
                Boolean(formik.errors.amount)
              }
              helperText={
                formik.touched.amount &&
                formik.errors.amount
              }
            />
          </Grid>
        </Grid>
        <Box textAlign="center" marginTop="15px">
          <Button onClick={onClose} variant="outlined">
            Cancelar
          </Button>
          <SubmitButton
            onClick={formik.handleSubmit}
            loading={formik.isSubmitting}
            disabled={!formik.isValid || formik.isSubmitting}
            success={success}
          >
            Aceptar
          </SubmitButton>
        </Box>
      </Box>
    </Dialog>
  )
}

AssistanceType.propTypes = {
  type: 'CREATE'
}

export default AssistanceType