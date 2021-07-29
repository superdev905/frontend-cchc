import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useFormik } from 'formik'
import { Box, Grid, Typography } from '@material-ui/core'
import commonActions from '../../state/actions/common'
import constructionsActions from '../../state/actions/constructions'
import companiesActions from '../../state/actions/companies'
import { Button, RutTextField, Select, SubmitButton, TextField } from '../UI'
import { DatePicker, Map, AddressAutoComplete, Dialog } from '../Shared'
import { rutValidation } from '../../validations'
import { SantiagoDefaultLocation as location } from '../../config'
import { useSuccess } from '../../hooks'

const businessSchema = Yup.object({
  business_selected_id: Yup.number().required('Seleccione empresa')
})

const validationSchema = Yup.object({
  rut: Yup.string()
    .required('Ingrese rut')
    .test('Check rut', 'Ingrese rut válido', (v) => rutValidation(v)),
  name: Yup.string(),
  business_name: Yup.string().required('Ingrese razón social'),
  address: Yup.string().required('Ingrese dirección'),
  commune_id: Yup.string().required('Seleccione comuna'),
  region_id: Yup.number().required('Seleccione región'),
  state: Yup.string().required('Seleccione estado'),
  typology_id: Yup.number().nullable(),
  economic_sector_id: Yup.number().required('Seleccione sector economico'),
  end_date: Yup.date().nullable(),
  longitude: Yup.string().nullable(),
  latitude: Yup.string().nullable(),
  billing_rut: Yup.string()
    .required('Ingrese rut de facturación')
    .test('Check rut', 'Ingrese rut válido', (v) => rutValidation(v)),
  billing_business_name: Yup.string().required(
    'Ingrese razón social de facturación'
  )
})

