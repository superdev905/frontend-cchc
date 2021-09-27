import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import commonActions from '../../../state/actions/common'
import companiesActions from '../../../state/actions/companies'
import employeeActions from '../../../state/actions/employees'
import { RutTextField, Select, TextField } from '../../UI'
import useStyles from './styles'
import { rutValidation } from '../../../validations'
import Actions from '../../Companies/Create/Actions'
import scholarshipsActions from '../../../state/actions/scholarships'

const validationSchema = Yup.object({
  scholarshipId: Yup.string().required('Seleccione beca'),
  employeeRut: Yup.string()
    .required('Ingrese rut trabajador')
    .test('Check Rut', 'Ingrese Rut válido', (v) => rutValidation(v)),
  employeeNames: Yup.string().required('Ingrese nombre trabajador'),
  businessRut: Yup.string()
    .required('Ingrese rut empresa')
    .test('Check Rut', 'Ingrese Rut válido', (v) => rutValidation(v)),
  businessName: Yup.string().required('Ingrese nombre empresa'),
  businessRelatedRut: Yup.string(),
  businessRelatedName: Yup.string(),
  beneficiaryRut: Yup.string()
    .required('Ingrese rut beneficiario')
    .test('Check Rut', 'Ingrese Rut válido', (v) => rutValidation(v)),
  beneficiaryNames: Yup.string().required('Ingrese nombre beneficiario'),
  careerId: Yup.string().required('Ingrese nombre carrera'),
  schoolName: Yup.string().required('Ingrese nombre de institución o colegio'),
  schoolRegion: Yup.number().required(
    'Seleccione región de institución o colegio'
  ),
  schoolCommune: Yup.number().required(
    'Seleccione comuna de institución o colegio'
  ),
  psuScore: Yup.number('Puntaje valido').required('Ingrese puntaje ptu o simil')
})

