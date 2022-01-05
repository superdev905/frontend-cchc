import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useSuccess } from '../../../hooks'
import { Dialog } from '../../Shared'
import { Button, SubmitButton, TextArea, TextField } from '../../UI'

const validationSchema = Yup.object().shape({
  comments: Yup.string()
    .min(10, 'Ingrese un comentario de 10 caracteres')
    .required('Ingrese comentarios'),
  analystId: Yup.number().required('Analista de casos requeridos')
})

const RejectDialog = ({ open, onClose, submitFunction }) => {
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)
  const { user } = useSelector((state) => state.auth)

  const formik = useFormik({
    validationSchema,
    validateOnBlur: true,
    validateOnMount: true,
    validateOnChange: true,
    initialValues: {
      comments: '',
      analystId: user?.id
    },
    onSubmit: (values) => {
      submitFunction(values)
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            enqueueSnackbar('Caso de inclusión rechazada', {
              variant: 'success'
            })
            onClose()
          })
        })
        .catch((err) => {
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          Rechazar caso de Inclusión
        </Typography>
        <Box mt={2}>
          <Alert severity="error">Estas apunto de rechazar este caso</Alert>
          <Box my={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label={'Analista de casos'}
                  inputProps={{ readOnly: true }}
                  value={`${user.names} ${user.paternal_surname} ${user.maternal_surname}`}
                />
              </Grid>
              <Grid item xs={12}>
                <TextArea
                  required
                  label={'Comentarios'}
                  name="comments"
                  maxLength={800}
                  value={formik.values.comments}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.comments && Boolean(formik.errors.comments)
                  }
                  helperText={formik.touched.comments && formik.errors.comments}
                />
              </Grid>
            </Grid>
            <Box textAlign={'center'}>
              <Button variant={'outlined'}>Cancelar</Button>
              <SubmitButton
                success={success}
                disabled={!formik.isValid}
                loading={formik.isSubmitting}
                onClick={formik.handleSubmit}
              >
                Aprobar caso
              </SubmitButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default RejectDialog
