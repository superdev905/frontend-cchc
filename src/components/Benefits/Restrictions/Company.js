import { capitalize } from 'lodash'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { CompanyRow, Dialog } from '../../Shared'
import { Button, Select, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'
import companiesActions from '../../../state/actions/companies'

const statusList = ['OPCION 1', 'OPCION 2', 'OPCION 3']

const validationSchema = Yup.object().shape({
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

const Company = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [selectedCons, setSelectedCons] = useState(null)
  const [companies, setCompanies] = useState([])

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      businessId: type === 'UPDATE' ? data.businessId : '',
      businessName: type === 'UPDATE' ? data.businessName : '',
      constructionId: type === 'UPDATE' ? data.constructionId : '',
      constructionName: type === 'UPDATE' ? data.constructionName : '',
      businessType: type === 'UPDATE' ? data.businessType : '',
      socialService: type === 'UPDATE' ? data.socialService : '',
      businessField: type === 'UPDATE' ? data.businessField : '',
      employeeType: type === 'UPDATE' ? data.employeeType : '',
      coverage: type === 'UPDATE' ? data.coverage : '',
      target: type === 'UPDATE' ? data.target : '',
      office: type === 'UPDATE' ? data.office : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({
        ...values,
        createDate: new Date().toISOString()
      })
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            onClose()
            enqueueSnackbar(successMessage, {
              variant: 'success'
            })
            resetForm()
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
          } restricción por businessId`}
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
                <option value="">Seleccione tipo de businessId</option>
                {statusList.map((item) => (
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
                {statusList.map((item) => (
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
                {statusList.map((item) => (
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
                {statusList.map((item) => (
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
                {statusList.map((item) => (
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
                {statusList.map((item) => (
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
                {statusList.map((item) => (
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
