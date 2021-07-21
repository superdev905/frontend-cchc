import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog } from '../../Shared'
import { Button, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'

const validationSchema = Yup.object({
  name: Yup.string().required('Ingrese nombre de cargo')
})

const ChargeModal = ({
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
      name: type === 'UPDATE' ? data.name : ''
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
          Nuevo cargo
        </Typography>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Nombre de cargo"
              name="name"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.name}
              helperText={formik.touched.name && formik.errors.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
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
            Crear cargo
          </SubmitButton>
        </Box>
      </Box>
    </Dialog>
  )
}

ChargeModal.propTypes = {
  type: 'CREATE'
}

export default ChargeModal
