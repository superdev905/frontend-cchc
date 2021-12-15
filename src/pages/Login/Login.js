import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { Redirect } from 'react-router-dom'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import authActions from '../../state/actions/auth'
import { SubmitButton, TextField } from '../../components/UI'
import AuthForm from '../../components/Auth/Form'

const useStyles = makeStyles(() => ({
  title: {
    fontSize: '20px',
    marginBottom: '20px',
    fontWeight: 'bold'
  },
  actions: {
    marginTop: '10px',
    textAlign: 'center'
  }
}))

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Ingrese un correo válido')
    .trim()
    .required('Ingrese correo'),
  password: Yup.string().required('Ingrese contraseña')
})

const Login = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { enqueueSnackbar } = useSnackbar()
  const [error, setError] = useState('')

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      dispatch(authActions.loginUser(values))
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar('Inicio de sesión exitoso', {
            variant: 'success',
            anchorOrigin: { vertical: 'bottom', horizontal: 'center' }
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          setError(err)
          enqueueSnackbar(err, {
            variant: 'error',
            anchorOrigin: { vertical: 'bottom', horizontal: 'center' }
          })
        })
    }
  })

  const handlePasswordKeyDown = (e) => {
    const { key } = e
    if (key === 'Enter' && formik.isValid) {
      formik.submitForm()
    }
  }

  const handleEmailChange = (e) => {
    const { value } = e.target
    formik.setFieldValue('email', value.trim())
  }

  return isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <AuthForm>
      <Typography className={classes.title} align="center">
        Iniciar sesión
      </Typography>
      <Box marginBottom="10px">
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Correo"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={handleEmailChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            label="Contraseña"
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            onKeyDown={handlePasswordKeyDown}
          />
        </Grid>
      </Grid>
      <Box my={1} textAlign="center">
        <a href="/consultas-web" target="_blank">
          Ver consultas web
        </a>
      </Box>
      <Box className={classes.actions}>
        <SubmitButton
          disabled={!formik.isValid || formik.isSubmitting}
          loading={formik.isSubmitting}
          onClick={formik.handleSubmit}
        >
          Iniciar sesión
        </SubmitButton>
      </Box>
    </AuthForm>
  )
}

export default Login
