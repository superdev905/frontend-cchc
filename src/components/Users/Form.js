import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import {
  Avatar,
  Box,
  Grid,
  makeStyles,
  Typography,
  InputAdornment,
  IconButton
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { Dialog } from '../Shared'
import { SubmitButton, Button, TextField, Select } from '../UI'
import { useSuccess } from '../../hooks'
import generatePassword from '../../utils/generatePassword'
import commonActions from '../../state/actions/common'
import CustomTextField from '../UI/CustomTextField'
import usersActions from '../../state/actions/users'

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
  },
  customMessage: {
    fontSize: '0.8rem',
    color: 'red'
  },
  passwordTextField: {
    textTransform: 'inherit',
    '& input': { textTransform: 'inherit' }
  }
}))

const createValidation = Yup.object().shape({
  password: Yup.string()
    .min(8, 'La contraseña debe tener 8 caracteres como mínimo')
    .required('Ingrese contraseña')
})

const validationSchema = Yup.object().shape({
  names: Yup.string().required('Ingrese nombre del usuario'),
  maternal_surname: Yup.string().required('Ingrese materno'),
  paternal_surname: Yup.string().required('Ingrese paterno'),
  email: Yup.string().email('Ingrese correo válido').required('Ingrese correo'),
  charge_id: Yup.string('Seleccione cargo').nullable(),
  role_id: Yup.number('Seleccione rol').required('Seleccione rol'),
  charge_name: Yup.string(),
  is_administrator: Yup.bool(),
  businesses: Yup.array()
})

const validationSchemaUpdate = Yup.object().shape({
  password: Yup.string().min(
    8,
    'La contraseña debe tener 8 caracteres como mínimo'
  ),
  confirm_password: Yup.string('Confirme contraseña nueva')
    .min(8, 'Debe ser mayor a 8 caracteres')
    .oneOf([Yup.ref('password')], 'Las contraseñas deben ser iguales')
})

