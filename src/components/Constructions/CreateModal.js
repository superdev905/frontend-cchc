import * as Yup from 'yup'
import PropTypes from 'prop-types'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import {
  Box,
  Grid,
  IconButton,
  Dialog,
  makeStyles,
  DialogContent
} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons/'
import useSuccess from '../../hooks/useSuccess'
import companiesActions from '../../state/actions/companies'
import { Heading, TextField, SubmitButton, Select } from '../UI'

const validationSchema = Yup.object({
  name: Yup.string().required('Ingrese nombre'),
  charge: Yup.string().required('Ingrese cargo'),
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

const CreateDrawer = ({ open, onClose }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { success, changeSuccess } = useSuccess()

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      name: '',
      email: '',
      charge: '',
      phone: '',
      phoneOffice: '',
      phoneOther: ''
    },
    onSubmit: (values) => {
      const data = {
        business_name: values.businessName,
        email: values.email,
        rut: values.rut,
        name: values.name,
        address: values.address,
        commune: values.commune,
        region: values.region,
        phone1: values.phone1,
        phone: '',
        phone2: ''
      }
      dispatch(companiesActions.createCompany(data))
        .then(() => {
          formik.setSubmitting(false)
          setTimeout(() => {
            changeSuccess(true)
          }, 1000)
        })
        .catch((err) => {
          formik.setSubmitting(false)
          notify(err)
          changeSuccess(false)
        })
    }
  })

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className={classes.form} p={2}>
          <Box className={classes.heading}>
            <Box display="flex" alignItems="center">
              <Heading>Nuevo Contacto</Heading>
            </Box>
          </Box>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={12}>
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

              <Grid item xs={12} md={12}>
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
              <Grid item xs={12} md={12}>
                <Select label="Cargo">
                  <option value="EMPTY">Seleccione cargo</option>
                  {exampleCharges.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={12}>
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
              <Grid item xs={12} md={12}>
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
              <Grid item xs={12} md={12}>
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
                    formik.touched.phoneOther &&
                    Boolean(formik.errors.phoneOther)
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            className={classes.actions}
          >
            <SubmitButton
              onClick={formik.handleSubmit}
              success={success}
              loading={formik.isSubmitting}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Crear empresa
            </SubmitButton>
          </Box>
        </Box>
      </DialogContent>
      <Toaster />
    </Dialog>
  )
}

CreateDrawer.propTypes = {
  anchor: PropTypes.string
}

export default CreateDrawer
