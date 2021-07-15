import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import ReactMapGL from 'react-map-gl'
import { withRouter } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core'
import commonActions from '../../state/actions/common'
import constructionsActions from '../../state/actions/constructions'
import {
  Button,
  FullScreenDialog,
  Select,
  SubmitButton,
  TextField
} from '../UI'
import { DatePicker } from '../Shared'

const validationSchema = Yup.object({
  rut: Yup.string().required('Ingrese rut'),
  name: Yup.string(),
  business_name: Yup.string().required('Ingrese razón social'),
  address: Yup.string().required('Ingrese dirección'),
  commune_id: Yup.string().required('Seleccione comuna'),
  region_id: Yup.string().required('Seleccione región'),
  state: Yup.string().required('Seleccione estado'),
  typology_id: Yup.string().nullable(),
  economic_sector_id: Yup.string().required('Seleccione sector economico'),
  end_date: Yup.date().nullable()
})

const ConstructionModal = ({ open, onClose, type, construction, ...props }) => {
  const dispatch = useDispatch()
  const { idCompany } = props.match.params
  const [communes, setCommunes] = useState([])
  const { regions } = useSelector((state) => state.common)
  const { typologies, sectors } = useSelector((state) => state.constructions)

  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema,
    initialValues: {
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
      end_date: type === 'UPDATE' ? construction.end_date : null
    },
    onSubmit: (values) => {
      const data = {
        ...values,
        typology_id: values.typology_id
          ? parseInt(values.typology_id, 10)
          : null,
        economic_sector_id: parseInt(values.economic_sector_id, 10),
        business_id: idCompany
      }
      if (type === 'CREATE') {
        dispatch(constructionsActions.createConstruction(data))
      } else {
        dispatch(constructionsActions.updateConstruction(construction.id, data))
      }
    }
  })
  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'region': {
        const region = regions.find((item) => item.id === parseInt(value, 10))
        setCommunes(region.communes)
        formik.setFieldValue('region_id', region.id)
        break
      }
      case 'commune': {
        const commune = communes.find((item) => item.id === parseInt(value, 10))
        formik.setFieldValue('commune_id', commune.id)
        break
      }
      default:
        throw new Error('Error')
    }
  }

  useEffect(() => {
    if (open) {
      dispatch(commonActions.getRegions())
      dispatch(constructionsActions.getTypologies())
      dispatch(constructionsActions.getSectors())
    }
  }, [open, type])

  useEffect(() => {
    if (regions.length > 0 && type === 'UPDATE') {
      setCommunes(
        regions.find((item) => item.id === construction.region.id).communes
      )
    }
  }, [regions])

  console.log(formik.errors)

  return (
    <FullScreenDialog open={open} onClose={onClose}>
      <Box maxWidth="900px" style={{ margin: '0 auto' }}>
        <Box>
          <Typography align="center">{`${
            type === 'CREATE' ? 'Nueva' : 'Editar'
          } obra`}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Rut"
                name="rut"
                error={true}
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
              />
            </Grid>
          </Grid>
          <Box marginTop="15px">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box height="250px">
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
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.address}
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
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
            </Grid>
            <Box textAlign="center" marginTop="15px">
              <Button variant="outlined" onClick={onClose}>
                Cancelar
              </Button>
              <SubmitButton
                disabled={!formik.isValid || formik.isSubmitting}
                onClick={formik.handleSubmit}
              >
                {`${type === 'CREATE' ? 'Crear' : 'Actualizar'} obra`}
              </SubmitButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </FullScreenDialog>
  )
}
ConstructionModal.defaultProps = {
  type: 'CREATE'
}

export default withRouter(ConstructionModal)
