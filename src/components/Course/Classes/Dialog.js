import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { DatePicker, Dialog } from '../../Shared'
import { Button, SubmitButton, TextArea, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Seleccione fecha'),
  title: Yup.string().required('Ingrese título de clase'),
  description: Yup.string()
})

const ClassDialog = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successFunction,
  successMessage
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const [currentDate] = useState(new Date())
  const { isMobile } = useSelector((state) => state.ui)
  const { success, changeSuccess } = useSuccess()

  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      date: type !== 'ADD' ? new Date(data.date) : currentDate,
      title: type !== 'ADD' ? data.title : '',
      description: type !== 'ADD' ? data.description : ''
    },
    onSubmit: async (values) => {
      submitFunction(values)
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            successFunction()
            enqueueSnackbar(successMessage, { variant: 'success' })
            onClose()
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })

  const renderTitle = (action) => {
    if (action === 'UPDATE') return 'Actualizar'
    if (action === 'ADD') return 'Nueva'
    return 'Ver'
  }

  useEffect(() => {
    if (open) {
      formik.resetForm()
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Box>
        <Box>
          <Typography
            align="center"
            style={{
              marginBottom: '15px',
              fontWeight: 'bold',
              fontSize: '18px'
            }}
          >
            {`${renderTitle(type)} Clase`}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <DatePicker
              value={formik.values.date}
              label="Fecha"
              onChange={(date) => {
                formik.setFieldValue('date', date)
              }}
              disabledPast
              disabledFuture={false}
            />
          </Grid>
          <Grid item xs={12} m={12}>
            <TextField
              label="Título"
              name="title"
              required
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid item xs={12} m={12}>
            <TextArea
              label="Descripción"
              name="description"
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
        <Box p={2} textAlign="center">
          <Button onClick={onClose} variant="outlined">
            Cancelar
          </Button>
          <SubmitButton
            loading={formik.isSubmitting}
            onClick={formik.handleSubmit}
            success={success}
            disabled={!formik.isValid}
          >
            {`${type === 'ADD' ? 'Guardar' : 'Actualizar'}`}
          </SubmitButton>
        </Box>
      </Box>
    </Dialog>
  )
}

ClassDialog.defaultProps = {
  type: 'ADD'
}

export default ClassDialog
