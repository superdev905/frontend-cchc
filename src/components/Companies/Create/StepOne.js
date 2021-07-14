import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import ReactMapGL from 'react-map-gl'
import { Box, Grid, Typography } from '@material-ui/core'
import commonActions from '../../../state/actions/common'
import companiesActions from '../../../state/actions/companies'
import { Select, TextField } from '../../UI'
import useStyles from './styles'
import Actions from './Actions'

const validationSchema = Yup.object({
  rut: Yup.string().required('Ingrese rut'),
  name: Yup.string(),
  businessName: Yup.string().required('Ingrese razón social'),
  email: Yup.string().email('Ingrese correo válido').required('Ingrese correo'),
  address: Yup.string().required('Ingrese dirección'),
  commune: Yup.string().required('Seleccione comuna'),
  region: Yup.string().required('Seleccione región'),
  phone: Yup.string().required('Ingrese teléfono'),
  phone1: Yup.string(),
  phone2: Yup.string()
})

const StepOne = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [communes, setCommunes] = useState([])
  const { regions } = useSelector((state) => state.common)
  const { create } = useSelector((state) => state.companies)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      businessName: create?.company?.businessName || '',
      rut: create?.company?.rut || '',
      name: create?.company?.name || '',
      email: create?.company?.email || '',
      address: create?.company?.address || '',
      commune: create?.company?.commune || '',
      region: create?.company?.region || '',
      phone: create?.company?.phone || '',
      phone1: create?.company?.phone1 || '',
      phone2: create?.company?.phone1 || ''
    },
    onSubmit: (values) => {
      dispatch(
        companiesActions.updateCreate({
          ...create,
          company: values,
          step: create.step + 1
        })
      )
    }
  })
  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'region': {
        const region = regions.find(
          (item) => item.number === parseInt(value, 10)
        )
        setCommunes(region.communes)
        formik.setFieldValue('region', region.id)
        break
      }
      case 'commune': {
        const commune = communes.find((item) => item.name === value)
        formik.setFieldValue('commune', commune.id)
        break
      }
      default:
        throw new Error('Error')
    }
  }

  useEffect(() => {
    dispatch(commonActions.getRegions())
  }, [])

  return (
    <Box className={classes.form}>
      <Box>
        <Typography align="center" className={classes.subtitle}>
          Información de empresa
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
            <TextField
              label="Razón social"
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
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              helperText={formik.touched.email && formik.errors.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="phone"
              label="Teléfono"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              helperText={formik.touched.phone && formik.errors.phone}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Teléfono" name="phone2" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Teléfono" name="phone3" />
          </Grid>
        </Grid>
        <Box marginTop="15px">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box height="250px" className={classes.mapContainer}>
                <ReactMapGL
                  mapboxApiAccessToken="pk.eyJ1Ijoib2NmcmFueiIsImEiOiJja3F3cnFuanAwbWNoMm9uenV1bHQ1b2xrIn0.GEpo1IDGKp-mxvJZAm1cJw"
                  {...{
                    width: '100%',
                    height: '100%',
                    latitude: -33.45694,
                    longitude: -70.64827,
                    zoom: 10
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Dirección"
                    name="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    helperText={formik.touched.address && formik.errors.address}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Select
                    label="Región"
                    name="region"
                    onChange={handleSelectChange}
                  >
                    <option value={`INVALID`}>Seleccione una región</option>
                    {regions.map((item, index) => (
                      <option key={`region--${index}`} value={`${item.number}`}>
                        {`${item.roman_number}.- ${item.name}`}
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
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Actions
        showBackIcon={false}
        backText="Cancelar"
        disableNext={!formik.isValid}
        handleNext={formik.handleSubmit}
      />
    </Box>
  )
}

export default StepOne
