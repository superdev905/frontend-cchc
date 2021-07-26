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

const validationSchema = Yup.object({
  full_name: Yup.string().required('Ingrese nombre'),
  charge_id: Yup.string().required('Seleccione cargo'),
  email: Yup.string().email('Ingrese correo válid').required('Ingrese correo'),
  cell_phone: Yup.string('Ingrese teléfono'),
  office_phone: Yup.string(),
  other_phone: Yup.string()
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

  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      full_name: type === 'UPDATE' ? data.full_name : '',
      email: type === 'UPDATE' ? data.email : '',
      charge_id: type === 'UPDATE' ? data.charge_id : '',
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
            autoHideDuration: 1500,
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
            autoHideDuration: 1500,
            variant: 'error'
          })
          changeSuccess(false)
        })
    }
  })

  useEffect(() => {
    if (open) {
      dispatch(commonActions.getCharges())
    }
  }, [open])

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
                label="Nombre"
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
                <option value="">Seleccione cargo</option>
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
              />
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.actions}>
          <SubmitButton
            onClick={formik.handleSubmit}
            success={success}
            loading={formik.isSubmitting}
            disabled={!formik.isValid}
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
