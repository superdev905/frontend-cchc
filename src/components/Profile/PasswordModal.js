import * as Yup from 'yup'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Dialog } from '../Shared'
import { SubmitButton, Button, TextField } from '../UI'
import { useSuccess } from '../../hooks'

const useStyles = makeStyles((theme) => ({
  label: {
    color: theme.palette.common.black,
    fontSize: '15px',
    opacity: 0.8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: '15px'
  },
  avatar: {
    width: 100,
    height: 100
  }
}))

const validationSchema = Yup.object().shape({
  old_password: Yup.string().required(),
  new_password: Yup.string().required()
})

const PasswordModal = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successFunction,
  successMessage
}) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      old_password: type !== 'UPDATE' ? data.old_password : '',
      new_password: type !== 'UPDATE' ? data.new_password : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction(values)
        .then(() => {
          formik.setSubmitting(false)
          resetForm()
          enqueueSnackbar(successMessage, { variant: 'success' })
          changeSuccess(true)
          if (successFunction) {
            successFunction()
          }
          onClose()
        })
        .catch((error) => {
          formik.setSubmitting(false)
          enqueueSnackbar(error, { variant: 'error' })
        })
    }
  })

  useEffect(() => {
    if (formik.values.new_password !== formik.values.confirm_password) {
      enqueueSnackbar('Las contraseñas deben coincidir', {
        variant: 'error'
      })
    }
  }, [formik.values.new_password, formik.values.confirm_password])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Typography className={classes.title} align="center">
          Actualizar Contraseña
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                name="old_password"
                label="Contraseña Actual"
                required
                value={formik.values.old_password}
                onChange={formik.handleChange}
                error={
                  formik.touched.old_password &&
                  Boolean(formik.errors.old_password)
                }
                helperText={
                  formik.touched.old_password && formik.errors.old_password
                }
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                name="new_password"
                label="Nueva Contraseña"
                required
                value={formik.values.new_password}
                onChange={formik.handleChange}
                error={
                  formik.touched.new_password &&
                  Boolean(formik.errors.new_password)
                }
                helperText={
                  formik.touched.new_password && formik.errors.new_password
                }
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="confirm_password"
                label="Confirme Contraseña"
                required
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirm_password &&
                  Boolean(formik.errors.confirm_password)
                }
                helperText={
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
                }
              />
            </Grid>
          </Grid>
          <Box textAlign="center">
            <>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <SubmitButton
                disabled={!formik.isValid || formik.isSubmitting}
                loading={formik.isSubmitting}
                onClick={formik.handleSubmit}
                success={success}
              >
                Actualizar
              </SubmitButton>
            </>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

PasswordModal.defaultProps = {
  type: 'UPDATE'
}
export default PasswordModal
