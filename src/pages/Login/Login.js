import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { Redirect } from 'react-router-dom'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import Logo from '../../assets/media/logo_cchc.svg'
import authActions from '../../state/actions/auth'
import { SubmitButton, TextField } from '../../components/UI'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'transparent'
    }
  },
  logo: {
    maxWidth: '250px'
  },
  title: {
    fontSize: '20px',
    marginBottom: '20px',
    fontWeight: 'bold'
  },
  loginForm: {
    borderRadius: 10,
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.up('sm')]: {
      maxWidth: '70%'
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '450px'
    }
  },
  actions: {
    marginTop: '10px',
    textAlign: 'center'
  }
}))

const validationSchema = Yup.object().shape({
  email: Yup.string().trim().required('Ingrese correo'),
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

  if (formik.values.email.indexOf(' ') === -1) {
    console.log(`${formik.values.email} valido`)
  } else {
    enqueueSnackbar('El email no debe contener espacios', {
      variant: 'info',
      autoHideDuration: 2000,
      preventDuplicate: true
    })
  }

  return isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Box className={classes.root}>
      <Box p={3} className={classes.loginForm}>
        <Box p={4} textAlign="center">
          <img
            className={classes.logo}
            src={Logo}
            alt="Fundacion CCHC's logo"
          />
        </Box>
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
              onChange={formik.handleChange}
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
        <Box className={classes.actions}>
          <SubmitButton
            disabled={!formik.isValid || formik.isSubmitting}
            loading={formik.isSubmitting}
            onClick={formik.handleSubmit}
          >
            Iniciar sesión
          </SubmitButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
