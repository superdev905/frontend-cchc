import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Box, Grid, Typography } from '@material-ui/core'
import commonActions from '../../../state/actions/common'
import companiesActions from '../../../state/actions/companies'
import { RutTextField, Select, TextField } from '../../UI'
import useStyles from './styles'
import Actions from './Actions'
import { rutValidation } from '../../../validations'
import { AddressAutoComplete, Map } from '../../Shared'
import { SantiagoDefaultLocation as location } from '../../../config'

const validationSchema = Yup.object({
  rut: Yup.string()
    .required('Ingrese rut')
    .test('Check rut', 'Ingrese rut válido', (v) => rutValidation(v)),
  name: Yup.string(),
  business_name: Yup.string().required('Ingrese razón social'),
  email: Yup.string().email('Ingrese correo válido').required('Ingrese correo'),
  address: Yup.string().required('Ingrese dirección'),
  commune: Yup.string().required('Seleccione comuna'),
  longitude: Yup.string().required('Seleccione dirección'),
  latitude: Yup.string().required('Seleccione dirección'),
  region: Yup.string().required('Seleccione región')
})

const StepOne = ({ onClose }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [communes, setCommunes] = useState([])
  const { regions } = useSelector((state) => state.common)
  const { create } = useSelector((state) => state.companies)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      business_name: create?.company?.business_name || '',
      rut: create?.company?.rut || '',
      name: create?.company?.name || '',
      email: create?.company?.email || '',
      address: create?.company?.address || '',
      commune: create?.company?.commune?.id || '',
      region: create?.company?.region_id || '',
      latitude: parseFloat(create?.company?.latitude) || location.latitude,
      longitude: parseFloat(create?.company?.longitude) || location.longitude
    },
    onSubmit: (values) => {
      dispatch(
        companiesActions.updateCreate({
          ...create,
          company: { ...create.company, ...values },
          step: create.step + 1
        })
      )
    }
  })

  const changeLocation = (targetLocation) => {
    formik.setFieldValue('longitude', targetLocation.lng)
    formik.setFieldValue('latitude', targetLocation.lat)
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'region': {
        const region = regions.find((item) => item.id === parseInt(value, 10))
        setCommunes(region.communes)
        formik.setFieldValue('region', region.id)
        break
      }
      case 'commune': {
        const commune = communes.find((item) => item.id === parseInt(value, 10))
        formik.setFieldValue('commune', commune.id)
        break
      }
      default:
        throw new Error('Error')
    }
  }

  useEffect(() => {
    if (formik.values.region && regions.length > 0) {
      handleSelectChange({
        target: { name: 'region', value: formik.values.region }
      })
    }
  }, [formik.values.region, regions])

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
            <RutTextField
              label="Rut"
              name="rut"
              required
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
              name="business_name"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.business_name}
              helperText={
                formik.touched.business_name && formik.errors.business_name
              }
              error={
                formik.touched.business_name &&
                Boolean(formik.errors.business_name)
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
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              helperText={formik.touched.email && formik.errors.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
          </Grid>
        </Grid>
        <Box marginTop="15px">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box>
                <Map
                  latitude={formik.values.latitude}
                  longitude={formik.values.longitude}
                  markers={[
                    {
                      address: formik.values.address,
                      latitude: formik.values.latitude,
                      longitude: formik.values.longitude
                    }
                  ]}
                ></Map>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AddressAutoComplete
                    search={formik.values.address}
                    onChange={(value) => {
                      formik.setFieldValue('address', value)
                    }}
                    helperText={formik.touched.address && formik.errors.address}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    onSetLocation={changeLocation}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Select
                    label="Región"
                    name="region"
                    value={formik.values.region}
                    required
                    onChange={handleSelectChange}
                  >
                    <option value={`INVALID`}>Seleccione una región</option>
                    {regions.map((item, index) => (
                      <option key={`region--${index}`} value={`${item.id}`}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Select
                    label="Comuna"
                    name="commune"
                    value={formik.values.commune}
                    required
                    onChange={handleSelectChange}
                  >
                    <option value={`INVALID`}>Seleccione una comuna</option>
                    {communes.map((item, index) => (
                      <option key={`region--${index}`} value={`${item.id}`}>
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
        handleBack={onClose}
        backText="Cancelar"
        disableNext={!formik.isValid}
        handleNext={formik.handleSubmit}
      />
    </Box>
  )
}

export default StepOne