const ConstructionModal = ({
  open,
  selectClient,
  onClose,
  type,
  construction,
  submitFunction,
  successFunction,
  successMessage
}) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [communes, setCommunes] = useState([])
  const [companies, setCompanies] = useState([])
  const { success, changeSuccess } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)
  const { regions } = useSelector((state) => state.common)
  const { typologies, sectors } = useSelector((state) => state.constructions)

  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    validateOnBlur: true,
    validationSchema: selectClient
      ? businessSchema.concat(validationSchema)
      : validationSchema,
    initialValues: {
      business_selected_id: '',
      business_name: type === 'UPDATE' ? construction.business_name : '',
      rut: type === 'UPDATE' ? construction.rut : '',
      name: type === 'UPDATE' ? construction.name : '',
      address: type === 'UPDATE' ? construction.address : '',
      commune_id: type === 'UPDATE' ? construction.commune.id : '',
      region_id: type === 'UPDATE' ? construction.region.id : '',
      state: type === 'UPDATE' ? construction.state : '',
      typology_id: type === 'UPDATE' ? construction.typology_id : '',
      economic_sector_id:
        type === 'UPDATE' ? construction.economic_sector_id : '',
      end_date: type === 'UPDATE' ? construction.end_date : null,
      latitude:
        type === 'UPDATE'
          ? parseFloat(construction.latitude)
          : location.latitude,
      longitude:
        type === 'UPDATE'
          ? parseFloat(construction.longitude)
          : location.longitude,
      billing_rut: type === 'UPDATE' ? construction?.billing_rut : '',
      billing_business_name: type === 'UPDATE' ? construction?.billing_rut : ''
    },
    onSubmit: (values, { resetForm }) => {
      const data = { ...values }
      if (selectClient) {
        data.business_id = parseInt(values.business_selected_id, 10)
      }
      submitFunction(data)
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true)
          if (successFunction) {
            successFunction()
          }
          onClose()
          resetForm()
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err.detail, {
            variant: 'error'
          })
        })
    }
  })
  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'region': {
        const region = regions.find((item) => item.id === parseInt(value, 10))
        setCommunes(region?.communes || [])
        formik.setFieldValue('region_id', region?.id || '')
        break
      }
      case 'commune': {
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
    formik.setFieldValue(
      'end_date',
      formik.values.state === 'NO_VIGENTE' ? new Date() : null
    )
  }, [formik.values.state])

  useEffect(() => {
    if (open) {
      dispatch(commonActions.getRegions())
      dispatch(constructionsActions.getTypologies())
      dispatch(constructionsActions.getSectors())
      if (selectClient) {
        dispatch(companiesActions.getCompanies({}, false)).then((list) => {
          setCompanies(list)
        })
      }
    }
  }, [open, type, selectClient])

  useEffect(() => {
    if (regions.length > 0 && type === 'UPDATE') {
      setCommunes(
        regions.find((item) => item.id === construction.region.id).communes
      )
    }
  }, [regions])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'lg'} fullScreen={isMobile}>
      <Box maxWidth="900px" style={{ margin: '0 auto' }}>
        <Box>
          <Typography
            align="center"
            style={{
              fontSize: '20px',
              marginBottom: '15px',
              fontWeight: 'bold'
            }}
          >{`${type === 'CREATE' ? 'Nueva' : 'Editar'} obra`}</Typography>
          <Grid container spacing={2}>
            {selectClient && (
              <Grid item xs={12} md={6}>
                <Select
                  label="Seleccion empresa"
                  name="business_selected_id"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.business_selected_id}
                  helperText={
                    formik.touched.business_selected_id &&
                    formik.errors.business_selected_id
                  }
                  error={
                    formik.touched.business_id &&
                    Boolean(formik.errors.business_selected_id)
                  }
                >
                  <option value="">Seleccione empresa</option>
                  {companies.map((item, index) => (
                    <option key={`company--${index}`} value={`${item.id}`}>
                      {item.business_name}
                    </option>
                  ))}
                </Select>
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <RutTextField
                label="Rut"
                name="rut"
                required
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
              <Select
                label="Tipologia de obra"
                name="typology_id"
                onChange={formik.handleChange}
                value={formik.values.typology_id}
                helperText={
                  formik.touched.typology_id && formik.errors.typology_id
                }
                error={
                  formik.touched.typology_id &&
                  Boolean(formik.errors.typology_id)
                }
              >
                <option value="">Sin tipología</option>
                {typologies.map((item, index) => (
                  <option key={`region--${index}`} value={`${item.id}`}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Sector económico"
                name="economic_sector_id"
                required
                onChange={formik.handleChange}
                value={formik.values.economic_sector_id}
                helperText={
                  formik.touched.economic_sector_id &&
                  formik.errors.economic_sector_id
                }
                error={
                  formik.touched.economic_sector_id &&
                  Boolean(formik.errors.economic_sector_id)
                }
              >
                <option value="">Seleccione sector</option>
                {sectors.map((item, index) => (
                  <option key={`region--${index}`} value={`${item.id}`}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Estado"
                name="state"
                required
                onChange={formik.handleChange}
                value={formik.values.state}
                helperText={formik.touched.state && formik.errors.state}
                error={formik.touched.state && Boolean(formik.errors.state)}
              >
                <option value="">Seleccione estado</option>
                {[
                  { key: 'VIGENTE', name: 'VIGENTE' },
                  { key: 'NO_VIGENTE', name: 'NO VIGENTE' }
                ].map((item, index) => (
                  <option key={`region--${index}`} value={`${item.key}`}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Fecha termino"
                value={formik.values.end_date}
                helperText={formik.touched.end_date && formik.errors.end_date}
                error={
                  formik.touched.end_date && Boolean(formik.errors.end_date)
                }
                onChange={(date) => {
                  formik.setFieldTouched('end_date')
                  formik.setFieldValue('end_date', date)
                }}
                disabled={!(formik.values.state === 'NO_VIGENTE')}
              />
            </Grid>
          </Grid>
          <Box marginTop="15px">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
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
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <AddressAutoComplete
                      search={formik.values.address}
                      required
                      onChange={(value) => {
                        formik.setFieldValue('address', value)
                        formik.setFieldTouched('address')
                      }}
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
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
                      onChange={handleSelectChange}
                      value={formik.values.region_id}
                      required
                    >
                      <option value={`INVALID`}>Seleccione una región</option>
                      {regions.map((item, index) => (
                        <option key={`region--${index}`} value={`${item.id}`}>
                          {`${item.name}`}
                        </option>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      label="Comuna"
                      name="commune"
                      onChange={handleSelectChange}
                      value={formik.values.commune_id}
                      required
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
              <Grid item xs={12}>
                <Typography style={{ marginBottom: '10px' }}>
                  Facturación
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <RutTextField
                      name="billing_rut"
                      label="Rut"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.billing_rut}
                      helperText={
                        formik.touched.billing_rut && formik.errors.billing_rut
                      }
                      error={
                        formik.touched.billing_rut &&
                        Boolean(formik.errors.billing_rut)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="billing_business_name"
                      label="Razón social"
                      onChange={formik.handleChange}
                      required
                      value={formik.values.billing_business_name}
                      helperText={
                        formik.touched.billing_business_name &&
                        formik.errors.billing_business_name
                      }
                      error={
                        formik.touched.billing_business_name &&
                        Boolean(formik.errors.billing_business_name)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box textAlign="center" marginTop="15px">
              <Button variant="outlined" onClick={onClose}>
                Cancelar
              </Button>
              <SubmitButton
                loading={formik.isSubmitting}
                disabled={!formik.isValid || formik.isSubmitting}
                onClick={formik.handleSubmit}
                success={success}
              >
                {`${type === 'CREATE' ? 'Crear' : 'Actualizar'} obra`}
              </SubmitButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}
ConstructionModal.defaultProps = {
  type: 'CREATE',
  selectClient: false,
  successMessage: 'Obra creada exitosamente'
}

export default ConstructionModal
