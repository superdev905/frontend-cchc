import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FiUpload } from 'react-icons/fi'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { capitalize } from 'lodash'
import { formatDate } from '../../formatters'
import { Button, InputLabel, SubmitButton, TextField, Select } from '../UI'
import { useSuccess, useToggle } from '../../hooks'
import {
  FilePicker,
  FileThumbnail,
  CurrencyTextField,
  Dialog,
  FileVisor
} from '../Shared'
import filesActions from '../../state/actions/files'

const billedList = ['TRABAJADOR', 'EMPRESA', 'FUNDACIÓN']

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Seleccione fecha'),
  whoBilled: Yup.string().required('Seleccione a quien facturo')
})

const EmployeeTracking = ({
  open,
  onClose,
  data,
  type,
  submitFunction,
  successFunction,
  successMessage
}) => {
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const { enqueueSnackbar } = useSnackbar()
  const [currentDate] = useState(new Date())
  const [uploadFile, setUploadFile] = useState(null)
  const { success, changeSuccess } = useSuccess()
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()

  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema,
    initialValues: {
      date: currentDate,
      whoBilled: type === 'UPDATE' ? data.whoBilled : '',
      ticketNumber: type === 'UPDATE' ? data.ticketNumber : '',
      employeeCredit: type === 'UPDATE' ? data.employeeCredit : '',
      invoiceNumber: type === 'UPDATE' ? data.invoiceNumber : '',
      companyCredit: type === 'UPDATE' ? data.companyCredit : '',
      fileUrl: type === 'UPDATE' ? data.fileUrl : '',
      foundationCredit: type === 'UPDATE' ? data.foundationCredit : ''
    },
    onSubmit: async (values) => {
      formik.setSubmitting(true)
      let resultUpload = null
      if (uploadFile) {
        const formData = new FormData()
        formData.append('file', uploadFile, uploadFile.name)
        resultUpload = await dispatch(
          filesActions.uploadFileToStorage(formData)
        )
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
          {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} seguimiento`}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <Select
              label="A quien facturo"
              name="whoBilled"
              required
              value={formik.values.whoBilled}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.whoBilled && Boolean(formik.errors.whoBilled)
              }
              helperText={formik.touched.whoBilled && formik.errors.whoBilled}
            >
              <option value="">Seleccione estado</option>
              {billedList.map((item) => (
                <option value={item}>{capitalize(item)}</option>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Fecha"
              value={`${formatDate(currentDate)}`}
              inputProps={{ readOnly: true }}
            />
          </Grid>

          {type === 'ADD' && formik.values.whoBilled === 'TRABAJADOR' && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  name="ticketNumber"
                  label="Número de boleta"
                  type="number"
                  required
                  value={formik.values.ticketNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.ticketNumber &&
                    Boolean(formik.errors.ticketNumber)
                  }
                  helperText={
                    formik.touched.ticketNumber && formik.errors.ticketNumber
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <CurrencyTextField
                  label="Abono trabajador"
                  name="employeeCredit"
                  required
                  value={formik.values.employeeCredit}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.employeeCredit &&
                    Boolean(formik.errors.employeeCredit)
                  }
                  helperText={
                    formik.touched.employeeCredit &&
                    formik.errors.employeeCredit
                  }
                />
              </Grid>
            </Grid>
          )}

          {type === 'ADD' && formik.values.whoBilled === 'EMPRESA' && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  name="invoiceNumber"
                  label="Número de factura"
                  required
                  value={formik.values.invoiceNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.invoiceNumber &&
                    Boolean(formik.errors.invoiceNumber)
                  }
                  helperText={
                    formik.touched.invoiceNumber && formik.errors.invoiceNumber
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <CurrencyTextField
                  name="companyCredit"
                  label="Abono empresa"
                  required
                  value={formik.values.companyCredit}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.companyCredit &&
                    Boolean(formik.errors.companyCredit)
                  }
                  helperText={
                    formik.touched.companyCredit && formik.errors.companyCredit
                  }
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <InputLabel style={{ fontSize: '15px', marginBottom: '10px' }}>
                  Documento
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
          )}

          {type === 'ADD' && formik.values.whoBilled === 'FUNDACIÓN' && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CurrencyTextField
                  name="foundationCredit"
                  label="Abono fundación"
                  required
                  value={formik.values.foundationCredit}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.foundationCredit &&
                    Boolean(formik.errors.foundationCredit)
                  }
                  helperText={
                    formik.touched.foundationCredit &&
                    formik.errors.foundationCredit
                  }
                />
              </Grid>
            </Grid>
          )}
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
            type === 'UPDATE' ? 'Actualizar' : 'Crear'
          } Seguimiento`}</SubmitButton>
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

EmployeeTracking.defaultProps = {
  type: 'ADD'
}

export default EmployeeTracking
