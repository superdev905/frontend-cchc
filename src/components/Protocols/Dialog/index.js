import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Autocomplete } from '@material-ui/lab'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSuccess, useToggle } from '../../../hooks'
import filesActions from '../../../state/actions/files'
import protocolsActions from '../../../state/actions/protocols'
import { moduleConfig } from '../../../config'
import { Button, InputLabel, Select, SubmitButton, TextField } from '../../UI'
import {
  Dialog,
  DatePicker,
  FilePicker,
  FileThumbnail,
  FileVisor
} from '../../Shared'

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Ingrese nombre de protocolo'),
  classificationId: Yup.number().required('Seleccione clasificación'),
  areaId: Yup.number().required('Seleccione area'),
  startDate: Yup.date().required('Seleccione fecha de inicio').nullable(),
  endDate: Yup.date().required('Seleccione fecha de fin').nullable(),
  modules: Yup.array()
    .of(Yup.string().required('Seleccione módulo'))
    .min(1, 'Selecciona un al menos un módulo')
    .required('Seleccione obra'),
  file: Yup.mixed().required('Seleccione archivo').nullable()
})

const CreateProtocol = ({
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
  const { isMobile } = useSelector((state) => state.ui)
  const { areas, classifications } = useSelector((state) => state.protocols)
  const { success, changeSuccess } = useSuccess()
  const [protocolFile, setProtocolFile] = useState(
    type === 'UPDATE' ? data.file : null
  )
  const [uploadFile, setUploadFile] = useState(null)
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()

  const formik = useFormik({
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    initialValues: {
      title: type === 'UPDATE' ? data.title : '',
      startDate: type === 'UPDATE' ? data.startDate : null,
      endDate: type === 'UPDATE' ? data.endDate : null,
      classificationId: type === 'UPDATE' ? data.classificationId : '',
      areaId: type === 'UPDATE' ? data.areaId : '',
      modules:
        type === 'UPDATE' ? data.modules.map((item) => item.module.name) : [],
      file: type === 'UPDATE' ? data.file : null
    },
    onSubmit: async (values) => {
      let file = protocolFile
      console.log(values)
      if (uploadFile) {
        const formData = new FormData()
        formData.append('file', uploadFile, uploadFile.name)
        const resultUpload = await dispatch(
          filesActions.uploadFileToStorage(formData)
        )
        file = {
          fileKey: resultUpload.file_key,
          fileUrl: resultUpload.file_url,
          fileSize: resultUpload.file_size,
          fileName: resultUpload.file_name,
          uploadDate: resultUpload.upload_date
        }
      }

      submitFunction({ ...values, file })
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, { variant: 'success' })
          changeSuccess(true, () => {
            onClose()
            if (successFunction) {
              successFunction()
            }
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })

  useEffect(() => {
    if (open) {
      dispatch(protocolsActions.getClassifications())
      dispatch(protocolsActions.getAreas())
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Box>
        <Typography
          align="center"
          style={{
            fontSize: '20px',
            marginBottom: '15px',
            fontWeight: 'bold'
          }}
        >{`${type === 'CREATE' ? 'Nuevo' : 'Editar'} protocolo`}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              label="Titulo"
              name="title"
              value={formik.values.title}
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Select
              label="Clasificación"
              name="classificationId"
              required
              value={formik.values.classificationId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.classificationId &&
                Boolean(formik.errors.classificationId)
              }
              helperText={
                formik.touched.classificationId &&
                formik.errors.classificationId
              }
            >
              <option value="">SELECCIONE AREA</option>
              {classifications.map((item) => (
                <option
                  key={`classification-option-${item.id}`}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={12}>
            <Select
              label="Área"
              name="areaId"
              required
              value={formik.values.areaId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.areaId && Boolean(formik.errors.areaId)}
              helperText={formik.touched.areaId && formik.errors.areaId}
            >
              <option value="">SELECCIONE AREA</option>
              {areas.map((item) => (
                <option key={`area-option-${item.id}`} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Fecha de inicio"
              required
              disabledFuture={false}
              value={formik.values.startDate}
              onChange={(date) => {
                formik.setFieldValue('startDate', date)
                formik.setFieldValue('endDate', null)
                setTimeout(() => {
                  formik.setFieldTouched('startDate')
                  formik.setFieldTouched('endDate')
                }, 500)
              }}
              error={
                formik.touched.startDate && Boolean(formik.errors.startDate)
              }
              helperText={formik.touched.startDate && formik.errors.startDate}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Fecha de fin"
              disabledPast
              disabledFuture={false}
              minDate={formik.values.startDate}
              value={formik.values.endDate}
              onChange={(date) => {
                formik.setFieldValue('endDate', date)
              }}
              required
              error={formik.touched.endDate && Boolean(formik.errors.endDate)}
              helperText={formik.touched.endDate && formik.errors.endDate}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Autocomplete
              multiple
              id="modules"
              options={moduleConfig.modulesList}
              defaultValue={formik.values.modules}
              onChange={(__, values) => {
                formik.setFieldValue('modules', values)
              }}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Módulos"
                  required
                  placeholder="Módulo"
                  error={
                    formik.touched.modules && Boolean(formik.errors.modules)
                  }
                  helperText={formik.touched.modules && formik.errors.modules}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel required>Archivo</InputLabel>
            <Box>
              {protocolFile && type === 'UPDATE' ? (
                <FileThumbnail
                  fileName={protocolFile.fileName}
                  onDelete={() => {
                    formik.setFieldValue('file', null)
                    setProtocolFile(null)
                  }}
                  onView={toggleOpenVisor}
                />
              ) : (
                <FilePicker
                  acceptedFiles={['.pdf']}
                  onChange={(file) => {
                    setUploadFile(file)
                    formik.setFieldValue('file', file)
                  }}
                  onDelete={() => {
                    setUploadFile('file', null)
                    formik.setFieldValue('file', null)
                  }}
                />
              )}
            </Box>
          </Grid>
        </Grid>
        <Box mt={3} textAlign="center">
          <Button variant={'outlined'} onClick={onClose}>
            Cancelar
          </Button>
          <SubmitButton
            onClick={formik.handleSubmit}
            loading={formik.isSubmitting}
            disabled={!formik.isValid}
            success={success}
          >
            {type === 'UPDATE' ? 'Actualizar' : 'Crear'}
          </SubmitButton>
        </Box>
      </Box>
      {type === 'UPDATE' && protocolFile && openVisor && (
        <FileVisor
          open={openVisor}
          onClose={toggleOpenVisor}
          src={protocolFile.fileUrl}
          filename={protocolFile.fileName}
        />
      )}
    </Dialog>
  )
}

CreateProtocol.defaultProps = {
  type: 'CREATE',
  successMessage: 'Protocolo creado!'
}

export default CreateProtocol
