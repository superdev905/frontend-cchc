import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import {
  Avatar,
  Box,
  Grid,
  InputLabel,
  makeStyles,
  Switch,
  Typography
} from '@material-ui/core'
import { Dialog } from '../Shared'
import { SubmitButton, Button, TextField, Select } from '../UI'
import { useSuccess } from '../../hooks'
import generatePassword from '../../utils/generatePassword'
import commonActions from '../../state/actions/common'

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
  names: Yup.string().required('Ingrese nombre del usuario'),
  maternal_surname: Yup.string().required('Ingrese materno'),
  paternal_surname: Yup.string().required('Ingrese paterno'),
  email: Yup.string().email('Ingrese correo válido').required('Ingrese email'),
  charge_id: Yup.string().required('Seleccione cargo'),
  is_administrator: Yup.bool()
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
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { charges } = useSelector((state) => state.common)

  const getTitle = (actionType) => {
    if (actionType === 'VIEW') return 'Ver usuario'
    if (actionType === 'UPDATE') return 'Editar usuario'
    return 'Nuevo usuario'
  }

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      names: type !== 'ADD' ? data.names : '',
      maternal_surname: type !== 'ADD' ? data.maternal_surname : '',
      paternal_surname: type !== 'ADD' ? data.paternal_surname : '',
      email: type !== 'ADD' ? data.email : '',
      charge_id: type !== 'ADD' ? data.charge_id : '',
      password: randomPassword,
      is_administrator: type !== 'ADD' ? data.is_administrator : false
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
    if (open) {
      dispatch(commonActions.getCharges())
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
                error={formik.touched.names && Boolean(formik.errors.names)}
                helperText={formik.touched.names && formik.errors.names}
                inputProps={{ readOnly }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="paternal_surname"
                label="Apellidos paternos"
                required
                value={formik.values.paternal_surname}
                onChange={formik.handleChange}
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
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                inputProps={{ readOnly }}
              />
            </Grid>
            {type === 'ADD' && (
              <Grid item xs={12} md={6}>
                <TextField
                  name="password"
                  label="Contraseña"
                  required
                  value={formik.values.password}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
            )}

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
              >
                <option value="">Seleccione cargo</option>
                {charges.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <InputLabel className={classes.label}>
                Usuario administrador
              </InputLabel>
              <Switch
                checked={formik.values.is_administrator}
                color="primary"
                onChange={(e) => {
                  formik.setFieldValue('is_administrator', e.target.checked)
                }}
                name="checked-administrator"
                disabled={readOnly}
              />
            </Grid>
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
                  disabled={!formik.isValid || formik.isSubmitting}
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
