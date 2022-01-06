import * as Yup from 'yup'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useSuccess } from '../../hooks'
import companiesActions from '../../state/actions/companies'
import inclusionActions from '../../state/actions/inclusion'
import userActions from '../../state/actions/users'
import commonActions from '../../state/actions/common'
import filesActions from '../../state/actions/files'
import employeeActions from '../../state/actions/employees'
import { CompanyRow, Dialog, FilePostulation } from '../Shared'
import { Select, RutTextField, TextField, SubmitButton, Button } from '../UI'
import SearchCompany from '../Companies/SearchCompany'
import EmployeeRow from '../Scholarships/Create/EmployeeRow'
import { COLORS } from '../../utils/generateColor'
import ContactCard from '../Schedule/ContactCard'

const validationSchema = Yup.object({
  bossId: Yup.number().required('Seleccione jefatura'),
  delegation: Yup.string().required('Seleccione una delegación'),
  authorizingChargeId: Yup.number().required('Seleccione cargo'),
  authorizingUser: Yup.string().required('Nombre autorizacion de cobro'),
  interlocutorId: Yup.number(),
  constructionId: Yup.number().required('Seleccione obra'),
  businessId: Yup.number().required('Selecciona una empresa'),
  billingBusinessId: Yup.number().required('Selecciona una obra'),
  employeeId: Yup.number(),
  chargeMethodId: Yup.number().required('Seleccione modalidad')
})

