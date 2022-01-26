import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography, InputLabel, TextField } from '@material-ui/core'
import { Alert, Autocomplete } from '@material-ui/lab'
import {
  DatePicker,
  Dialog,
  FilePicker,
  FileThumbnail,
  FileVisor
} from '../Shared'
import { Button, Select, SubmitButton } from '../UI'
import commonActions from '../../state/actions/common'
import filesAction from '../../state/actions/files'
import { useSuccess, useToggle } from '../../hooks'
import { decisionList } from '../../config'

const validationSchema = Yup.object().shape({
  specialty_id: Yup.number().required('Seleccione especialidad'),
  specialty_detail_id: Yup.number().required('Seleccione especialidad'),
  is_self_taught: Yup.string().required('Seleccione opción'),
  certifying_entity_id: Yup.number().nullable(),
  is_certificated: Yup.string().required('Seleccion opción')
})

const certificationDateRequired = Yup.object().shape({
  certificated_date: Yup.date().required('Seleccione fecha')
})
const certificationDateNotRequired = Yup.object().shape({
  certificated_date: Yup.date().notRequired().nullable()
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
  const [uploading, setUploading] = useState(false)
  const [uploadFile, setUploadFile] = useState(null)
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  const [isCertified, setIsCertified] = useState(
    type === 'UPDATE' ? data.is_certificated === 'SI' : false
  )
  const [subSpec, setSubSpec] = useState([])
  const [certificationFile, setCertificationFile] = useState(
    type === 'UPDATE' ? data.certification_file : null
  )
  const { isMobile } = useSelector((state) => state.ui)
  const { specList, entities } = useSelector((state) => state.common)

  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: isCertified
      ? validationSchema.concat(certificationDateRequired)
      : validationSchema.concat(certificationDateNotRequired),
    initialValues: {
      specialty_id: type === 'UPDATE' ? data.specialty_id : '',
      specialty_detail_id: type === 'UPDATE' ? data.specialty_detail_id : '',
      is_self_taught: type === 'UPDATE' ? data.is_self_taught : '',
      certifying_entity_id: type === 'UPDATE' ? data.certifying_entity_id : '',
      is_certificated: type === 'UPDATE' ? data.is_certificated : '',
      certificated_date: type === 'UPDATE' ? data.certificated_date : '',
      certification_url: type === 'UPDATE' ? data.certification_url : ''
    },
    onSubmit: async (values, { resetForm }) => {
      formik.setSubmitting(true)
      let resultUpload = null
      let certification_file = null
      if (uploadFile) {
        const formData = new FormData()
        formData.append('file', uploadFile, uploadFile.name)
        resultUpload = await dispatch(filesAction.uploadFileToStorage(formData))
        certification_file = {
          fileKey: resultUpload.file_key,
          fileUrl: resultUpload.file_url,
          fileSize: resultUpload.file_size,
          fileName: resultUpload.file_name,
          uploadDate: resultUpload.upload_date,
          sourceSystem: 'TRABAJADORES'
        }
      }

      submitFunction({
        ...values,
        certification_file,
        file_key: resultUpload ? resultUpload.file_key : '',
        certifying_entity_id: values.certifying_entity_id || null
      })
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })
          if (successFunction) {
            successFunction()
          }
          changeSuccess(true, () => {
            onClose()
            resetForm()
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

  const onSpecialtySelect = (__, value) => {
    if (value) {
      formik.setFieldValue('specialty_id', value.id)
    }
  }

  const onSubSpecialtySelect = (__, value) => {
    if (value) {
      formik.setFieldValue('specialty_detail_id', value.id)
    }
  }

  useEffect(() => {
    if (formik.values.is_certificated === 'NO') {
      setIsCertified(false)
      formik.setFieldTouched('certificated_date', null)
      formik.setFieldTouched('certifying_entity_id', null)
    } else {
      setIsCertified(true)
    }
  }, [formik.values.is_certificated, isCertified])

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
      setUploading(false)
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
              <Autocomplete
                options={specList}
                value={
                  specList[
                    specList.findIndex(
                      (item) => item.id === formik.values.specialty_id
                    )
                  ] || ''
                }
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.description}
                onChange={onSpecialtySelect}
                required
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Especialidad *"
                    placeholder="SELECCIONE ESPECIALIDAD"
                    error={
                      formik.touched.specialty_id &&
                      Boolean(formik.errors.specialty_id)
                    }
                    helperText={
                      formik.touched.specialty_id && formik.errors.specialty_id
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={subSpec}
                value={
                  subSpec[
                    subSpec.findIndex(
                      (item) => item.id === formik.values.specialty_detail_id
                    )
                  ] || ''
                }
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.description}
                onChange={onSubSpecialtySelect}
                required
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Detalle de Especialidad *"
                    placeholder="SELECCIONE OPCIÓN"
                    error={
                      formik.touched.specialty_detail_id &&
                      Boolean(formik.errors.specialty_detail_id)
                    }
                    helperText={
                      formik.touched.specialty_detail_id &&
                      formik.errors.specialty_detail_id
                    }
                  />
                )}
              />
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
                <option value="">SELECCIONE OPCIÓN</option>
                {decisionList.map((item, index) => (
                  <option key={`is_self_taught-${index}`} value={`${item}`}>
                    {`${item}`}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                required
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
                <option value="">SELECCIONE OPCIÓN</option>
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
                <option value="">SELECCIONE OPCIÓN</option>
                {entities.map((item, index) => (
                  <option key={`entity--${index}`} value={`${item.id}`}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                required={isCertified}
                disabled={!isCertified}
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
              {certificationFile && type === 'UPDATE' ? (
                <Box>
                  <FileThumbnail
                    fileName={certificationFile.file_name}
                    onView={() => {
                      toggleOpenVisor()
                    }}
                    onDelete={() => {
                      setCertificationFile(null)
                    }}
                  />
                </Box>
              ) : (
                <>
                  <FilePicker
                    onChange={(e) => {
                      setUploadFile(e)
                    }}
                  />
                </>
              )}
            </Grid>
          </Grid>
          {uploading && (
            <Alert severity="warning">
              Espera a que al archivo se suba para{' '}
              {type === 'UPDATE' ? 'actualizar' : 'crear'} la especialidad
            </Alert>
          )}

          <Box textAlign="center" marginTop="10px">
            <Button onClick={onClose} variant="outlined">
              Cancelar
            </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              success={success}
              disabled={!formik.isValid || formik.isSubmitting || uploading}
              loading={formik.isSubmitting}
            >
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} datos`}
            </SubmitButton>
          </Box>
        </Box>
        {type === 'UPDATE' && certificationFile && openVisor && (
          <FileVisor
            open={openVisor}
            onClose={toggleOpenVisor}
            src={certificationFile.file_url}
            filename={certificationFile.file_name}
          />
        )}
      </Box>
    </Dialog>
  )
}

HousingForm.defaultProps = {
  type: 'CREATE'
}

export default HousingForm
