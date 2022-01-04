import * as Yup from 'yup'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import companiesActions from '../../state/actions/companies'
import { Dialog, FilePostulation } from '../Shared'
import { Select, RutTextField, TextField, SubmitButton, Button } from '../UI'
import { useToggle, useSuccess } from '../../hooks'
import FacturationModal from '../Companies/Create/ParentBusiness'
import { buildTreeData, searchFromTree } from '../../utils/buildTreeData'
import inclusionActions from '../../state/actions/inclusion'
import userActions from '../../state/actions/users'
import commonActions from '../../state/actions/common'
import filesActions from '../../state/actions/files'
import employeeActions from '../../state/actions/employees'
import SearchCompany from '../Companies/SearchCompany'
import EmployeeRow from '../Scholarships/Create/EmployeeRow'

const validationSchema = Yup.object({
  bossId: Yup.number().required('Ingrese nombre de Jefatura'),
  delegation: Yup.string(),
  authorizingChargeId: Yup.number().required('Seleccione cargo'),
  authorizingUser: Yup.string().required('Nombre autorizacion de cobro'),
  interlocutorId: Yup.number(),
  constructionName: Yup.string().required('Ingrese Delegacion'),
  constructionId: Yup.number().required('Seleccione obra'),
  businessName: Yup.string().required('Ingrese Empresa'),
  businessId: Yup.number(),
  employeeId: Yup.number()
})

const InclusiveCreate = ({
  open,
  onClose,
  data,
  selectClient,
  type,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const dispatch = useDispatch()
  const [chargeList, setChargeList] = useState([])
  const [bossesList, setBossesList] = useState([])
  const [companies, setCompanies] = useState([])
  const { constructions: constructionsList } = useSelector(
    (state) => state.companies
  )
  const [employees, setEmployees] = useState([])
  const [searchEmployee, setSearchEmployee] = useState('')
  const { regions, charges } = useSelector((state) => state.common)
  const { enqueueSnackbar } = useSnackbar()
  const { idCompany } = useParams()
  const [treeData, setTreeData] = useState([])
  const { isMobile } = useSelector((state) => state.ui)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [companyBill, setCompanyBill] = useState(null)
  const { success, changeSuccess } = useSuccess()
  const { open: openFact, toggleOpen: toggleOpenFact } = useToggle()

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
      constructionName: type === 'UPDATE' ? data.constructionName : '',
      constructionId: type === 'UPDATE' ? data.constructionId : '',
      businessName: type === 'UPDATE' ? data.businessName : '',
      businessId: type === 'UPDATE' ? data.businessId : '',
      businessRut: type === 'UPDATE' ? data.businessRut : '',
      employeeNames: type === 'UPDATE' ? data.employeeNames : '',
      employeeId: type === 'UPDATE' ? data.employeeId : '',
      employeeRut: type === 'UPDATE' ? data.employeeRut : ''
    },
    onSubmit: (values) => {
      submitFunction({
        ...values,
        date: new Date().toISOString()
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

  const updateTreeData = (mainId) => {
    const treeList = treeData.map((item) =>
      searchFromTree(item, item, parseInt(mainId, 10))
    )
    setTreeData(treeList.filter((item) => item))
  }

  const onCompanySelect = (__, values) => {
    setSelectedCompany(values)
    formik.setFieldValue('business_selected_id', values ? values.id : '')
    formik.setFieldTouched('business_selected_id')
  }

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
    if (formik.values.billing_business_id && companies.length > 0) {
      setCompanyBill(
        companies.find(
          (item) => item.id === parseInt(formik.values.billing_business_id, 10)
        )
      )
    }
  }, [formik.values.billing_business_id, companies])

  useEffect(() => {
    if (idCompany && companies.length > 0) {
      formik.setFieldValue('business_selected_id', idCompany)
      setSelectedCompany(
        companies.find((item) => item.id === parseInt(idCompany, 10))
      )
    }
  }, [idCompany, companies])

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
    if (selectedCompany) {
      const mainId =
        type === 'UPDATE'
          ? selectedCompany.id
          : formik.values.business_selected_id
      updateTreeData(mainId)
    }
  }, [formik.values.business_selected_id, type, selectedCompany])

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
    if (open) {
      setCompanyBill(null)
      dispatch(companiesActions.getCompanies({ state: 'CREATED' }, false)).then(
        (list) => {
          setCompanies(list)
          setTreeData(buildTreeData(list))
        }
      )
    }
  }, [open, type, selectClient])

  console.log(formik.errors)

  useEffect(() => {
    if (selectedCompany) {
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
              <Select label="Jefatura" name="jefatura" required>
                <option value="">Seleccione jefatura</option>
                {bossesList.map((item) => (
                  <option
                    key={`boss-${item.id}`}
                    value={item.id}
                  >{`${item.names} ${item.paternal_surname}`}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6} md={4}>
              <Select label="Delegacion" name="delegacion" required>
                <option value="">Delegación</option>
                {regions.map((item) => (
                  <option key={`region-${item.id}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6} md={4}>
              <Select label="Modalidad" name="modalidad" required>
                <option value="">Modalidad</option>
                {chargeList.map((item) => (
                  <option value={item.id}>{`${item.name}`}</option>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Typography variant="h7" align="left" style={{ fontWeight: 'bold' }}>
            Detalle del Trabajador
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
              {employees.map((item) => (
                <EmployeeRow
                  key={`employee-row-${item.id}`}
                  option={item}
                  selectable
                  onClick={() => {
                    console.log(item)
                  }}
                />
              ))}
            </Grid>
          </Grid>
          <Typography variant="h7" align="left" style={{ fontWeight: 'bold' }}>
            Detalle de la Empresa
          </Typography>
          <Grid container spacing={2}>
            {selectClient && (
              <Grid item xs={6} md={4} lg={4}>
                <Autocomplete
                  options={companies}
                  value={selectedCompany || ''}
                  getOptionLabel={(option) => option.business_name || ''}
                  onChange={onCompanySelect}
                  renderOption={(option) => (
                    <Box>
                      <Typography>
                        {`Razón social: `}
                        <strong>{option.business_name}</strong>
                      </Typography>
                      <Typography>{`Rut: ${option.rut}`}</Typography>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecciona empresa"
                      placeholder="Empresa"
                    />
                  )}
                />
              </Grid>
            )}
            <Grid item xs={6} md={4} lg={4}>
              <SearchCompany
                onSelected={(value) => {
                  setSelectedCompany(value)
                  console.log(value)
                }}
                onDelete={() => {
                  setSelectedCompany(null)
                }}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4}>
              <RutTextField
                onClick={toggleOpenFact}
                label="Empresa facturadora"
                disabled
                value={companyBill?.business_name || ''}
              />
              <FacturationModal
                type="FACTURATION"
                open={openFact}
                onClose={toggleOpenFact}
                data={treeData}
                selectedId={formik.values.billing_business_id}
                onChange={(id) => {
                  formik.setFieldValue('billing_business_id', id)
                }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <Select label="Obra" name="obra" required>
                <option value="">Obra</option>
                {constructionsList.map((constructions) => (
                  <option>{constructions.name}</option>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <TextField
                label="Interlocutor de Empresa"
                name="interlocutorId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.interlocutorId}
                requiered
              >
                <option value="">Interlocutor de Empresa</option>
              </TextField>
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
              Guardar
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default InclusiveCreate
