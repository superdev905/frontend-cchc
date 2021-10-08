import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography, InputLabel } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { FiUpload } from 'react-icons/fi'
import {
  DatePicker,
  Dialog,
  FilePicker,
  FileThumbnail,
  FileVisor
} from '../../Shared'
import { Button, SubmitButton, TextField } from '../../UI'
import filesAction from '../../../state/actions/files'
import { useSuccess, useToggle } from '../../../hooks'

const validationSchema = Yup.object().shape({
  date: Yup.string().required('Seleccione fecha'),
  fileName: Yup.string().required('Ingrese nombre de documento')
})

const OtherDocuments = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const dispatch = useDispatch()
  const { idCourse } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const [uploading] = useState(false)
  const [uploadFile, setUploadFile] = useState(null)
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  const { isMobile } = useSelector((state) => state.ui)

  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema,
    initialValues: {
      courseId: idCourse,
      date: type === 'UPDATE' ? data.date : '',
      fileName: type === 'UPDATE' ? data.fileName : '',
      fileUrl: type === 'UPDATE' ? data.fileUrl : ''
    },
    onSubmit: async (values) => {
      formik.setSubmitting(true)
      let resultUpload = null
      if (uploadFile) {
        const formData = new FormData()
        formData.append('file', uploadFile, uploadFile.name)
        resultUpload = await dispatch(filesAction.uploadFileToStorage(formData))
      }
      submitFunction({
        ...values,
        fileUrl: resultUpload ? resultUpload.file_url : '',
        fileKey: resultUpload ? resultUpload.file_key : '',
        fileSize: resultUpload ? resultUpload.file_size : '',
        uploadDate: resultUpload ? resultUpload.upload_date : ''
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

  const getValidation = () => {
    if (uploadFile) return true
    return false
  }

  useEffect(() => {
    if (open) {
      formik.resetForm()
      setUploadFile(null)
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${type === 'UPDATE' ? 'Actualizar' : 'Agregar'} nuevo documento`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <DatePicker
                required
                label="Fecha"
                value={formik.values.date}
                helperText={formik.touched.date && formik.errors.date}
                error={formik.touched.date && Boolean(formik.errors.date)}
                onChange={(date) => {
                  formik.setFieldTouched('date')
                  formik.setFieldValue('date', date)
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Nombre de documento"
                name="fileName"
                value={formik.values.fileName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fileName && Boolean(formik.errors.fileName)
                }
                helperText={formik.touched.fileName && formik.errors.fileName}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <InputLabel style={{ fontSize: '15px', marginBottom: '10px' }}>
                Archivo
              </InputLabel>
              {formik.values.fileUrl && type === 'UPDATE' ? (
                <Box>
                  <FileThumbnail
                    fileName={formik.values.fileUrl}
                    onView={() => {
                      toggleOpenVisor()
                    }}
                    onDelete={() => {
                      formik.setFieldValue('fileUrl', '')
                    }}
                  />
                </Box>
              ) : (
                <>
                  <FilePicker
                    acceptedFiles={['.pdf']}
                    onChange={(e) => {
                      setUploadFile(e)
                    }}
                    icon={<FiUpload fontSize="24px" />}
                  />
                </>
              )}
            </Grid>
          </Grid>
          {uploading && (
            <Alert severity="warning">
              Espera a que al archivo se suba para{' '}
              {type === 'UPDATE' ? 'actualizar' : 'crear'} documento
            </Alert>
          )}

          <Box textAlign="center" marginTop="10px">
            <Button onClick={onClose} variant="outlined">
              Cancelar
            </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              success={success}
              disabled={!formik.isValid || !getValidation() || uploading}
              loading={formik.isSubmitting}
            >
              {`${
                type === 'UPDATE' ? 'Actualizar' : 'Agregar'
              } nuevo documento`}
            </SubmitButton>
          </Box>
        </Box>
        {type === 'UPDATE' && formik.values.fileUrl && openVisor && (
          <FileVisor
            open={openVisor}
            onClose={toggleOpenVisor}
            src={formik.values.fileUrl}
          />
        )}
      </Box>
    </Dialog>
  )
}

OtherDocuments.defaultProps = {
  type: 'CREATE'
}

export default OtherDocuments
