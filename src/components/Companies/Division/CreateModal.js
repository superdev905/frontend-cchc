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
import useSuccess from '../../../hooks/useSuccess'
import companiesActions from '../../../state/actions/companies'
import { Heading, TextField, SubmitButton, Select } from '../../UI'

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
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className={classes.form} p={2}>
          <Box>
            <Heading align="center">Nueva división</Heading>
          </Box>

          <Box>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  required={true}
                  label="Rut"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  helperText={formik.touched.name && formik.errors.name}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required={true}
                  label="Nombre"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  helperText={formik.touched.name && formik.errors.name}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                />
              </Grid>

              <Grid item xs={12}>
                <Select required={true} label="Empresa socia">
                  <option value="EMPTY">Seleccione empresa</option>
                  {exampleCharges.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.actions}>
            <SubmitButton
              onClick={formik.handleSubmit}
              success={success}
              loading={formik.isSubmitting}
            >
              Agregar contacto
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
