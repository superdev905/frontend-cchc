import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FiUpload } from 'react-icons/fi'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { capitalize } from 'lodash'
import { Button, InputLabel, SubmitButton, TextField, Select } from '../UI'
import { useSuccess, useToggle } from '../../hooks'
import {
  FilePicker,
  FileThumbnail,
  CurrencyTextField,
  Dialog,
  FileVisor,
  DatePicker
} from '../Shared'
import filesActions from '../../state/actions/files'

const billedList = ['TRABAJADOR', 'EMPRESA', 'FUNDACIÓN']

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Seleccione fecha'),
  billedTarget: Yup.string().required('Seleccione a quien facturó')
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

  const clearValues = (form) => {
    if (form.billedTarget === 'EMPRESA') {
      delete form.paymentEmployee
      delete form.paymentFundation
      return form
    }
    if (form.billedTarget === 'TRABAJADOR') {
      delete form.paymentBusiness
      delete form.paymentFundation
      return form
    }
    delete form.paymentBusiness
    delete form.paymentEmployee

    return form
  }

  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validationSchema,
    initialValues: {
      date: currentDate,
      billedTarget: type === 'UPDATE' ? data.billedTarget : '',
      ticketNumber: type === 'UPDATE' ? data.ticketNumber : '',
      paymentEmployee: type === 'UPDATE' ? data.paymentEmployee : '',
      invoiceNumber: type === 'UPDATE' ? data.invoiceNumber : '',
      paymentBusiness: type === 'UPDATE' ? data.paymentBusiness : '',
      paymentFundation: type === 'UPDATE' ? data.paymentFundation : ''
    },
    onSubmit: async (values) => {
      formik.setSubmitting(true)
      let resultUpload = null

      if (uploadFile && values.billedTarget === 'EMPRESA') {
        const formData = new FormData()
        formData.append('file', uploadFile, uploadFile.name)
        resultUpload = await dispatch(
          filesActions.uploadFileToStorage(formData)
        )
      }
      const formattedData = clearValues(values)

      submitFunction({
        ...formattedData,
        invoiceFile: resultUpload
          ? {
              fileUrl: resultUpload.file_url,
              fileName: resultUpload.file_name,
              fileKey: resultUpload.file_key,
              fileSize: resultUpload.file_size,
              uploadDate: resultUpload.upload_date
            }
          : null
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

  const handleBilledTarget = (e) => {
    const { value } = e.target
    formik.setFieldValue('billedTarget', value)
  }

  const getIsValid = () => {
    const {
      invoiceNumber,
      paymentBusiness,
      ticketNumber,
      paymentEmployee,
      billedTarget,
      paymentFundation
    } = formik.values
    if (billedTarget === 'EMPRESA') {
      return invoiceNumber && paymentBusiness && uploadFile
    }
    if (billedTarget === 'TRABAJADOR') {
      return ticketNumber && paymentEmployee
    }
    if (billedTarget === 'FUNDACIÓN') {
      return Boolean(paymentFundation)
    }

    return true
  }

  const handleClose = () => {
    formik.resetForm()
    onClose()
  }

  useEffect(() => {
    if (open) {
      formik.resetForm()
    }
  }, [open])

  useEffect(() => {
    const { billedTarget } = formik.values
    if (billedTarget === 'EMPRESA') {
      formik.setFieldValue('paymentEmployee', '')
      formik.setFieldValue('ticketNumber', '')
    }
  }, [formik.values.billedTarget])

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
          {`${type === 'UPDATE' ? 'Nuevo' : 'Actualizar'} pago`}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <Select
              label="A quien facturo"
              name="billedTarget"
              required
              value={formik.values.billedTarget}
              onChange={handleBilledTarget}
              onBlur={formik.handleBlur}
              error={
                formik.touched.billedTarget &&
                Boolean(formik.errors.billedTarget)
              }
              helperText={
                formik.touched.billedTarget && formik.errors.billedTarget
              }
            >
              <option value="">Seleccione opción</option>
              {billedList.map((item) => (
                <option value={item}>{capitalize(item)}</option>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} md={6}>
            <DatePicker
              label="Fecha"
              value={formik.values.date}
              onChange={(date) => {
                formik.setFieldValue('date', date)
              }}
            />
          </Grid>

          {formik.values.billedTarget === 'TRABAJADOR' && (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  name="ticketNumber"
                  label="Número de boleta"
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
                  inputProps={{ maxLength: 7 }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <CurrencyTextField
                  label="Abono trabajador"
                  name="paymentEmployee"
                  required
                  value={formik.values.paymentEmployee}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.paymentEmployee &&
                    Boolean(formik.errors.paymentEmployee)
                  }
                  helperText={
                    formik.touched.paymentEmployee &&
                    formik.errors.paymentEmployee
                  }
                />
              </Grid>
            </>
          )}

          {formik.values.billedTarget === 'EMPRESA' && (
            <>
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
                  inputProps={{ maxLength: 7 }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <CurrencyTextField
                  name="paymentBusiness"
                  label="Abono empresa"
                  required
                  value={formik.values.paymentBusiness}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.paymentBusiness &&
                    Boolean(formik.errors.paymentBusiness)
                  }
                  helperText={
                    formik.touched.paymentBusiness &&
                    formik.errors.paymentBusiness
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
            </>
          )}

          {formik.values.billedTarget === 'FUNDACIÓN' && (
            <>
              <Grid item xs={12}>
                <CurrencyTextField
                  name="paymentFundation"
                  label="Abono fundación"
                  required
                  value={formik.values.paymentFundation}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.paymentFundation &&
                    Boolean(formik.errors.paymentFundation)
                  }
                  helperText={
                    formik.touched.paymentFundation &&
                    formik.errors.paymentFundation
                  }
                />
              </Grid>
            </>
          )}
        </Grid>

        <Box textAlign="center" marginTop={'15px'}>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <SubmitButton
            loading={formik.isSubmitting}
            onClick={formik.handleSubmit}
            disabled={!formik.isValid || !getIsValid()}
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