const StepOne = ({ onClose, data }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { regions } = useSelector((state) => state.common)
  const { create, scholarshipType, careers } = useSelector(
    (state) => state.scholarships
  )
  const [communes, setCommunes] = useState([])
  const [companies, setCompanies] = useState([])
  const [employees, setEmployees] = useState([])
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      scholarshipId: create?.application?.scholarshipId || '',
      date: create?.application?.date || '',
      employeeNames: create?.application?.employeeNames || '',
      employeeRut: create?.application?.employeeRut || '',
      businessName: create?.application?.businessName || '',
      businessRut: create?.application?.businessRut || '',
      businessRelatedName: create?.application?.businessRelatedName || '',
      businessRelatedRut: create?.application?.businessRelatedRut || '',
      beneficiaryNames: create?.application?.beneficiaryNames || '',
      beneficiaryRut: create?.application?.beneficiaryRut || '',
      careerId: create?.application?.careerId || '',
      schoolName: create?.application?.schoolName || '',
      schoolRegion: create?.application?.schoolRegion || '',
      schoolCommune: create?.application?.schoolCommune || '',
      psuScore: create?.application?.psuScore || ''
    },

    onSubmit: (values) => {
      dispatch(
        scholarshipsActions.updateCreate({
          ...create,
          application: { ...create.application, ...values },
          step: create.step + 1
        })
      )
    }
  })

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'schoolRegion': {
        const schoolRegion = regions.find(
          (item) => item.id === parseInt(value, 10)
        )
        setCommunes(schoolRegion.communes)
        formik.setFieldValue('schoolRegion', schoolRegion.id)
        break
      }
      case 'schoolCommune': {
        const schoolCommune = communes.find(
          (item) => item.id === parseInt(value, 10)
        )
        formik.setFieldValue('schoolCommune', schoolCommune.id)
        break
      }
      default:
        throw new Error('Error')
    }
  }

  useEffect(() => {
    if (formik.values.schoolRegion && regions.length > 0) {
      handleSelectChange({
        target: { name: 'schoolRegion', value: formik.values.schoolRegion }
      })
    }
  }, [formik.values.schoolRegion, regions])

  useEffect(() => {
    if (create.type !== 'CREATE' && companies.length > 0) {
      const targetCompany = companies.find(
        (item) => item.rut === formik.values.businessRut
      )
      setSelectedCompany(targetCompany)
    }
  }, [create.type, formik.values.businessRut, companies])

  useEffect(() => {
    if (create.type === 'UPDATE' && employees.length > 0) {
      const targetEmployee = employees.find(
        (item) => item.run === formik.values.employeeRut
      )
      setSelectedEmployee(targetEmployee)
    }
  }, [create.type, formik.values.employeeRut, employees])

  useEffect(() => {
    if (data) {
      dispatch(
        scholarshipsActions.updateCreate({
          ...create,
          ...data
        })
      )
    }
  }, [data])

  const onEmployeeSelect = (__, values) => {
    setSelectedEmployee(values)
    const idEmployee = values ? values.id : ''
    const nameEmployee = values
      ? `${values.names} ${values.paternal_surname} ${values.maternal_surname}`
      : ''
    const runEmployee = values ? values.run : ''

    formik.setFieldValue('employee_id', idEmployee)
    formik.setFieldValue('employeeNames', nameEmployee)
    formik.setFieldValue('employeeRut', runEmployee)
  }

  const onCompanySelect = (__, values) => {
    setSelectedCompany(values)
    const idCompany = values ? values.id : ''
    const nameCompany = values ? values.business_name : ''
    const rutCompany = values ? values.rut : ''

    formik.setFieldValue('business_id', idCompany)
    formik.setFieldValue('businessName', nameCompany)
    formik.setFieldValue('businessRut', rutCompany)
  }

  useEffect(() => {
    dispatch(commonActions.getRegions())
    dispatch(scholarshipsActions.getScholarshipTypes())
    dispatch(scholarshipsActions.getCareers())
    dispatch(companiesActions.getCompanies({ state: 'CREATED' }, false)).then(
      (list) => {
        setCompanies(list)
      }
    )
    dispatch(employeeActions.getEmployees({ state: 'CREATED' }, false)).then(
      (list) => {
        setEmployees(list)
      }
    )
  }, [])

  return (
    <Box className={classes.form}>
      <Box>
        <Typography align="center" className={classes.subtitle}>
          Postulación a beca
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Select
              label="Beca"
              name="scholarshipId"
              value={formik.values.scholarshipId}
              required
              onChange={formik.handleChange}
            >
              <option value="">Seleccione beca</option>
              {scholarshipType.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              required
              options={employees}
              value={selectedEmployee || ''}
              //  getOptionSelected={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.run || ''}
              onChange={onEmployeeSelect}
              required
              renderOption={(option) => (
                <Box>
                  <Typography>{`Rut: ${option.run}`}</Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Rut trabajador" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              required
              options={employees}
              value={selectedEmployee || ''}
              //  getOptionSelected={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.names || ''}
              onChange={onEmployeeSelect}
              required
              renderOption={(option) => (
                <Box>
                  <Typography>
                    <strong>{option.names}</strong>
                  </Typography>
                  <Typography>{`Rut: ${option.run}`}</Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Nombre trabajador" />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              required
              options={companies}
              value={selectedCompany || ''}
              getOptionLabel={(option) => option.rut || ''}
              onChange={onCompanySelect}
              renderOption={(option) => (
                <Box>
                  <Typography>
                    <strong>{option.rut}</strong>
                  </Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Rut empresa" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              required
              options={companies}
              value={selectedCompany || ''}
              getOptionLabel={(option) => option.business_name || ''}
              onChange={onCompanySelect}
              renderOption={(option) => (
                <Box>
                  <Typography>
                    <strong>{option.business_name}</strong>
                  </Typography>
                  <Typography>{`Rut: ${option.rut}`}</Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Nombre empresa" />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <RutTextField
              label="Rut empresa relacionada"
              name="businessRelatedRut"
              error={true}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.businessRelatedRut}
              helperText={
                formik.touched.businessRelatedRut &&
                formik.errors.businessRelatedRut
              }
              error={
                formik.touched.businessRelatedRut &&
                Boolean(formik.errors.businessRelatedRut)
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nombre empresa relacionada"
              name="businessRelatedName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.businessRelatedName}
              helperText={
                formik.touched.businessRelatedName &&
                formik.errors.businessRelatedName
              }
              error={
                formik.touched.businessRelatedName &&
                Boolean(formik.errors.businessRelatedName)
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <RutTextField
              label="Rut beneficiario"
              name="beneficiaryRut"
              required
              error={true}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.beneficiaryRut}
              helperText={
                formik.touched.beneficiaryRut && formik.errors.beneficiaryRut
              }
              error={
                formik.touched.beneficiaryRut &&
                Boolean(formik.errors.beneficiaryRut)
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nombre beneficiario"
              name="beneficiaryNames"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.beneficiaryNames}
              helperText={
                formik.touched.beneficiaryNames &&
                formik.errors.beneficiaryNames
              }
              error={
                formik.touched.beneficiaryNames &&
                Boolean(formik.errors.beneficiaryNames)
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Select
              label="Carrera"
              name="careerId"
              value={formik.values.careerId}
              required
              onChange={formik.handleChange}
            >
              <option value="">Seleccione carrera</option>
              {careers.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              label="Nombre de institución o colegio"
              name="schoolName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.schoolName}
              helperText={formik.touched.schoolName && formik.errors.schoolName}
              error={
                formik.touched.schoolName && Boolean(formik.errors.schoolName)
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Select
              label="Región"
              name="schoolRegion"
              value={formik.values.schoolRegion}
              required
              onChange={handleSelectChange}
            >
              <option value={`INVALID`}>
                Seleccione región de institución
              </option>
              {regions.map((item, index) => (
                <option key={`schoolRegion--${index}`} value={`${item.id}`}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              label="Comuna"
              name="schoolCommune"
              value={formik.values.schoolCommune}
              required
              onChange={handleSelectChange}
            >
              <option value={`INVALID`}>Seleccione una comuna</option>
              {communes?.map((item, index) => (
                <option key={`schoolRegion--${index}`} value={`${item.id}`}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              label="Puntaje PTU"
              name="psuScore"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.psuScore}
              helperText={formik.touched.psuScore && formik.errors.psuScore}
              error={formik.touched.psuScore && Boolean(formik.errors.psuScore)}
            />
          </Grid>
        </Grid>
      </Box>
      <Actions
        showBackIcon={false}
        handleBack={onClose}
        backText="Cancelar"
        disabledNext={!formik.isValid}
        handleNext={formik.handleSubmit}
      />
    </Box>
  )
}

export default StepOne
