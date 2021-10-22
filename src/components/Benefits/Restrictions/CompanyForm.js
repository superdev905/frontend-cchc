import { capitalize } from 'lodash'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { CompanyRow } from '../../Shared'
import { Button, Select, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'
import companiesActions from '../../../state/actions/companies'
import { decisionList } from '../../../config'
import { companySchema } from './schemas'

const officeList = [
  'ANTOFAGASTA',
  'CALAMA',
  'CONCEPCION',
  'LOS ANGELES',
  'PUERTO MONTT',
  'OSORNO'
]
const companyTypes = ['SOCIA CCHC', 'NO SOCIA']
const coverageList = ['NACIONAL', 'REGIONAL', 'SANTIAGO', 'CRITERIO EMPRESAS']
const targetList = ['TIPOS DE TRABAJADORES', 'FAMILIA', 'OTRO']
const businessFieldList = ['TODOS', 'EMPRESAS DE LA CONSTRUCCIÓN']
const employeeTypes = ['TRABAJADOR', 'PREVENCIONISTA DE RIESGOS', 'OTROS']

const Company = ({ onCancel, type, data, submitFunction, successMessage }) => {
  const dispatch = useDispatch()
  const { success, changeSuccess } = useSuccess()
  const { enqueueSnackbar } = useSnackbar()
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [selectedCons, setSelectedCons] = useState(null)
  const [companies, setCompanies] = useState([])

  const formik = useFormik({
    validateOnMount: true,
    validationSchema: companySchema,
    initialValues: {
      businessId: data?.businessId || '',
      businessName: data?.businessName || '',
      constructionId: data?.constructionId || '',
      constructionName: data?.constructionName || '',
      businessType: data?.businessType || '',
      socialService: data?.socialService ? 'SI' : 'NO' || '',
      businessField: data?.businessField || '',
      employeeType: data?.employeeType || '',
      coverage: data?.coverage || '',
      target: data?.target || '',
      office: data?.office || ''
    },
    onSubmit: (values) => {
      submitFunction({
        ...values,
        socialService: values.socialService === 'SI'
      })
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            enqueueSnackbar(successMessage, { variant: 'success' })
          })
        })
        .catch((err) => {
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })

  const onCompanySelect = (__, values) => {
    setSelectedCompany(values)
    const idCompany = values ? values.id : ''
    const nameCompany = values ? values.business_name : ''

    formik.setFieldValue('businessId', idCompany)
    formik.setFieldValue('businessName', nameCompany)
    setSelectedCons(null)
  }

  const onConstructionChange = (__, values) => {
    formik.setFieldValue('constructionId', values?.id || '')
    formik.setFieldValue('constructionName', values?.name || '')
    setSelectedCons(values)
  }

  useEffect(() => {
    if (type === 'UPDATE' && companies.length > 0) {
      const targetCompany = companies.find(
        (item) => item.id === formik.values.businessId
      )
      setSelectedCompany(targetCompany)
      const listCons = targetCompany?.constructions
      setSelectedCons(
        listCons?.find((item) => item.id === formik.values.constructionId)
      )
    }
  }, [type, companies])

  useEffect(() => {
    const { businessId } = formik.values
    if (businessId && companies.length > 0) {
      const currentBusiness = companies.find(
        (item) => item.id === parseInt(businessId, 10)
      )
      formik.setFieldValue('businessName', currentBusiness.name)
    } else {
      formik.setFieldValue('businessName', '')
    }
  }, [formik.values.businessId, companies])

  useEffect(() => {
    const { businessId } = formik.values
    if (businessId === '') {
      formik.setFieldValue('businessId', '')
      formik.setFieldValue('businessName', '')
    }
  }, [formik.values.businessId, companies])

  useEffect(() => {
    dispatch(companiesActions.getCompanies({ state: 'CREATED' }, false)).then(
      (list) => {
        setCompanies(list)
      }
    )
  }, [])

  return (
    <Box>
      <Box>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={companies}
                value={selectedCompany || ''}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.business_name || ''}
                onChange={onCompanySelect}
                required
                renderOption={(option) => (
                  <CompanyRow.Autocomplete company={option} />
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona empresa"
                    placeholder="Nombre de empresa"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Autocomplete
                options={
                  selectedCompany
                    ? selectedCompany.constructions.filter(
                        (item) =>
                          item.status !== 'NO_VIGENTE' &&
                          item.state !== 'DELETED'
                      )
                    : []
                }
                value={selectedCons || ''}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name || ''}
                onChange={onConstructionChange}
                required
                renderOption={(option) => (
                  <Box>
                    <Typography>
                      <strong>{option.name || ''}</strong>
                    </Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona obra"
                    placeholder="Nombre de obra"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Tipo de empresa"
                required
                name="businessType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.businessType}
                helperText={
                  formik.touched.businessType && formik.errors.businessType
                }
                error={
                  formik.touched.businessType &&
                  Boolean(formik.errors.businessType)
                }
              >
                <option value="">Seleccione tipo de empresa</option>
                {companyTypes.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Relación servicio social"
                required
                name="socialService"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.socialService}
                helperText={
                  formik.touched.socialService && formik.errors.socialService
                }
                error={
                  formik.touched.socialService &&
                  Boolean(formik.errors.socialService)
                }
              >
                <option value="">Seleccione relacion</option>
                {decisionList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Giro empresa"
                required
                name="businessField"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.businessField}
                helperText={
                  formik.touched.businessField && formik.errors.businessField
                }
                error={
                  formik.touched.businessField &&
                  Boolean(formik.errors.businessField)
                }
              >
                <option value="">Seleccione giro</option>
                {businessFieldList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Tipo de trabajador"
                required
                name="employeeType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.employeeType}
                helperText={
                  formik.touched.employeeType && formik.errors.employeeType
                }
                error={
                  formik.touched.employeeType &&
                  Boolean(formik.errors.employeeType)
                }
              >
                <option value="">Seleccione tipo</option>
                {employeeTypes.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <Select
                label="Cobertura"
                required
                name="coverage"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.coverage}
                helperText={formik.touched.coverage && formik.errors.coverage}
                error={
                  formik.touched.coverage && Boolean(formik.errors.coverage)
                }
              >
                <option value="">Seleccione coverage</option>
                {coverageList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Dirigido a"
                required
                name="target"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.target}
                helperText={formik.touched.target && formik.errors.target}
                error={formik.touched.target && Boolean(formik.errors.target)}
              >
                <option value="">Seleccione oficina</option>
                {targetList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Oficina regional"
                required
                name="office"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.office}
                helperText={formik.touched.office && formik.errors.office}
                error={formik.touched.office && Boolean(formik.errors.office)}
              >
                <option value="">Seleccione oficina</option>
                {officeList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
          </Grid>

          <Box textAlign="center" marginTop="10px">
            <Button onClick={onCancel} variant="outlined">
              Cancelar
            </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              disabled={!formik.isValid || formik.isSubmitting}
              loading={formik.isSubmitting}
              success={success}
            >
              Actualizar
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Company
