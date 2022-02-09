import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Skeleton } from '@material-ui/lab'
import { Box, Grid, Typography } from '@material-ui/core'
import { FiUpload } from 'react-icons/fi'
import { CurrencyTextField, Dialog, FilePicker } from '../../Shared'
import { formatSearchWithRut } from '../../../formatters'
import {
  Button,
  EmptyState,
  InputLabel,
  SubmitButton,
  TextField
} from '../../UI'
import { useSuccess } from '../../../hooks'
import EmployeeRow from '../../Scholarships/Create/EmployeeRow'
import employeesActions from '../../../state/actions/employees'
import filesActions from '../../../state/actions/files'
import generateColor from '../../../utils/generateColor'

const validationSchema = Yup.object().shape({
  employeeId: Yup.string().required('Ingrese trabajador'),
  entryNumber: Yup.string()
    .min(4, 'El N° comprobante debe contener mínimo 4 Dígitos')
    .required('Ingrese N° comprobante de ingreso'),
  amount: Yup.string().required('Ingrese monto')
})

const WorkerRegistration = ({
  open,
  onClose,
  type,
  data,
  loader,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const dispatch = useDispatch()
  const { idCourse } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)
  const [currentDate] = useState(new Date())
  const [searchRut, setSearchRut] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchList, setSearchList] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [uploadFile, setUploadFile] = useState(null)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      courseId: idCourse,
      enrollDate: currentDate,
      employeeId: type === 'UPDATE' ? data.employeeId : '',
      employeeNames: type === 'UPDATE' ? data.employeeNames : '',
      entryNumber: type === 'UPDATE' ? data.entryNumber : '',
      amount: type === 'UPDATE' ? data.amount : '',
      file: {
        fileKey: type === 'UPDATE' ? data.fileKey : '',
        fileUrl: type === 'UPDATE' ? data.fileUrl : '',
        fileSize: type === 'UPDATE' ? data.fileSize : '',
        fileName: type === 'UPDATE' ? data.fileName : '',
        uploadDate: type === 'UPDATE' ? data.uploadDate : ''
      }
    },
    onSubmit: async (values) => {
      let form = {
        ...values,
        createDate: new Date().toISOString()
      }
      if (uploadFile) {
        const formData = new FormData()
        formData.append('file', uploadFile, uploadFile.name)
        const result = await dispatch(
          filesActions.uploadFileToStorage(formData)
        )
        form = {
          ...form,
          file: {
            fileKey: result.file_key,
            fileUrl: result.file_url,
            fileSize: result.file_size,
            fileName: result.file_name,
            uploadDate: result.upload_date
          }
        }
      } else {
        delete form.file
      }
      submitFunction(form)
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })

          changeSuccess(true, () => {
            onClose()
            if (successFunction) {
              successFunction()
            }
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

  useEffect(() => {
    if (selectedEmployee) {
      formik.setFieldValue(
        'employeeNames',
        `${selectedEmployee.names} ${selectedEmployee.paternal_surname} ${selectedEmployee.maternal_surname}`
      )
      formik.setFieldValue('employeeRut', selectedEmployee.run)
      formik.setFieldValue('employeeId', selectedEmployee.id)
    }
  }, [selectedEmployee])

  useEffect(() => {
    if (searchRut) {
      setLoading(true)
      dispatch(
        employeesActions.getEmployees(
          { state: 'CREATED', search: searchRut },
          false
        )
      ).then((list) => {
        setLoading(false)
        setSearchList(
          list.items.map((item) => ({ ...item, avatarBg: generateColor() }))
        )
      })
    } else {
      setSearchList([])
    }
  }, [searchRut])

  useEffect(() => {
    if (open) {
      formik.resetForm()
      setSearchRut('')
      setSearchList([])
      setSelectedEmployee(null)
      setUploadFile(null)
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={'md'}
      fullScreen={isMobile}
    >
      <Box>
        <Box mb={2}>
          <Typography
            variant="h6"
            align="center"
            style={{ fontWeight: 'bold' }}
          >
            Inscribir nuevo trabajador
          </Typography>
        </Box>
        <Box>
          {loader ? (
            <>
              <Box p={2}>
                <Box display="flex" marginBottom="10px">
                  <Skeleton width="30px"></Skeleton>
                  <Skeleton
                    width="40%"
                    style={{ marginLeft: '10px' }}
                  ></Skeleton>
                </Box>
              </Box>
            </>
          ) : (
            <Box>
              {selectedEmployee ? (
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <InputLabel>Trabajador</InputLabel>
                      <EmployeeRow
                        option={selectedEmployee}
                        onDelete={() => {
                          setSelectedEmployee(null)
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="N° Comprobante Ingreso"
                        name={'entryNumber'}
                        placeholder={'Mínimo 4 Dígitos'}
                        value={formik.values.entryNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.entryNumber &&
                          Boolean(formik.errors.entryNumber)
                        }
                        helperText={
                          formik.touched.entryNumber &&
                          formik.errors.entryNumber
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CurrencyTextField
                        label="Monto"
                        name={'amount'}
                        placeholder={'$ 1000'}
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.amount && Boolean(formik.errors.amount)
                        }
                        helperText={
                          formik.touched.amount && formik.errors.amount
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel>Adjunto</InputLabel>
                      <FilePicker
                        acceptedFiles={['.pdf']}
                        onChange={(e) => {
                          setUploadFile(e)
                        }}
                        onDelete={() => {
                          setUploadFile(null)
                          formik.setFieldValue('file', '')
                        }}
                        icon={<FiUpload fontSize="24px" />}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      label="Rut de trabajador"
                      value={searchRut}
                      onChange={(e) => {
                        setSearchRut(formatSearchWithRut(e.target.value))
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {loading ? (
                      <>
                        <Skeleton height={'40px'} />
                        <Skeleton height={'40px'} />
                        <Skeleton height={'40px'} />
                        <Skeleton height={'40px'} />
                      </>
                    ) : (
                      <>
                        {searchList.length === 0 ? (
                          <>
                            <EmptyState
                              message={`${
                                searchRut
                                  ? `No se encontraron resultados para: ${searchRut}`
                                  : 'Ingrese el rut del trabajador'
                              }`}
                            />
                          </>
                        ) : (
                          <>
                            {searchList.map((item) => (
                              <EmployeeRow
                                selectable
                                option={item}
                                onClick={() => {
                                  setSelectedEmployee(item)
                                }}
                              />
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </Grid>
                </Grid>
              )}
            </Box>
          )}
        </Box>

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
            {`${type === 'UPDATE' ? 'Actualizar' : 'Registrar'} Trabajador`}
          </SubmitButton>
        </Box>
      </Box>
    </Dialog>
  )
}

WorkerRegistration.defaultProps = {
  type: 'CREATE'
}

export default WorkerRegistration
