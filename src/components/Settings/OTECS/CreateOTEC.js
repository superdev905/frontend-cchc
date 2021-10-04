import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { addMonths } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { AddressAutoComplete, Dialog, Map } from '../../Shared'
import { Button, RutTextField, Select, SubmitButton, TextField } from '../../UI'
import commonActions from '../../../state/actions/common'
import { phoneValidator } from '../../../validations'
import { useSuccess } from '../../../hooks'
import { SantiagoDefaultLocation } from '../../../config'

const validationSchema = Yup.object().shape({
  businessName: Yup.string().required('Ingreso nombre de OTEC'),
  rut: Yup.string(),
  address: Yup.string().required('Ingrese dirección'),
  regionId: Yup.number().required('Seleccione region'),
  communeId: Yup.number().required('Seleccione communa'),
  phone: Yup.string().test('Check phone', 'Ingrese télefono válido', (v) =>
    phoneValidator(v)
  ),
  email: Yup.string().required('Ingrese correo'),
  contact: Yup.string().required('Ingrese nombre de contacto')
})

const CreateOTEC = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const dispatch = useDispatch()
  const [communes, setCommunes] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)
  const { regions } = useSelector((state) => state.common)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      businessName: type === 'UPDATE' ? data?.businessName : '',
      rut: type === 'UPDATE' ? data?.rut : '',
      address: type === 'UPDATE' ? data?.address : '',
      latitude: type === 'UPDATE' ? data?.latitude : '',
      longitude: type === 'UPDATE' ? data?.longitude : '',
      regionId: type === 'UPDATE' ? data?.regionId : '',
      communeId: type === 'UPDATE' ? data?.communeId : '',
      phone: type === 'UPDATE' ? data?.phone : '',
      email: type === 'UPDATE' ? data?.email : '',
      contact: type === 'UPDATE' ? data?.contact : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({
        ...values,
        confirmation_date: new Date(addMonths(new Date(), 1))
      })
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })

          changeSuccess(true, () => {
            onClose()
            resetForm()
            if (successFunction) {
              successFunction()
            }
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, {
            variant: 'error'
          })
        })
    }
  })

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'regionId': {
        const region = regions.find((item) => item.id === parseInt(value, 10))
        setCommunes(region?.communes || [])
        formik.setFieldValue('regionId', region?.id || '')
        break
      }
      case 'communeId': {
        const commune = communes.find((item) => item.id === parseInt(value, 10))
        formik.setFieldValue('communeId', commune?.id || '')
        break
      }
      default:
        throw new Error('Error')
    }
  }

  const changeLocation = (targetLocation) => {
    formik.setFieldValue('longitude', targetLocation.lng)
    formik.setFieldValue('latitude', targetLocation.lat)
  }

  useEffect(() => {
    if (regions.length > 0 && type === 'UPDATE') {
      setCommunes(regions.find((item) => item.id === data?.regionId).communes)
    }
  }, [regions])

  useEffect(() => {
    if (open) {
      dispatch(commonActions.getRegions())
    }
  }, [open, type])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'lg'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${type === 'Registrar' ? 'Actualizar' : 'Nueva'} OTEC`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Razon social"
                    required
                    name="businessName"
                    value={formik.values.businessName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.businessName &&
                      Boolean(formik.errors.businessName)
                    }
                    helperText={
                      formik.touched.businessName && formik.errors.businessName
                    }
                  />
                </Grid>
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
                  <AddressAutoComplete
                    required
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
                <Grid item xs={12} md={6}>
                  <Select
                    label="Región"
                    name="regionId"
                    onChange={handleSelectChange}
                    value={formik.values.regionId}
                    required
                    error={
                      formik.touched.regionId && Boolean(formik.errors.regionId)
                    }
                    helperText={
                      formik.touched.regionId && formik.errors.regionId
                    }
                  >
                    <option value="">Seleccione una región</option>
                    {regions.map((item, index) => (
                      <option key={`region--${index}`} value={`${item.id}`}>
                        {`${item.name}`}
                      </option>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Select
                    label="Comuna"
                    name="communeId"
                    onChange={handleSelectChange}
                    value={formik.values.communeId}
                    required
                    error={
                      formik.touched.communeId &&
                      Boolean(formik.errors.communeId)
                    }
                    helperText={
                      formik.touched.communeId && formik.errors.communeId
                    }
                  >
                    <option value="">Seleccione una comuna</option>
                    {communes.map((item, index) => (
                      <option key={`region--${index}`} value={`${item.id}`}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Telefóno"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    inputProps={{
                      maxLength: 9
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Correo"
                    required
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Contacto"
                    required
                    name="contact"
                    value={formik.values.contact}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.contact && Boolean(formik.errors.contact)
                    }
                    helperText={formik.touched.contact && formik.errors.contact}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Map
                height="100%"
                width="100%"
                zoom={16}
                latitude={
                  formik.values.latitude || SantiagoDefaultLocation.latitude
                }
                longitude={
                  formik.values.longitude || SantiagoDefaultLocation.longitude
                }
                showMarkers={Boolean(
                  formik.values.latitude && formik.values.longitude
                )}
                markers={[
                  {
                    address: formik.values.address,
                    latitude:
                      formik.values.latitude ||
                      SantiagoDefaultLocation.latitude,
                    longitude:
                      formik.values.longitude ||
                      SantiagoDefaultLocation.longitude
                  }
                ]}
              />
            </Grid>
          </Grid>

          <Box textAlign="center" marginTop="10px">
            <Button onClick={onClose} variant="outlined">
              Cancelar
            </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              disabled={!formik.isValid || formik.isSubmitting}
              loading={formik.isSubmitting}
              success={success}
            >
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} OTEC`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

CreateOTEC.defaultProps = {
  type: 'CREATE'
}

export default CreateOTEC
