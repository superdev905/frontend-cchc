import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useFormik } from 'formik'
import { Box, Grid, Typography } from '@material-ui/core'
import commonActions from '../../state/actions/common'
import { Button, Select, SubmitButton } from '../UI'
import { Map, AddressAutoComplete, Dialog } from '../Shared'
import { useSuccess } from '../../hooks'

const validationSchema = Yup.object({
  address: Yup.string().required('Ingrese dirección'),
  commune_id: Yup.string().required('Seleccione comuna'),
  region_id: Yup.number().required('Seleccione región'),
  longitude: Yup.string().nullable(),
  latitude: Yup.string().nullable()
})

const AddressUpdate = ({
  open,
  selectClient,
  onClose,
  construction,
  submitFunction,
  successFunction,
  successMessage
}) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [communes, setCommunes] = useState([])
  const { success, changeSuccess } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)

  const { regions } = useSelector((state) => state.common)

  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    validateOnBlur: true,
    validationSchema,
    initialValues: {
      address: construction.address,
      commune_id: construction.commune_id,
      region_id: construction.region_id,
      latitude: parseFloat(construction.latitude),
      longitude: parseFloat(construction.longitude)
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
        formik.setFieldValue('commune_id', '')
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
    if (open) {
      dispatch(commonActions.getRegions())
    }
  }, [open])

  useEffect(() => {
    if (regions.length > 0) {
      setCommunes(
        regions.find((item) => item.id === construction.region_id).communes
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
          >
            Editar dirección
          </Typography>
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
                      onChange={(value) => {
                        formik.setFieldValue('address', value)
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
                Actualizar dirección
              </SubmitButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}
AddressUpdate.defaultProps = {
  selectClient: false,
  successMessage: 'Obra actualizada exitosamente'
}

export default AddressUpdate
