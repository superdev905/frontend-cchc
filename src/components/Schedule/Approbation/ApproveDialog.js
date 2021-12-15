import { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import filesAction from '../../../state/actions/files'
import { DatePicker, Dialog, FilePicker, FileThumbnail } from '../../Shared'
import { Button, InputLabel, Select, SubmitButton, TextArea } from '../../UI'
import { decisionList } from '../../../config'
import { useSuccess } from '../../../hooks'

const validationSchema = Yup.object().shape({
  date: Yup.date().nullable().required('Seleccione fecha'),
  status: Yup.string().required('Seleccione estado'),
  modality: Yup.string().required('Seleccione estado'),
  observation: Yup.string().required('Ingrese comentarios')
})

const ApproveDialog = ({
  open,
  onClose,
  data,
  submitFunction,
  successMessage
}) => {
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const { success } = useSuccess()
  const [uploadAttachment, setUploadAttachment] = useState(
    data?.attachment || null
  )
  const [file, setFile] = useState(null)
  const { enqueueSnackbar } = useSnackbar()
  const formik = useFormik({
    validateOnMount: true,
    validateOnChange: true,
    validationSchema,
    initialValues: {
      date: data ? new Date(data.date) : null,
      status: data ? data.status : '',
      modality: data ? data.modality : '',
      observation: data ? data.observation : ''
    },
    onSubmit: async (values) => {
      const formattedValues = { ...values }
      let attachment = null
      if (file) {
        const formData = new FormData()
        formData.append('file', file, file.name)
        const resultUpload = await dispatch(
          filesAction.uploadFileToStorage(formData)
        )
        attachment = {
          fileKey: resultUpload.file_key,
          fileUrl: resultUpload.file_url,
          fileSize: resultUpload.file_size,
          fileName: resultUpload.file_name,
          uploadDate: resultUpload.upload_date
        }
      }
      if (attachment) {
        formattedValues.attachment = attachment
      }

      submitFunction(formattedValues)
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, { variant: 'success' })
          onClose()
        })
        .catch((err) => {
          formik.setSubmitting(false)

          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })
  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMobile} fullWidth>
      <Box>
        <Box mb={1}>
          <Typography
            align="center"
            variant="h6"
            style={{ fontWeight: 'bold' }}
          >
            Aprobación
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Select
                required
                name="status"
                label="Estado"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
              >
                <option value="">Seleccione estado</option>
                {decisionList.map((item) => (
                  <option key={`option-status-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                required
                label="Fecha"
                value={formik.values.date}
                onChange={(targetDate) => {
                  formik.setFieldValue('date', targetDate)
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Select
                required
                name="modality"
                label="Modalidad"
                value={formik.values.modality}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.modality && Boolean(formik.errors.modality)
                }
                helperText={formik.touched.modality && formik.errors.modality}
              >
                <option value="">Seleccione estado</option>
                {['ONLINE', 'PRESENCIAL'].map((item) => (
                  <option key={`option-modality-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12}>
              <TextArea
                required
                name="observation"
                label="Observación"
                value={formik.values.observation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.observation &&
                  Boolean(formik.errors.observation)
                }
                helperText={
                  formik.touched.observation && formik.errors.observation
                }
                maxLength={800}
              />
            </Grid>
            <Grid item xs={12}>
              {uploadAttachment ? (
                <>
                  <FileThumbnail
                    fileName={uploadAttachment?.fileName}
                    onDelete={() => {
                      setUploadAttachment(null)
                    }}
                  />
                </>
              ) : (
                <>
                  <InputLabel>Archivo adjunto</InputLabel>
                  <FilePicker
                    value={file}
                    onChange={(e) => {
                      setFile(e)
                    }}
                    onDelete={() => {
                      setFile(null)
                    }}
                  />
                </>
              )}
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              disabled={!formik.isValid || formik.isSubmitting}
              loading={formik.isSubmitting}
              success={success}
            >
              Guardar
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}
ApproveDialog.propTypes = {}

export default ApproveDialog
