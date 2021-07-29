import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { addMonths } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog, Map } from '../Shared'
import { Button, Select, SubmitButton, TextField } from '../UI'
import commonActions from '../../state/actions/common'
import AddressAutocomplete from '../Shared/AddressAutoComplete'
import { phoneValidator } from '../../validations'

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Ingrese dirección'),
  region_id: Yup.number().required('Seleccione region'),
  commune_id: Yup.number().required('Seleccione communa'),
  housing_group: Yup.string(),
  number: Yup.string().required('Ingrese número'),
  block: Yup.string(),
  department: Yup.string(),
  email: Yup.string().email('Ingrese correo válido').required('Ingreso correo'),
  mobile_phone: Yup.string().test(
    'Check phone',
    'Ingrese télefono válido',
    (v) => phoneValidator(v)
  ),
  landline_phone: Yup.string().test(
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

const EmployeeModal = ({
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
  const { isMobile } = useSelector((state) => state.ui)
  const { regions } = useSelector((state) => state.common)

  const getValidValidation = (form) => {
    if (form.mobile_phone) return true
    if (form.other_phone) return true
    if (form.landline_phone) return true
    return false
  }

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      address: type === 'UPDATE' ? data.address : '',
      region_id: type === 'UPDATE' ? data.region_id : '',
      commune_id: type === 'UPDATE' ? data.commune_id : '',
      number: type === 'UPDATE' ? data.number : '',
      housing_group: type === 'UPDATE' ? data.housing_group : '',
      block: type === 'UPDATE' ? data.block : '',
      department: type === 'UPDATE' ? data.department : '',
      email: type === 'UPDATE' ? data.email : '',
      mobile_phone: type === 'UPDATE' ? data.mobile_phone : '',
      other_phone: type === 'UPDATE' ? data.other_phone : '',
      landline_phone: type === 'UPDATE' ? data.landline_phone : ''
    },
    onSubmit: (values) => {
      submitFunction({ ...values, confirmation_date: addMonths(new Date(), 1) })
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })
          onClose()
          if (successFunction) {
            successFunction()
          }
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
      case 'region_id': {
        const region = regions.find((item) => item.id === parseInt(value, 10))
        setCommunes(region?.communes || [])
        formik.setFieldValue('region_id', region?.id || '')
        break
      }
      case 'commune_id': {
        const commune = communes.find((item) => item.id === parseInt(value, 10))
        formik.setFieldValue('commune_id', commune?.id || '')
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
    if (open) {
      dispatch(commonActions.getRegions())
    }
  }, [open])
  return (
    <Dialog open={open} onClose={onClose} maxWidth={'lg'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${
            type === 'Registrar' ? 'Actualizar' : 'Crear'
          } información de contacto`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <AddressAutocomplete
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
                    name="region_id"
                    onChange={handleSelectChange}
                    value={formik.values.region_id}
                    required
                    error={
                      formik.touched.region_id &&
                      Boolean(formik.errors.region_id)
                    }
                    helperText={
                      formik.touched.region_id && formik.errors.region_id
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
                    name="commune_id"
                    onChange={handleSelectChange}
                    value={formik.values.commune_id}
                    required
                    error={
                      formik.touched.commune_id &&
                      Boolean(formik.errors.commune_id)
                    }
                    helperText={
                      formik.touched.commune_id && formik.errors.commune_id
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
                    label="Número"
                    name="number"
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.number && Boolean(formik.errors.number)
                    }
                    helperText={formik.touched.number && formik.errors.number}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Nombre de la villa o cojunto habitacional"
                    name="housing_group"
                    value={formik.values.names}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.names && Boolean(formik.errors.names)}
                    helperText={formik.touched.names && formik.errors.names}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Block"
                    name="block"
                    value={formik.values.names}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.names && Boolean(formik.errors.names)}
                    helperText={formik.touched.names && formik.errors.names}
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
                    label="Block"
                    name="block"
                    value={formik.values.names}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.names && Boolean(formik.errors.names)}
                    helperText={formik.touched.names && formik.errors.names}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Departamento"
                    name="department"
                    value={formik.values.names}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.names && Boolean(formik.errors.names)}
                    helperText={formik.touched.names && formik.errors.names}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Telefóno móvil"
                    name="mobile_phone"
                    value={formik.values.names}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.mobile_phone &&
                      Boolean(formik.errors.mobile_phone)
                    }
                    helperText={
                      formik.touched.mobile_phone && formik.errors.mobile_phone
                    }
                    inputProps={{
                      maxLength: 9
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Telefóno fijo"
                    name="landline_phone"
                    value={formik.values.landline_phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.landline_phone &&
                      Boolean(formik.errors.landline_phone)
                    }
                    helperText={
                      formik.touched.landline_phone &&
                      formik.errors.landline_phone
                    }
                    inputProps={{
                      maxLength: 9
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Otro telefóno"
                    name="other_phone"
                    value={formik.values.other_phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.other_phone &&
                      Boolean(formik.errors.other_phone)
                    }
                    helperText={
                      formik.touched.other_phone && formik.errors.other_phone
                    }
                    inputProps={{
                      maxLength: 9
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Map height="100%" />
            </Grid>
          </Grid>

          <Box textAlign="center" marginTop="10px">
            <Button onClick={onClose} variant="outlined">
              Cancelar
            </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              disabled={
                !formik.isValid ||
                formik.isSubmitting ||
                !getValidValidation(formik.values)
              }
            >
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} datos`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

EmployeeModal.defaultProps = {
  type: 'CREATE'
}

export default EmployeeModal
