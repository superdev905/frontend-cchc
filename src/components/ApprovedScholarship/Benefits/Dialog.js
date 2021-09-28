import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { formatDate } from '../../../formatters'
import { CurrencyTextField, Dialog } from '../../Shared'
import { Button, SubmitButton, TextArea, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Seleccione fecha'),
  amount: Yup.number('Ingrese monto válido').min(1).required('Ingrese monto'),
  name: Yup.string().required('Ingrese nombre de beneficio'),
  description: Yup.string().required('Ingrese nombre de descripción')
})

const BenefitDialog = ({
  open,
  onClose,
  data,
  type,
  submitFunction,
  successFunction,
  successMessage
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const { isMobile } = useSelector((state) => state.ui)
  const [currentDate] = useState(new Date())
  const { success, changeSuccess } = useSuccess()

  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    initialValues: {
      date: currentDate,
      amount: type === 'UPDATE' ? data.amount : '',
      name: type === 'UPDATE' ? data.name : '',
      description: type === 'UPDATE' ? data.description : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({ ...values, date: new Date() })
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, { variant: 'success' })
          changeSuccess(true, () => {
            if (successFunction) {
              successFunction()
              resetForm()
            }
            onClose()
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })

  const handleClose = () => {
    formik.resetForm()
    onClose()
  }

  useEffect(() => {
    if (open) {
      formik.resetForm()
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Box p={2}>
        <Typography
          align="center"
          style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}
        >
          {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} beneficio`}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Fecha"
              value={`${formatDate(currentDate)}`}
              inputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CurrencyTextField
              label="Monto"
              name="amount"
              required
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
            />
          </Grid>
          <Grid item xs={12}>
            <TextArea
              rowsMin={1}
              name="name"
              label="Nombre del beneficio"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextArea
              rowsMin={2}
              name="description"
              label="Descripción del beneficio"
              required
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>
        </Grid>
        <Box textAlign="center">
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <SubmitButton
            loading={formik.isSubmitting}
            onClick={formik.handleSubmit}
            disabled={!formik.isValid}
            success={success}
          >{`${
            type === 'UPDATE' ? 'Actualizar' : 'Crear'
          } beneficio`}</SubmitButton>
        </Box>
      </Box>
    </Dialog>
  )
}

BenefitDialog.defaultProps = {
  type: 'ADD'
}

export default BenefitDialog