const Form = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successFunction,
  successMessage
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [readOnly] = useState(type === 'VIEW')
  const [randomPassword] = useState(generatePassword())
  const [visible, setVisible] = useState(false)
  const [confirmVisible, setConfirmVisible] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { charges, roles } = useSelector((state) => state.common)
  const { jefaturas } = useSelector((state) => state.users)

  const getTitle = (actionType) => {
    if (actionType === 'VIEW') return 'Ver usuario'
    if (actionType === 'UPDATE') return 'Editar usuario'
    return 'Nuevo usuario'
  }

  const formik = useFormik({
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema:
      type === 'ADD'
        ? validationSchema.concat(createValidation)
        : validationSchema.concat(validationSchemaUpdate),
    initialValues: {
      names: type !== 'ADD' ? data.names : '',
      maternal_surname: type !== 'ADD' ? data.maternal_surname : '',
      paternal_surname: type !== 'ADD' ? data.paternal_surname : '',
      email: type !== 'ADD' ? data.email : '',
      charge_id: type !== 'ADD' ? data.charge_id : '',
      role_id: type !== 'ADD' ? data.role_id : '',
      jefatura_id: type !== 'ADD' ? data.jefatura_id : '',
      password: randomPassword,
      is_administrator: type !== 'ADD' ? data.is_administrator : false
    },
    onSubmit: (values, { resetForm }) => {
      const body = { ...values }
      if (!body.jefatura_id) {
        delete body.jefatura_id
      }
      submitFunction(body)
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

  const validateEmail = (value) => value.length - (value.indexOf('.') + 1)

  useEffect(() => {
    if (formik.values) {
      formik.setFieldTouched('email')
      formik.setFieldTouched('role_id')
      formik.setFieldTouched('paternal_surname')
      formik.setFieldTouched('maternal_surname')
    }
  }, [formik.values])

  useEffect(() => {
    if (formik.values.charge_id && charges.length > 0) {
      const currentCharge = charges.find(
        (item) => item.id === parseInt(formik.values.charge_id, 10)
      )
      formik.setFieldValue('charge_name', currentCharge.name)
    } else {
      formik.setFieldValue('charge_name', '')
    }
  }, [formik.values.charge_id, charges])

  useEffect(() => {
    if (open) {
      formik.resetForm()
      dispatch(commonActions.getCharges())
      dispatch(commonActions.getRoles())
      dispatch(usersActions.getJefaturas())
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Typography className={classes.title} align="center">
          {getTitle(type)}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" marginBottom="10px">
                <Avatar className={classes.avatar}>
                  {formik.values.names ? formik.values.names.charAt(0) : ''}
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="names"
                label="Nombres"
                required
                value={formik.values.names}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.names && Boolean(formik.errors.names)}
                helperText={formik.touched.names && formik.errors.names}
                inputProps={{ readOnly }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="paternal_surname"
                label="Apellidos paterno"
                required
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
                inputProps={{ readOnly }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="maternal_surname"
                label="Apellido materno"
                required
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
                inputProps={{ readOnly }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                label="Correo"
                required
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                inputProps={{ readOnly }}
              />
              {formik.values.email && validateEmail(formik.values.email) < 2 ? (
                <Typography className={classes.customMessage}>
                  El Correo Electrónico está Incompleto
                </Typography>
              ) : null}
            </Grid>
            {type === 'ADD' && (
              <Grid item xs={12} md={6}>
                <CustomTextField
                  name="password"
                  label="Contraseña"
                  required
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <Select
                label="Rol"
                name="role_id"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role_id}
                helperText={formik.touched.role_id && formik.errors.role_id}
                error={formik.touched.role_id && Boolean(formik.errors.role_id)}
                inputProps={{ readOnly }}
              >
                <option value="">SIN ROL</option>
                {roles.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Jefatura"
                name="jefatura_id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.jefatura_id}
                helperText={
                  formik.touched.jefatura_id && formik.errors.jefatura_id
                }
                error={
                  formik.touched.jefatura_id &&
                  Boolean(formik.errors.jefatura_id)
                }
                inputProps={{ readOnly }}
              >
                <option value="">SIN JEFATURA</option>
                {jefaturas.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <Select
                label="Cargo"
                name="charge_id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.charge_id}
                helperText={formik.touched.charge_id && formik.errors.charge_id}
                error={
                  formik.touched.charge_id && Boolean(formik.errors.charge_id)
                }
                inputProps={{ readOnly }}
              >
                <option value="">SIN CARGO</option>
                {charges.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Select>
            </Grid>

            {type === 'UPDATE' && (
              <>
                <Grid item xs={12} md={12}>
                  <Typography>Actualizar contraseña</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    type={visible ? 'text' : 'password'}
                    name="password"
                    label="Nueva Contraseña"
                    className={classes.passwordTextField}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setVisible(!visible)}
                          >
                            {visible ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <CustomTextField
                    type={confirmVisible ? 'text' : 'password'}
                    name="confirm_password"
                    label="Confirmar Contraseña"
                    value={formik.values.confirm_password}
                    className={classes.passwordTextField}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.confirm_password &&
                      Boolean(formik.errors.confirm_password)
                    }
                    helperText={
                      formik.touched.confirm_password &&
                      formik.errors.confirm_password
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setConfirmVisible(!confirmVisible)}
                          >
                            {confirmVisible ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </>
            )}
          </Grid>
          <Box textAlign="center">
            {type === 'VIEW' ? (
              <Button onClick={onClose}>Aceptar</Button>
            ) : (
              <>
                <Button onClick={onClose} variant="outlined">
                  Cancelar
                </Button>
                <SubmitButton
                  disabled={
                    !formik.isValid ||
                    formik.isSubmitting ||
                    validateEmail(formik.values.email) < 2
                  }
                  loading={formik.isSubmitting}
                  onClick={formik.handleSubmit}
                  success={success}
                >{`${
                  type === 'ADD' ? 'Crear' : 'Actualizar'
                } usuario`}</SubmitButton>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

Form.defaultProps = {
  type: 'ADD'
}
export default Form
