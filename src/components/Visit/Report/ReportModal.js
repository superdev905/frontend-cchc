import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog } from '../../Shared'
import { SubmitButton, TextArea, Button } from '../../UI'
import { useSuccess } from '../../../hooks'

const validationSchema = Yup.object().shape({
  observations: Yup.string().required('Ingrese observacion'),
  relevant: Yup.string().required('Ingrese observacion')
})

const ReportModal = ({ open, onClose, submitFunction, successFunction }) => {
  const { success, changeSuccess } = useSuccess()
  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      observations: '',
      relevant: ''
    },
    onSubmit: (values) => {
      submitFunction(values).then(() => {
        formik.setSubmitting(false)
        changeSuccess(true, () => {
          onClose()
          if (successFunction) {
            successFunction()
          }
        })
      })
    }
  })

  return (
    <Dialog open={open} onClose={onClose}>
      <Typography align="center" style={{ marginBottom: '15px' }} variant="h6">
        Generar reporte
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextArea
            label="Casos relevantes"
            required
            name="relevant"
            value={formik.values.relevant}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.relevant && Boolean(formik.errors.relevant)}
            helperText={formik.touched.relevant && formik.errors.relevant}
          />
        </Grid>
        <Grid item xs={12}>
          <TextArea
            label="Observaciones"
            required
            name="observations"
            value={formik.values.observations}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.observations && Boolean(formik.errors.observations)
            }
            helperText={
              formik.touched.observations && formik.errors.observations
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
          Crear reporte
        </SubmitButton>
      </Box>
    </Dialog>
  )
}
export default ReportModal
