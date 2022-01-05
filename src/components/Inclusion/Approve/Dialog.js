import { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux'
import filesActions from '../../../state/actions/files'
import { Dialog, FilePicker } from '../../Shared'
import { Button, SubmitButton, TextArea, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'

const validationSchema = Yup.object().shape({
  comments: Yup.string().required('Ingrese comentarios'),
  analystId: Yup.number().required('Analista de casos requeridos')
})

const ApproveDialog = ({ open, onClose, submitFunction }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)
  const { user } = useSelector((state) => state.auth)
  const [attachments, setAttachments] = useState([
    { index: 1, attachment: null, attachmentName: '' }
  ])

  const uploadAttachments = async (files) => {
    const uploadedList = []
    await Promise.all(
      files.map(async (element) => {
        const formData = new FormData()
        formData.append('file', element.attachment)
        const response = await dispatch(filesActions.uploadFile(formData))
        uploadedList.push({
          fileName: response.file_name,
          fileKey: response.file_key,
          fileUrl: response.file_url,
          fileSize: response.file_size,
          uploadDate: response.upload_date,
          attachmentName: element.attachmentName
        })
      })
    )
    return uploadedList
  }

  const formik = useFormik({
    validationSchema,
    initialValues: {
      comments: '',
      analystId: user?.id
    },
    onSubmit: async (values) => {
      const uploadFiles = await uploadAttachments(attachments)
      submitFunction({ ...values, attachments: uploadFiles })
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            enqueueSnackbar('Caso de inclusión aprobada', {
              variant: 'success'
            })
            onClose()
          })
        })
        .catch((err) => {
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })

  const onAddAttachment = () => {
    const updatedList = [...attachments]
    updatedList.push({ index: updatedList.length + 1, attachment: null })
    setAttachments(updatedList)
  }
  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMobile} fullWidth>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          Aprobar caso de inclusión
        </Typography>
        <Box mt={2}>
          <Alert severity="info">Adjunte los archivos para la aprobación</Alert>
          <Box mt={1}>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography>
                <strong>Archivos</strong>
              </Typography>
              <Button onClick={onAddAttachment}>Agregar archivo</Button>
            </Box>
            <Grid container spacing={2}>
              {attachments.map((item) => (
                <Grid key={`attachment-${item.index}`} item xs={12}>
                  <TextField
                    required
                    value={item.attachmentName}
                    label={'Nombre de archivo'}
                    onChange={(e) => {
                      const updatedList = attachments.map((attach) =>
                        attach.index === item.index
                          ? { ...attach, attachmentName: e.target.value }
                          : attach
                      )
                      setAttachments(updatedList)
                    }}
                  />
                  <FilePicker
                    id={`attachment-picker-${item.index}`}
                    onChange={(file) => {
                      const updatedList = attachments.map((attach) =>
                        attach.index === item.index
                          ? { ...attach, attachment: file }
                          : attach
                      )
                      setAttachments(updatedList)
                    }}
                    onDelete={() => {
                      const updatedList = attachments.map((attach) =>
                        attach.index === item.index
                          ? { ...attach, attachment: null }
                          : attach
                      )
                      setAttachments(updatedList)
                    }}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <TextField
                  label={'Analista de casos'}
                  inputProps={{ readOnly: true }}
                  value={`${user.names} ${user.paternal_surname} ${user.maternal_surname}`}
                />
              </Grid>
              <Grid item xs={12}>
                <TextArea
                  required
                  label={'Comentarios'}
                  name="comments"
                  value={formik.values.comments}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.comments && Boolean(formik.errors.comments)
                  }
                  helperText={formik.touched.comments && formik.errors.comments}
                />
              </Grid>
            </Grid>
            <Box textAlign={'center'}>
              <Button variant={'outlined'}>Cancelar</Button>
              <SubmitButton
                success={success}
                disabled={!formik.isValid}
                loading={formik.isSubmitting}
                onClick={formik.handleSubmit}
              >
                Aprobar caso
              </SubmitButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default ApproveDialog
