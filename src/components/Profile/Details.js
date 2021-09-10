import { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useSuccess } from '../../hooks'
import { SubmitButton, TextField, Wrapper } from '../UI'
import userActions from '../../state/actions/users'
import authActions from '../../state/actions/auth'
import PasswordForm from './PasswordForm'

const useStyles = makeStyles((theme) => ({
  fromWrapper: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: 800,
      margin: '0 auto'
    }
  },
  title: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: 'bold'
  },
  avatar: {
    height: 120,
    width: 120,
    fontSize: 40
  },
  alert: {
    marginBottom: 15
  }
}))

const validationSchema = Yup.object().shape({
  names: Yup.string().required('Ingrese nombre del usuario'),
  maternal_surname: Yup.string().required('Ingrese materno'),
  paternal_surname: Yup.string().required('Ingrese paterno'),
  email: Yup.string().email('Ingrese correo válido').required('Ingrese email')
})

const ProfileDetails = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { success, changeSuccess } = useSuccess()
  const { enqueueSnackbar } = useSnackbar()
  const [error, setError] = useState('')
  const { user } = useSelector((state) => state.auth)

  const formik = useFormik({
    validationSchema,
    initialValues: {
      names: user?.names,
      maternal_surname: user?.maternal_surname || '',
      paternal_surname: user?.paternal_surname || '',
      email: user?.email || ''
    },
    onSubmit: (values) => {
      dispatch(userActions.updateUser(user.id, { ...user, ...values }))
        .then(() => {
          formik.setSubmitting(false)
          setError('')
          changeSuccess(true, () => {
            enqueueSnackbar('Datos actualizados', {
              variant: 'success'
            })
            dispatch(authActions.getLoggedUser())
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          setError(err)
          enqueueSnackbar(err, {
            variant: 'error'
          })
        })
    }
  })

  return (
    <Wrapper>
      <Box p={1} className={classes.fromWrapper}>
        <Box display="flex" justifyContent="center" marginBottom="40px">
          <Avatar className={classes.avatar}>
            {user &&
              `${user.names.charAt(0)}${user.paternal_surname.charAt(0)}`}
          </Avatar>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <Box>
              <Typography className={classes.title}>
                Información personal
              </Typography>
              {error && (
                <Alert severity="error" className={classes.alert}>
                  {error}
                </Alert>
              )}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Nombres"
                    required
                    gray
                    name="names"
                    value={formik.values.names}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.names && Boolean(formik.errors.names)}
                    helperText={formik.names && formik.errors.names}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Apellido Paterno"
                    required
                    gray
                    name="paternal_surname"
                    value={formik.values.paternal_surname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.paternal_surname &&
                      Boolean(formik.errors.paternal_surname)
                    }
                    helperText={
                      formik.touched.paternal_surname &&
                      formik.errors.paternal_surname
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Apellido Materno"
                    required
                    gray
                    name="maternal_surname"
                    value={formik.values.maternal_surname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.maternal_surname &&
                      Boolean(formik.errors.maternal_surname)
                    }
                    helperText={
                      formik.touched.maternal_surname &&
                      formik.errors.maternal_surname
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Correo"
                    required
                    gray
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <SubmitButton
                      onClick={formik.handleSubmit}
                      success={success}
                      loading={formik.isSubmitting}
                      disabled={!formik.isValid || formik.isSubmitting}
                    >
                      Actualizar datos
                    </SubmitButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <PasswordForm />
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  )
}

export default ProfileDetails