const InclusiveCreate = ({
  open,
  onClose,
  data,
  type,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const dispatch = useDispatch()
  const [chargeList, setChargeList] = useState([])
  const [bossesList, setBossesList] = useState([])

  const { constructions: constructionsList } = useSelector(
    (state) => state.companies
  )
  const [employees, setEmployees] = useState([])
  const [companyDetails, setCompanyDetails] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [searchEmployee, setSearchEmployee] = useState('')
  const { regions, charges } = useSelector((state) => state.common)
  const { enqueueSnackbar } = useSnackbar()

  const { isMobile } = useSelector((state) => state.ui)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [selectedConstruction, setSelectedConstruction] = useState(null)
  const [billingCompany, setBillingCompany] = useState(null)
  const { success, changeSuccess } = useSuccess()

  const [attachments, setAttachments] = useState([])

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    validateOnChange: true,
    initialValues: {
      bossId: type === 'UPDATE' ? data.bossId : '',
      delegation: type === 'UPDATE' ? data.delegation : '',
      authorizingChargeId: type === 'UPDATE' ? data.authorizingChargeId : '',
      authorizingUser: type === 'UPDATE' ? data.authorizingUser : '',
      interlocutorId: type === 'UPDATE' ? data.interlocutorId : '',
      constructionId: type === 'UPDATE' ? data.constructionId : '',
      businessId: type === 'UPDATE' ? data.businessId : '',
      employeeId: type === 'UPDATE' ? data.employeeId : '',
      chargeMethodId: type === 'UPDATE' ? data.chargeMethodId : '',
      billingBusinessId: type === 'UPDATE' ? data.billingBusinessId : ''
    },
    onSubmit: (values) => {
      submitFunction({
        ...values,
        authorizingUser: values.authorizingUser.toUpperCase(),
        delegation: regions
          .find((item) => item.id === parseInt(values.delegation, 10))
          .name.toUpperCase()
      })
        .then((result) => {
          formik.setSubmitting(false)
          changeSuccess(true)
          if (successFunction) {
            successFunction()
          }
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })
          onClose()
          if (successFunction) {
            successFunction(result)
          }
        })
        .catch((err) => {
          enqueueSnackbar(err, {
            variant: 'error'
          })
        })
    }
  })

  const handleUploadFile = async (file, key) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await dispatch(filesActions.uploadFile(formData))
    const newAttachment = attachments.map((item) =>
      item.name === key
        ? {
            ...item,
            fileName: response.file_name,
            fileKey: response.file_key,
            fileUrl: response.file_url,
            fileSize: response.file_size,
            uploadDate: response.upload_date
          }
        : item
    )

    setAttachments(newAttachment)
  }
  const handleDeleteFile = async (key) => {
    if (type !== 'UPDATE') {
      await dispatch(filesActions.deleteFile())
    }
    const newAttachment = attachments.map((item) =>
      item.name === key
        ? {
            ...item,
            fileName: '',
            fileKey: '',
            fileUrl: '',
            fileSize: '',
            uploadDate: ''
          }
        : item
    )
    setAttachments(newAttachment)
  }

  useEffect(() => {
    if (searchEmployee) {
      dispatch(
        employeeActions.getEmployees(
          {
            state: 'CREATED',
            search: searchEmployee
          },
          false
        )
      ).then((list) => {
        setEmployees(list)
      })
    }
  }, [searchEmployee])

  useEffect(() => {
    if (open) {
      dispatch(inclusionActions.getChargeMethods()).then((response) => {
        setChargeList(response)
      })
      dispatch(userActions.getBosses()).then((response) => {
        setBossesList(response)
      })
      dispatch(commonActions.getRegions())
      dispatch(commonActions.getCharges())
      dispatch(companiesActions.getConstructions())
    }
  }, [open])

  useEffect(() => {
    if (selectedConstruction) {
      formik.setFieldValue('constructionId', selectedConstruction.id)
      dispatch(
        companiesActions.getCompany(selectedConstruction.billing_business_id)
      )
        .then((res) => {
          formik.setFieldValue(
            'billingBusinessId',
            selectedConstruction.billing_business_id
          )
          setBillingCompany(res)
        })
        .catch((err) => {
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  }, [selectedConstruction])

  useEffect(() => {
    if (selectedCompany) {
      formik.setFieldValue('businessId', selectedCompany.id)
      dispatch(companiesActions.getCompany(selectedCompany.id, false)).then(
        (res) => {
          setCompanyDetails(res)
          if (res.interlocutor.id) {
            formik.setFieldValue('interlocutorId', res.interlocutor.id)
          }
        }
      )
      dispatch(
        companiesActions.getConstructions({ business_id: selectedCompany.id })
      )
    }
  }, [selectedCompany])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={'lg'}
      fullScreen={isMobile}
    >
      <Box>
        <Typography
          variant="h6"
          align="center"
          style={{ fontWeight: 'bold', marginBottom: 10 }}
        >
          Nuevo Caso de Ley de Inclusión
        </Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Select
                label="Jefatura"
                name="bossId"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.bossId && Boolean(formik.errors.bossId)}
                helperText={formik.touched.bossId && formik.errors.bossId}
              >
                <option value="">SELECCIONE JEFATURA</option>
                {bossesList.map((item) => (
                  <option
                    key={`boss-${item.id}`}
                    value={item.id}
                  >{`${item.names} ${item.paternal_surname}`}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6} md={4}>
              <Select
                label="Delegacion"
                name="delegation"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.delegation && Boolean(formik.errors.delegation)
                }
                helperText={
                  formik.touched.delegation && formik.errors.delegation
                }
              >
                <option value="">SELECCIONE DELEGACIÓN</option>
                {regions.map((item) => (
                  <option key={`region-${item.id}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6} md={4}>
              <Select
                label="Modalidad de cobro"
                name="chargeMethodId"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.chargeMethodId &&
                  Boolean(formik.errors.chargeMethodId)
                }
                helperText={
                  formik.touched.chargeMethodId && formik.errors.chargeMethodId
                }
              >
                <option value="">SELECCIONE MODALIDAD</option>
                {chargeList.map((item) => (
                  <option value={item.id}>{`${item.name}`}</option>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Typography
              variant="h7"
              align="left"
              style={{ fontWeight: 'bold' }}
            >
              Trabajador
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <RutTextField
                  label="Run"
                  name="run"
                  required
                  onChange={(e) => {
                    setSearchEmployee(e.target.value)
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                {selectedEmployee ? (
                  <EmployeeRow option={selectedEmployee} />
                ) : (
                  <>
                    {employees.map((item) => (
                      <EmployeeRow
                        key={`employee-row-${item.id}`}
                        option={item}
                        selectable
                        onClick={() => {
                          formik.setFieldValue('employeeId', item.id)
                          setSelectedEmployee(item)
                        }}
                      />
                    ))}
                  </>
                )}
              </Grid>
            </Grid>
          </Box>

          <Box mt={2}>
            <Typography
              variant="h7"
              align="left"
              style={{ fontWeight: 'bold' }}
            >
              Detalle de la Empresa
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SearchCompany
                onSelected={(value) => {
                  setSelectedCompany(value)
                }}
                onDelete={() => {
                  setSelectedCompany(null)
                }}
              />
            </Grid>

            <Grid item xs={12}>
              {selectedConstruction ? (
                <>
                  <Typography>Obra seleccionada</Typography>
                  <CompanyRow
                    type="CONSTRUCTION"
                    company={selectedConstruction}
                    onDelete={() => {
                      setSelectedConstruction(null)
                      setBillingCompany(null)
                      formik.setFieldValue('billingBusinessId', '')
                    }}
                  />
                </>
              ) : (
                <>
                  <Autocomplete
                    options={constructionsList}
                    value={selectedConstruction || ''}
                    getOptionLabel={(option) => option.name || ''}
                    onChange={(__, value) => {
                      setSelectedConstruction(value)
                    }}
                    renderOption={(option) => (
                      <CompanyRow.Autocomplete
                        type="CONSTRUCTION"
                        company={option}
                      />
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Selecciona empresa"
                        placeholder="BUSCA UNA OBRA"
                      />
                    )}
                  />
                </>
              )}
            </Grid>
            <Grid item xs={12}>
              {billingCompany && (
                <>
                  <Typography>Empresa facturadora</Typography>
                  <CompanyRow iconColor={COLORS[3]} company={billingCompany} />
                </>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>Interlocutor de empresa</Typography>
              <ContactCard contact={companyDetails?.interlocutor} />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                label="Nombre Autorizacion de Cobro"
                name="authorizingUser"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.authorizingUser}
                required
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <Select
                label="Cargo de autorizacion de Cobro"
                name="authorizingChargeId"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.authorizingChargeId &&
                  Boolean(formik.errors.authorizingChargeId)
                }
                helperText={
                  formik.touched.authorizingChargeId &&
                  formik.errors.authorizingChargeId
                }
              >
                <option value="">Cargo de Autorizacion de Cobro</option>
                {charges.map((item) => (
                  <option key={`charge-${item.id}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid container>
              {attachments.map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <FilePostulation
                    onDelete={() => handleDeleteFile(item.name)}
                    fileKey={item.fileKey}
                    id={`${item.key}-${index}`}
                    onChangeImage={(e) => {
                      handleUploadFile(e, item.name)
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Box textAlign="center" marginTop="15px">
            <Button variant="outlined" onClick={onclose}>
              Cancelar
            </Button>
            <SubmitButton
              loading={formik.isSubmitting}
              disabled={!formik.isValid}
              onClick={formik.handleSubmit}
              success={success}
            >
              Crear caso
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default InclusiveCreate
