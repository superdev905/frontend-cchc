import { useEffect } from 'react'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, makeStyles } from '@material-ui/core'
import useSuccess from '../../hooks/useSuccess'
import commonActions from '../../state/actions/common'
import { Heading, TextField, SubmitButton, Select } from '../UI'
import { Dialog } from '../Shared'
import { phoneValidator } from '../../validations'

const validationSchema = Yup.object({
  full_name: Yup.string().required('Ingrese nombre'),
  charge_id: Yup.string().required('Seleccione cargo'),
  charge_name: Yup.string().required('Seleccione cargo'),
  email: Yup.string().email('Ingrese correo válido').required('Ingrese correo'),
  cell_phone: Yup.string('Ingrese teléfono').test(
    'Check phone',
    'Ingrese télefono válido',
    (v) => phoneValidator(v)
  ),
  office_phone: Yup.string().test(
    'Check phone',
    'Ingrese télefono válido',
    (v) => phoneValidator(v)
  ),
  other_phone: Yup.string().test(
    'Check phone',
    'Ingrese télefono válido',
    (v) => phoneValidator(v)
  )
})
const useStyles = makeStyles(() => ({
  form: {
    width: '100%'
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  subtitle: {
    fontWeight: 'bold',
    opacity: 0.8,
    margin: `10px 0px`
  },
  actions: {
    marginTop: 15,
    textAlign: 'center',
    '& button': {
      margin: 0
    }
  }
}))

const ContactModal = ({
  open,
  onClose,
  type,
  data,
  successFunc,
  submitFunction,
  successMessage
}) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { isMobile } = useSelector((state) => state.ui)
  const { charges } = useSelector((state) => state.common)
  const dispatch = useDispatch()
  const { success, changeSuccess } = useSuccess()

  const getValidValidation = (form) => {
    if (form.cell_phone) return true
    if (form.office_phone) return true
    if (form.other_phone) return true
    return false
  }

  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      full_name: type === 'UPDATE' ? data.full_name : '',
      email: type === 'UPDATE' ? data.email : '',
      charge_id: type === 'UPDATE' ? data.charge_id : '',
      charge_name: type === 'UPDATE' ? data.charge_name : '',
      cell_phone: type === 'UPDATE' ? data.cell_phone : '',
      office_phone: type === 'UPDATE' ? data.office_phone : '',
      other_phone: type === 'UPDATE' ? data.other_phone : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction(values)
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(false)
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })
          setTimeout(() => {
            resetForm()
            onClose()
            if (successFunc) {
              successFunc()
            }
          }, 500)
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, {
            variant: 'error'
          })
          changeSuccess(false)
        })
    }
  })

  useEffect(() => {
    const { charge_id } = formik.values
    if (charge_id && charges.length > 0) {
      const currentCharge = charges.find(
        (item) => item.id === parseInt(charge_id, 10)
      )
      formik.setFieldValue('charge_name', currentCharge.name)
    } else {
      formik.setFieldValue('charge_name', '')
    }
  }, [formik.values.charge_id, charges])

  useEffect(() => {
    if (open) {
      dispatch(commonActions.getCharges())
    }
  }, [open])

  useEffect(() => {
    if (formik.isSubmitting && !formik.isValid) {
      enqueueSnackbar('Completa los campos requeridos', {
        autoHideDuration: 2000,
        variant: 'info'
      })
    }
  }, [!formik.isValid, formik.isSubmitting])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullScreen={isMobile}>
      <Box className={classes.form} p={2}>
        <Box>
          <Heading align="center">
            {`${type === 'UPDATE' ? 'Editar' : 'Nuevo'} Contacto`}
          </Heading>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nombres"
                name="full_name"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.full_name}
                helperText={formik.touched.full_name && formik.errors.full_name}
                error={
                  formik.touched.full_name && Boolean(formik.errors.full_name)
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Correo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                required
                value={formik.values.email}
                helperText={formik.touched.email && formik.errors.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
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
                required
              >
                <option value="">SELECCIONE CARGO</option>
                {charges.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Teléfono"
                name="cell_phone"
                value={formik.values.cell_phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.cell_phone && formik.errors.cell_phone
                }
                error={
                  formik.touched.cell_phone && Boolean(formik.errors.cell_phone)
                }
                inputProps={{
                  maxLength: 9
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Teléfono oficina"
                name="office_phone"
                value={formik.values.office_phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.office_phone && formik.errors.office_phone
                }
                error={
                  formik.touched.office_phone &&
                  Boolean(formik.errors.office_phone)
                }
                inputProps={{
                  maxLength: 9
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Otro Teléfono"
                name="other_phone"
                value={formik.values.other_phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.other_phone && formik.errors.other_phone
                }
                error={
                  formik.touched.other_phone &&
                  Boolean(formik.errors.other_phone)
                }
                inputProps={{
                  maxLength: 9
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.actions}>
          <SubmitButton
            onClick={formik.handleSubmit}
            success={success}
            loading={formik.isSubmitting}
            disabled={formik.isSubmitting || !getValidValidation(formik.values)}
          >
            {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} contacto`}
          </SubmitButton>
        </Box>
      </Box>
    </Dialog>
  )
}

ContactModal.defaultProps = {
  type: 'CREATE'
}

export default ContactModal
