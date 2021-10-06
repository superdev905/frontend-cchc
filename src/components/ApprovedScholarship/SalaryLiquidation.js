import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid, InputLabel, Typography } from '@material-ui/core'
import { Dialog, FilePicker, FileThumbnail, FileVisor } from '../Shared'
import { Button, SubmitButton, TextArea } from '../UI'
import { useSuccess, useToggle } from '../../hooks'
import filesActions from '../../state/actions/files'

const validationSchema = Yup.object().shape({
  comments: Yup.string().required('Ingrese comentarios')
})

const SalaryLiquidation = ({
  open,
  onClose,
  data,
  type,
  submitFunction,
  successFunction,
  successMessage
}) => {
  const dispatch = useDispatch()
  const [currentDate] = useState(new Date())
  const [uploadFile, setUploadFile] = useState(null)
  const { idApproved } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const { isMobile } = useSelector((state) => state.ui)
  const { success, changeSuccess } = useSuccess()
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()

  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    initialValues: {
      date: currentDate,
      approvedScholarshipId: idApproved,
      comments: type === 'UPDATE' ? data.comments : '',
      fileUrl: type === 'UPDATE' ? data.fileUrl : ''
    },
    onSubmit: async (values, { resetForm }) => {
      formik.setSubmitting(true)
      let resultUpload = null
      if (uploadFile) {
        const formData = new FormData()
        formData.append('file', uploadFile, uploadFile.name, idApproved)
        resultUpload = await dispatch(
          filesActions.uploadFileToStorage(formData, idApproved)
        )
      }
      submitFunction({
        ...values,
        fileName: resultUpload ? resultUpload.file_name : '',
        fileKey: resultUpload ? resultUpload.file_key : '',
        fileSize: resultUpload ? resultUpload.file_size : '',
        fileUrl: resultUpload ? resultUpload.file_url : '',
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
  const handleClose = () => {
    formik.resetForm()
    onClose()
  }

  useEffect(() => {
    if (open) {
      formik.resetForm()
    }
  }, [open])

  const deleteFile = (key) => {
    dispatch(
      filesActions.deleteFile(key, {
        state: 'DELETED'
      })
    )
    formik.setFieldValue('fileUrl', '')
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Box p={2}>
        <Typography
          align="center"
          style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}
        >
          Liquidación de sueldo
        </Typography>

        <Grid container spacing={2}>
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
                  onDelete={(key) => deleteFile(key)}
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
          <Grid item xs={12}>
            <TextArea
              name="comments"
              label="Comentarios"
              value={formik.values.comments}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.comments && Boolean(formik.errors.comments)}
              helperText={formik.touched.comments && formik.errors.comments}
            />
          </Grid>
        </Grid>
        <Box textAlign="center">
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <SubmitButton
            loading={formik.isSubmitting}
            onClick={formik.handleSubmit}
            disabled={!formik.isValid}
            success={success}
          >{`${
            type === 'UPDATE' ? 'Actualizar' : 'Agregar'
          } liquidación de sueldo`}</SubmitButton>
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

SalaryLiquidation.defaultProps = {
  type: 'ADD'
}

export default SalaryLiquidation
