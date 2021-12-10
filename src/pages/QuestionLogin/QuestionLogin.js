import { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { RutTextField, SubmitButton } from '../../components/UI'
import { rutValidation } from '../../validations'
import AuthForm from '../../components/Auth/Form'
import questionEmployeeActions from '../../state/actions/questionEmployee'

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
  rut: Yup.string()
    .required('Ingrese run')
    .test('validRUN', 'Ingrese run válido', (v) => rutValidation(v))
})

const Login = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [error, setError] = useState('')

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      rut: ''
    },
    onSubmit: (values) => {
      dispatch(questionEmployeeActions.validateRut(values))
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar('Rut válido', {
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

  return (
    <AuthForm>
      <Typography className={classes.title} align="center">
        Consultas Web
      </Typography>
      <Box marginBottom="10px">
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RutTextField
            label="Rut"
            name="rut"
            required
            placeholder="8.828.635-9"
            value={formik.values.rut}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.rut && Boolean(formik.errors.rut)}
            helperText={formik.touched.rut && formik.errors.rut}
          />
        </Grid>
      </Grid>
      <Box className={classes.actions}>
        <SubmitButton
          disabled={!formik.isValid || formik.isSubmitting}
          loading={formik.isSubmitting}
          onClick={formik.handleSubmit}
        >
          Ingresar
        </SubmitButton>
      </Box>
    </AuthForm>
  )
}

export default Login
