import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSuccess } from '../../hooks'
import { Select, SubmitButton, Button } from '../UI'

const validationSchema = Yup.object().shape({
  area: Yup.string().required('Seleccione Area'),
  tema: Yup.string().required('Seleccione Tema'),
  canal: Yup.string().required('Seleccione Canal'),
  respuesta: Yup.string().required('Respuesta')
})

const Answer =
  () =>
  ({
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

    const formik = useFormik({
      validateOnMount: true,
      validationSchema,
      initialValues: {
        area: type === 'UPDATE' ? data.area : '',
        tema: type === 'UPDATE' ? data.tema : '',
        canal: type === 'UPDATE' ? data.canal : '',
        respuesta: type === 'UPDATE' ? data.respuesta : ''
      },
      onSubmit: (values, { resetForm }) => {
        submitFunction({
          ...values,
          is_mandatory: values.is_mandatory === 'SI'
        })
          .then((result) => {
            formik.setSubmitting(false)
            enqueueSnackbar(successMessage, {
              variant: 'success'
            })
            changeSuccess(true, () => {
              onClose()
              resetForm()
              if (successFunction) {
                successFunction(result.id)
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
    useEffect(() => {
      if (open) {
        formik.resetForm()
      }
    }, [open])

    return (
      <Box>
        <Typography variant="h7" align="left" style={{ fontWeight: 'bold' }}>
          Respuesta
        </Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Select
                label="Area"
                name="area"
                required
                onChange={formik.handleChange}
                value={formik.values.area}
                error={formik.touched.area && Boolean(formik.errors.area)}
                helperText={formik.touched.area && formik.errors.area}
              >
                <option value="">Seleccione Area</option>
              </Select>
            </Grid>
            <Grid item xd={12} md={6}>
              <Select
                label="Tema"
                name="tema"
                required
                onChange={formik.handleChange}
                value={formik.values.tema}
                error={formik.touched.tema && Boolean(formik.errors.tema)}
                helperText={formik.touched.tema && formik.errors.tema}
              >
                <option value="">Seleccione Tema</option>
              </Select>
            </Grid>
            <Grid item xd={12} md={6}>
              <Select
                label="Canal"
                name="canal"
                required
                onChange={formik.handleChange}
                value={formik.values.canal}
                error={formik.touched.canal && Boolean(formik.errors.canal)}
                helperText={formik.touched.canal && formik.errors.canal}
              >
                <option value="">Seleccione Canal</option>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextArea
                label="Respuesta"
                name="respuesta"
                required
                onChange={formik.handleChange}
                value={formik.values.respuesta}
                error={
                  formik.touched.respuesta && Boolean(formik.errors.respuesta)
                }
                helperText={formik.touched.respuesta && formik.errors.respuesta}
                maxLength={800}
              />
            </Grid>
          </Grid>
          <Box>
            <Button onClick={onClose} variant="outlined">
              Cancelar
            </Button>
            <SubmitButton onClick={formik.handleSubmit} success={success}>
              Aceptar
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    )
  }

Answer.defaultProps = {
  type: 'Create'
}

export default Answer
