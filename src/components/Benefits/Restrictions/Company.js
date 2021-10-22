import { capitalize } from 'lodash'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { CompanyRow, Dialog } from '../../Shared'
import { Button, Select, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'
import companiesActions from '../../../state/actions/companies'
import benefitsActions from '../../../state/actions/benefits'
import { decisionList } from '../../../config'

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

const validationSchemaBusiness = Yup.object().shape({
  businessId: Yup.string().required('Seleccione empresa'),
  constructionId: Yup.string().required('Seleccione obra'),
  businessType: Yup.string().required('Seleccione tipo de empresa'),
  socialService: Yup.string().required('Seleccione relacion servicio social'),
  businessField: Yup.string().required('Seleccione giro de empresa'),
  employeeType: Yup.string().required('Seleccione tipo de trabajador'),
  coverage: Yup.string().required('Seleccione coverage'),
  target: Yup.string().required('Seleccione a quien va dirigido'),
  office: Yup.string().required('Seleccione oficina regional')
})

const Company = ({ open, onClose, type, benefit }) => {
  const dispatch = useDispatch()
  const { success } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)
  const { create } = useSelector((state) => state.benefits)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [selectedCons, setSelectedCons] = useState(null)
  const [companies, setCompanies] = useState([])

  const formik = useFormik({
    validateOnMount: true,
    validationSchemaBusiness,
    initialValues: {
      businessId:
        type === 'UPDATE' ? benefit.businessRestriction.businessId : '',
      businessName:
        type === 'UPDATE' ? benefit.businessRestriction.businessName : '',
      constructionId:
        type === 'UPDATE' ? benefit.businessRestriction.constructionId : '',
      constructionName:
        type === 'UPDATE' ? benefit.businessRestriction.constructionName : '',
      businessType:
        type === 'UPDATE' ? benefit.businessRestriction.businessType : '',
      socialService:
        type === 'UPDATE' ? benefit.businessRestriction.socialService : '',
      businessField:
        type === 'UPDATE' ? benefit.businessRestriction.businessField : '',
      employeeType:
        type === 'UPDATE' ? benefit.businessRestriction.employeeType : '',
      coverage: type === 'UPDATE' ? benefit.businessRestriction.coverage : '',
      target: type === 'UPDATE' ? benefit.businessRestriction.target : '',
      office: type === 'UPDATE' ? benefit.businessRestriction.office : ''
    },
    onSubmit: (values) => {
      const data = {
        ...create,
        benefit: {
          ...create.benefit,
          businessRestriction: values
        }
      }
      if (create.type === 'CREATE') {
        dispatch(
          benefitsActions.updateCreate({
            ...create,
            ...data,
            step: create.step + 1
          })
        )
      }
    }
  })

  const onCompanySelect = (__, values) => {
    setSelectedCompany(values)
    const idCompany = values ? values.id : ''
    const nameCompany = values ? values.businessName : ''

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
    if (open) {
      dispatch(companiesActions.getCompanies({ state: 'CREATED' }, false)).then(
        (list) => {
          setCompanies(list)
        }
      )
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${
            type === 'UPDATE' ? 'Actualizar' : 'Nueva'
          } restricción por empresa`}
        </Typography>
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
            <Button onClick={onClose} variant="outlined">
              Cancelar
            </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              disabled={!formik.isValid || formik.isSubmitting}
              loading={formik.isSubmitting}
              success={success}
            >
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} restricción`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

Company.defaultProps = {
  type: 'CREATE'
}

export default Company
