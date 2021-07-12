import { useState } from 'react'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { Box, Drawer, Grid, IconButton, Typography } from '@material-ui/core'
import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon
} from '@material-ui/icons/'
import useStyles from './styles'
import regionJSON from '../../../resources/regions.json'
import useSuccess from '../../../hooks/useSuccess'
import companiesActions from '../../../state/actions/companies'
import { Heading, TextField, Select, SubmitButton } from '../../UI'

const validationSchema = Yup.object({
  rut: Yup.string().required('Ingrese rut'),
  name: Yup.string().required('Ingrese nombre'),
  businessName: Yup.string().required('Ingrese razón social'),
  email: Yup.string().email('Ingrese correo válid').required('Ingrese correo'),
  address: Yup.string().required('Ingrese dirección'),
  commune: Yup.string().required('Seleccione comuna'),
  region: Yup.string().required('Seleccione región'),
  phone1: Yup.string().required('Ingrese teléfono')
})

const notify = (message) => toast.error(message)

const CreateDrawer = ({ open, onClose, anchor }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { success, changeSuccess } = useSuccess()
  const [communes, setCommunes] = useState([])

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      businessName: '',
      rut: '',
      name: '',
      address: '',
      commune: '',
      region: '',
      phone1: ''
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

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'region': {
        const region = regionJSON.regions.find((item) => item.number === value)
        setCommunes(region.communes)
        formik.setFieldValue('region', region.name)
        break
      }
      case 'commune': {
        const commune = communes.find((item) => item.name === value)
        formik.setFieldValue('commune', commune.name)
        break
      }
      default:
        throw new Error('Error')
    }
  }

  return (
    <Drawer anchor={anchor} open={open}>
      <Box className={classes.form} p={2}>
        <Box className={classes.heading}>
          <Box display="flex" alignItems="center">
            <IconButton onClick={onClose}>
              <ArrowBackIcon />
            </IconButton>
            <Heading>Nueva empresa</Heading>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box>
          <Typography className={classes.subtitle}>
            Información de empresa
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Rut"
                name="rut"
                error={true}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rut}
                helperText={formik.touched.rut && formik.errors.rut}
                error={formik.touched.rut && Boolean(formik.errors.rut)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Razón"
                name="businessName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.businessName}
                helperText={
                  formik.touched.businessName && formik.errors.businessName
                }
                error={
                  formik.touched.businessName &&
                  Boolean(formik.errors.businessName)
                }
              />
            </Grid>
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
            <Grid item xs={12}>
              <TextField
                label="Correo"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                helperText={formik.touched.email && formik.errors.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Dirección"
                name="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                helperText={formik.touched.address && formik.errors.address}
                error={formik.touched.address && Boolean(formik.errors.address)}
              />
            </Grid>
            <Grid item xs={12}>
              <Box minHeight="100px"></Box>
            </Grid>
            <Grid item xs={12}>
              <Select
                label="Región"
                name="region"
                onChange={handleSelectChange}
              >
                <option value={`INVALID`}>Seleccione una región</option>
                {regionJSON.regions.map((item, index) => (
                  <option key={`region--${index}`} value={`${item.number}`}>
                    {`${item.romanNumber}.- ${item.name}`}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Select
                label="Comuna"
                name="commune"
                onChange={handleSelectChange}
              >
                <option value={`INVALID`}>Seleccione una comuna</option>
                {communes.map((item, index) => (
                  <option key={`region--${index}`} value={`${item.name}`}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Teléfono"
                onChange={formik.handleChange}
                name="phone1"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Teléfono" name="phone2" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Teléfono" name="phone3" />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Typography className={classes.subtitle}>Otros Datos</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Select label="Tipo" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select label="Asociada" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select label="Asociada" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select label="Beneficio pyme" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select label="Empresa madre" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select label="Servicio social" />
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
      <Toaster />
    </Drawer>
  )
}

CreateDrawer.defaultProps = {
  anchor: 'right'
}

CreateDrawer.propTypes = {
  anchor: PropTypes.string
}

export default CreateDrawer
