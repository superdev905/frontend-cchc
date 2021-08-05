import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography, InputLabel } from '@material-ui/core'
import { DatePicker, Dialog, FileUploader } from '../Shared'
import { Button, Select, SubmitButton } from '../UI'
import commonActions from '../../state/actions/common'
import { useSuccess } from '../../hooks'
import { decisionList } from '../../config'

const validationSchema = Yup.object().shape({
  specialty_id: Yup.number().required('Seleccione especialidad'),
  specialty_detail_id: Yup.number().required('Seleccione especialidad'),
  is_self_taught: Yup.string().required('Seleccione opción'),
  certifying_entity_id: Yup.number(),
  is_certificated: Yup.string(),
  certificated_date: Yup.date().required('Seleccione fecha')
})

const HousingForm = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const dispatch = useDispatch()

  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const [subSpec, setSubSpec] = useState([])
  const { isMobile } = useSelector((state) => state.ui)
  const { specList, entities } = useSelector((state) => state.common)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      specialty_id: type === 'UPDATE' ? data.specialty_id : '',
      specialty_detail_id: type === 'UPDATE' ? data.specialty_detail_id : '',
      is_self_taught: type === 'UPDATE' ? data.is_self_taught : '',
      certifying_entity_id: type === 'UPDATE' ? data.certifying_entity_id : '',
      is_certificated: type === 'UPDATE' ? data.is_certificated : '',
      certificated_date: type === 'UPDATE' ? data.certificated_date : '',
      certification_url: type === 'UPDATE' ? data.certification_url : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({
        ...values,
        certifying_entity_id: values.certifying_entity_id || null
      })
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })
          onClose()
          resetForm()
          changeSuccess(true)
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

  useEffect(() => {
    if (formik.values.is_certificated === 'NO') {
      formik.setFieldTouched('certifying_entity_id', '')
    }
  }, [formik.values.is_certificated])

  useEffect(() => {
    if (formik.values.specialty_id && specList.length > 0) {
      setSubSpec(
        specList.find(
          (item) => item.id === parseInt(formik.values.specialty_id, 10)
        ).sub_specialties || []
      )
    } else {
      setSubSpec([])
    }
  }, [formik.values.specialty_id, specList])

  useEffect(() => {
    if (open) {
      dispatch(commonActions.getEntities())
      dispatch(commonActions.getSpecList())
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} especialización`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Select
                label="Especialidad"
                required
                name="specialty_id"
                onChange={formik.handleChange}
                value={formik.values.specialty_id}
                required
                error={
                  formik.touched.specialty_id &&
                  Boolean(formik.errors.specialty_id)
                }
                helperText={
                  formik.touched.specialty_id && formik.errors.specialty_id
                }
              >
                <option value="">Seleccione una opción</option>
                {specList.map((item, index) => (
                  <option key={`specialty_id--${index}`} value={`${item.id}`}>
                    {`${item.description}`}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Detalle de Especialidad"
                required
                name="specialty_detail_id"
                onChange={formik.handleChange}
                value={formik.values.specialty_detail_id}
                required
                error={
                  formik.touched.specialty_detail_id &&
                  Boolean(formik.errors.specialty_detail_id)
                }
                helperText={
                  formik.touched.specialty_detail_id &&
                  formik.errors.specialty_detail_id
                }
              >
                <option value="">Seleccione una opción</option>
                {subSpec.map((item, index) => (
                  <option
                    key={`specialty_detail--${index}`}
                    value={`${item.id}`}
                  >
                    {`${item.description}`}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Autodidacta"
                required
                name="is_self_taught"
                onChange={formik.handleChange}
                value={formik.values.is_self_taught}
                required
                error={
                  formik.touched.is_self_taught &&
                  Boolean(formik.errors.is_self_taught)
                }
                helperText={
                  formik.touched.is_self_taught && formik.errors.is_self_taught
                }
              >
                <option value="">Seleccione una opción</option>
                {decisionList.map((item, index) => (
                  <option key={`is_self_taught-${index}`} value={`${item}`}>
                    {`${item}`}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Certificado"
                name="is_certificated"
                onChange={formik.handleChange}
                value={formik.values.is_certificated}
                error={
                  formik.touched.is_certificated &&
                  Boolean(formik.errors.is_certificated)
                }
                helperText={
                  formik.touched.is_certificated &&
                  formik.errors.is_certificated
                }
              >
                <option value="">Seleccione una opción</option>
                {decisionList.map((item, index) => (
                  <option key={`is_certificated-${index}`} value={`${item}`}>
                    {`${item}`}
                  </option>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <Select
                label="Entidad que valida"
                name="certifying_entity_id"
                onChange={formik.handleChange}
                value={formik.values.certifying_entity_id}
                error={
                  formik.touched.certifying_entity_id &&
                  Boolean(formik.errors.certifying_entity_id)
                }
                helperText={
                  formik.touched.certifying_entity_id &&
                  formik.errors.certifying_entity_id
                }
                disabled={formik.values.is_certificated !== 'SI'}
              >
                <option value="">Seleccione una opción</option>
                {entities.map((item, index) => (
                  <option key={`entity--${index}`} value={`${item.id}`}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                required
                label="Fecha de certificación"
                value={formik.values.certificated_date}
                helperText={
                  formik.touched.certificated_date &&
                  formik.errors.certificated_date
                }
                error={
                  formik.touched.certificated_date &&
                  Boolean(formik.errors.certificated_date)
                }
                onChange={(date) => {
                  formik.setFieldTouched('certificated_date')
                  formik.setFieldValue('certificated_date', date)
                }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <InputLabel style={{ fontSize: '15px', marginBottom: '10px' }}>
                Certificado
              </InputLabel>
              <FileUploader
                onSuccess={(url) => {
                  formik.setFieldValue('certification_url', url)
                }}
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
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} datos`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

HousingForm.defaultProps = {
  type: 'CREATE'
}

export default HousingForm
