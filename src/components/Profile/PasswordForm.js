import { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useSuccess } from '../../hooks'
import { SubmitButton, TextField } from '../UI'
import userActions from '../../state/actions/users'

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: 'bold'
  },
  alert: {
    marginBottom: 15
  }
}))

const passwordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string('Ingrese contraseña antigua').required(
    'Campo requerido'
  ),
  newPassword: Yup.string('Ingrese contraseña nueva')
    .min(8, 'Debe ser mayor a 8 caracteres')
    .required('Campo requerido'),
  confirmPassword: Yup.string('Confirme contraseña nueva')
    .min(8, 'Debe ser mayor a 8 caracteres')
    .oneOf([Yup.ref('newPassword')], 'Las contraseñas deben ser iguales')
    .required('Campo requerido')
})

const PasswordForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [errorPassUpdate, setErrorPassUpdate] = useState('')
  const { user } = useSelector((state) => state.auth)
  const { success, changeSuccess } = useSuccess()

  const formik = useFormik({
    validationSchema: passwordValidationSchema,
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    onSubmit: (values) => {
      dispatch(
        userActions.updatePassword(user.id, {
          old_password: values.oldPassword,
          new_password: values.newPassword,
          confirm_password: values.confirmPassword
        })
      )
        .then(() => {
          formik.setSubmitting(false)
          setErrorPassUpdate('')
          changeSuccess(true, () => {
            enqueueSnackbar('Contraseña actualizada', {
              autoHideDuration: 1000,
              variant: 'success'
            })
          })
        })
        .catch((err) => {
          changeSuccess(false)
          formik.setSubmitting(false)
          setErrorPassUpdate(err)
          enqueueSnackbar('Error al actualizar contraseña', {
            autoHideDuration: 1000,
            variant: 'error'
          })
        })
    }
  })

  return (
    <Box>
      <Typography className={classes.title}>Cambiar contraseña</Typography>
      {errorPassUpdate && (
        <Alert severity="error" className={classes.alert}>
          {errorPassUpdate}
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            gray
            type="password"
            label="Contraseña antigua"
            name="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
            }
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            gray
            type="password"
            label="Nueva contraseña"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            gray
            type="password"
            label="Confirmar nueva contraseña"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </Grid>
        <Grid item xs={12} justify="flex-end">
          <SubmitButton
            onClick={formik.handleSubmit}
            loading={formik.isSubmitting}
            disabled={!formik.isValid || formik.isSubmitting}
            success={success}
          >
            Cambiar contraseña
          </SubmitButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PasswordForm
