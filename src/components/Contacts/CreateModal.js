import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, makeStyles } from '@material-ui/core'
import useSuccess from '../../hooks/useSuccess'
import contactActions from '../../state/actions/contact'
import { Heading, TextField, SubmitButton, Select } from '../UI'
import { Dialog } from '../Shared'

const validationSchema = Yup.object({
  name: Yup.string().required('Ingrese nombre'),
  charge: Yup.string().required('Seleccione cargo'),
  email: Yup.string().email('Ingrese correo válid').required('Ingrese correo'),
  phone: Yup.string().required('Ingrese teléfono'),
  phoneOffice: Yup.string().required('Ingrese teléfono'),
  phoneOther: Yup.string().required('Ingrese teléfono')
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

const exampleCharges = [
  {
    id: 1,
    name: 'Gerente'
  },
  {
    id: 2,
    name: 'Administrador'
  },
  {
    id: 3,
    name: 'Ayudante'
  },
  {
    id: 4,
    name: 'Sub gerente'
  }
]

const notify = (message) => toast.error(message)

const ContactModal = ({ open, onClose, type, contact, ...props }) => {
  const classes = useStyles()
  const { idCompany } = props.match.params
  const { isMobile } = useSelector((state) => state.ui)
  const dispatch = useDispatch()
  const { success, changeSuccess } = useSuccess()

  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      name: type === 'UPDATE' ? contact.full_name : '',
      email: type === 'UPDATE' ? contact.email : '',
      charge: type === 'UPDATE' ? contact.charge : '',
      phone: type === 'UPDATE' ? contact.cell_phone : '',
      phoneOffice: type === 'UPDATE' ? contact.office_phone : '',
      phoneOther: type === 'UPDATE' ? contact.other_phone : ''
    },
    onSubmit: (values, { resetForm }) => {
      const data = {
        full_name: values.name,
        email: values.email,
        charge: values.charge,
        cell_phone: values.phone,
        office_phone: values.phoneOffice,
        other_phone: values.phoneOther,
        business_id: parseInt(idCompany, 10)
      }
      if (type === 'CREATE') {
        dispatch(contactActions.createContact(data))
          .then(() => {
            formik.setSubmitting(false)
            changeSuccess(false)
            setTimeout(() => {
              resetForm()
              onClose()
            }, 500)
          })
          .catch((err) => {
            formik.setSubmitting(false)
            notify(err)
            changeSuccess(false)
          })
      } else {
        dispatch(contactActions.updateContact(contact.id, data))
          .then(() => {
            formik.setSubmitting(false)
            changeSuccess(false)
            setTimeout(() => {
              resetForm()
              onClose()
            }, 500)
          })
          .catch((err) => {
            formik.setSubmitting(false)
            notify(err)
            changeSuccess(false)
          })
      }
    }
  })

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
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                helperText={formik.touched.name && formik.errors.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Correo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                value={formik.values.email}
                helperText={formik.touched.email && formik.errors.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Cargo"
                name="charge"
                onChange={formik.handleChange}
                helperText={formik.touched.charge && formik.errors.charge}
                error={formik.touched.charge && Boolean(formik.errors.charge)}
                required
              >
                <option value="">Seleccione cargo</option>
                {exampleCharges.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Teléfono"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.phone && formik.errors.phone}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Teléfono oficina"
                name="phoneOffice"
                value={formik.values.phoneOffice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.phoneOffice && formik.errors.phoneOffice
                }
                error={
                  formik.touched.phoneOffice &&
                  Boolean(formik.errors.phoneOffice)
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Otro Teléfono"
                name="phoneOther"
                value={formik.values.phoneOther}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.phoneOther && formik.errors.phoneOther
                }
                error={
                  formik.touched.phoneOther && Boolean(formik.errors.phoneOther)
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

      <Toaster />
    </Dialog>
  )
}

ContactModal.defaultProps = {
  type: 'CREATE'
}

export default withRouter(ContactModal)
