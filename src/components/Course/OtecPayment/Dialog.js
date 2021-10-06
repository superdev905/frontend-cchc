import { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { FiUpload } from 'react-icons/fi'
import { formatDate } from '../../../formatters'
import { Dialog, FilePicker } from '../../Shared'
import { Button, SubmitButton, TextField } from '../../UI'
import files from '../../../state/actions/files'
import { useSuccess } from '../../../hooks'

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Ingrese fecha'),
  invoiceNumber: Yup.string().required('Ingrese Numero de factura'),
  ocNumber: Yup.string().required('Ingrese Numero de factura')
})

const PaymentDialog = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successFunction,
  successMessage
}) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [currentDate] = useState(new Date())
  const [invoiceFile, setInvoiceFile] = useState(null)
  const [orderFile, setOrderFile] = useState(null)
  const [agreementFile, setAgreementFile] = useState(null)
  const { isMobile } = useSelector((state) => state.ui)
  const { success, changeSuccess } = useSuccess()

  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file, file.name)
    const result = await dispatch(files.uploadFileToStorage(formData))
    return {
      fileKey: result.file_key,
      fileName: result.file_name,
      fileSize: result.file_size,
      fileUrl: result.file_url,
      uploadDate: result.upload_date
    }
  }

  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      date: type === 'VIEW' ? new Date(data.date) : currentDate,
      invoiceNumber: type === 'VIEW' ? data.invoiceNumber : '',
      ocNumber: type === 'VIEW' ? data.ocNumber : ''
    },
    onSubmit: async (values) => {
      const invoiceUpload = await uploadFile(invoiceFile)
      const orderUpload = await uploadFile(invoiceFile)
      const agreementUpload = await uploadFile(invoiceFile)

      const form = {
        ...values,
        invoiceFile: invoiceUpload,
        ocFile: orderUpload,
        agreementFile: agreementUpload
      }
      submitFunction(form)
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            successFunction()
            enqueueSnackbar(successMessage, { variant: 'success' })
            onClose()
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })

  const getValidStatus = () => {
    if (invoiceFile && orderFile && agreementFile) return true

    return false
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      fullScreen={isMobile}
    >
      <Box>
        <Box>
          <Typography align="center" style={{ marginBottom: '15px' }}>
            Registrar pago OTEC
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} m={6} lg={4}>
            <TextField value={formatDate(currentDate)} label="Fecha" />
          </Grid>
          <Grid item xs={12} m={6} lg={4}>
            <TextField
              label="Número de factura"
              name="invoiceNumber"
              value={formik.values.invoiceNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.invoiceNumber &&
                Boolean(formik.errors.invoiceNumber)
              }
              helperText={
                formik.touched.invoiceNumber && formik.errors.invoiceNumber
              }
              inputProps={{ maxLength: 5 }}
            />
          </Grid>
          <Grid item xs={12} m={6} lg={4}>
            <TextField
              label="Número OC"
              name="ocNumber"
              value={formik.values.ocNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.ocNumber && Boolean(formik.errors.ocNumber)}
              helperText={formik.touched.ocNumber && formik.errors.ocNumber}
              inputProps={{ maxLength: 5 }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} m={6} lg={4}>
            <Typography>Adjunto de factura</Typography>
            <FilePicker
              id="invoice-file-picker"
              acceptedFiles={['.pdf']}
              onChange={(e) => {
                setInvoiceFile(e)
              }}
              icon={<FiUpload fontSize="24px" />}
            />
          </Grid>
          <Grid item xs={12} m={6} lg={4}>
            <Typography>Adjunto de OC</Typography>
            <FilePicker
              id="oc-file-picker"
              acceptedFiles={['.pdf']}
              onChange={(e) => {
                setOrderFile(e)
              }}
              icon={<FiUpload fontSize="24px" />}
            />
          </Grid>
          <Grid item xs={12} m={6} lg={4}>
            <Typography>Convenio</Typography>
            <FilePicker
              id="agreement-file-picker"
              acceptedFiles={['.pdf']}
              onChange={(e) => {
                setAgreementFile(e)
              }}
              icon={<FiUpload fontSize="24px" />}
            />
          </Grid>
        </Grid>
        <Box p={2} textAlign="center">
          <Button variant="outlined">Cancelar</Button>
          <SubmitButton
            loading={formik.isSubmitting}
            onClick={formik.handleSubmit}
            success={success}
            disabled={!formik.isValid || !getValidStatus()}
          >
            Guardar
          </SubmitButton>
        </Box>
      </Box>
    </Dialog>
  )
}

export default PaymentDialog
