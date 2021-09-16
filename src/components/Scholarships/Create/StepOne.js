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

const validationSchema = Yup.object({
  scholarship: Yup.string().required('Seleccione beca'),
  employeeRut: Yup.string()
    .required('Ingrese rut trabajador')
    .test('Check Rut', 'Ingrese Rut válido', (v) => rutValidation(v)),
  employeeName: Yup.string().required('Ingrese nombre trabajador'),
  businessRut: Yup.string()
    .required('Ingrese rut empresa')
    .test('Check Rut', 'Ingrese Rut válido', (v) => rutValidation(v)),
  businessName: Yup.string().required('Ingrese nombre empresa'),
  businessRelatedRut: Yup.string()
    .required('Ingrese rut empresa relacionada')
    .test('Check Rut', 'Ingrese Rut válido', (v) => rutValidation(v)),
  businessRelatedName: Yup.string().required(
    'Ingrese nombre empresa relacionada'
  ),
  beneficiaryRut: Yup.string()
    .required('Ingrese rut beneficiario')
    .test('Check Rut', 'Ingrese Rut válido', (v) => rutValidation(v)),
  beneficiaryNames: Yup.string().required('Ingrese nombre beneficiario'),
  careerId: Yup.string().required('Ingrese nombre carrera'),
  schoolName: Yup.string().required('Ingrese nombre de institución o colegio'),
  schoolRegion: Yup.string().required(
    'Seleccione región de institución o colegio'
  ),
  psuScore: Yup.string().required('Ingrese puntaje psuScore o simil')
})

const StepOne = ({ open, onClose }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { regions } = useSelector((state) => state.common)
  const { create } = useSelector((state) => state.companies)
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
      employeeName: create?.application?.employeeName || '',
      employeeRut: create?.application?.employeeRut || '',
      businessName: create?.application?.businessName || '',
      businessRut: create?.application?.businessRut || '',
      businessRelatedName: create?.application?.businessName || '',
      businessRelatedRut: create?.application?.businessRut || '',
      beneficiaryNames: create?.application?.beneficiaryNames || '',
      beneficiaryRut: create?.application?.beneficiaryRut || '',
      careerId: create?.application?.careerId || '',
      schoolName: create?.application?.schoolName || '',
      schoolRegion: create?.application?.schoolRegion || '',
      psuScore: create?.application?.psuScore || ''
    },

    onSubmit: (values) => {
      dispatch(
        companiesActions.updateCreate({
          ...create,
          application: { ...create.application, ...values },
          step: create.step + 1
        })
      )
    }
  })

  const scholarshipsTypes = [
    'BECA DE EXCELENCIA ACADÉMICA',
    'BECA DE PREMIO MEJORES ALUMNOS (PMA)',
    'BECA EDUCACIÓN SUPERIOR HIJO (BESH)',
    'BECA EDUCACIÓN SUPERIOR TRABAJADOR (BEST)'
  ]

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'schoolRegion': {
        const schoolRegion = regions.find(
          (item) => item.id === parseInt(value, 10)
        )
        formik.setFieldValue('schoolRegion', schoolRegion.id)
        break
      }
      default:
        throw new Error('Error')
    }
  }

  const onEmployeeSelect = (__, values) => {
    setSelectedEmployee(values)
    const idEmployee = values ? values.id : ''
    const nameEmployee = values ? values.employeeName : ''

    formik.setFieldValue('employee_id', idEmployee)
    formik.setFieldValue('employeeName', nameEmployee)
  }

  const onCompanySelect = (__, values) => {
    setSelectedCompany(values)
    const idCompany = values ? values.id : ''
    const nameCompany = values ? values.businessName : ''

    formik.setFieldValue('business_id', idCompany)
    formik.setFieldValue('businessName', nameCompany)
  }

  /*
  useEffect(() => {
    dispatch(companiesActions.getCompanies()).then((list) => {
      setCompanies(list)
      console.log(list)
    })
  })
*/

  useEffect(() => {
    if (open) {
      dispatch(companiesActions.getCompanies({ state: 'CREATED' }, false)).then(
        (list) => {
          setCompanies(list)
          console.log(list)
        }
      )
    }
  }, [open])

  useEffect(() => {
    if (open) {
      dispatch(employeeActions.getEmployees({ state: 'CREATED' }, false)).then(
        (list) => {
          setEmployees(list)
        }
      )
    }
  }, [open])

  useEffect(() => {
    if (formik.values.schoolRegion && regions.length > 0) {
      handleSelectChange({
        target: { name: 'schoolRegion', value: formik.values.schoolRegion }
      })
    }
  }, [formik.values.schoolRegion, regions])

  useEffect(() => {
    dispatch(commonActions.getRegions())
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
              <option value="">Seleccione Lugar</option>
              {scholarshipsTypes.map((item, i) => (
                <option key={`plce-${i}-${item}`} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <RutTextField
              label="Rut trabajador"
              name="employeeRut"
              required
              error={true}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.employeeRut}
              helperText={
                formik.touched.employeeRut && formik.errors.employeeRut
              }
              error={
                formik.touched.employeeRut && Boolean(formik.errors.employeeRut)
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              options={employees}
              value={selectedEmployee || ''}
              getOptionSelected={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.employeeName || ''}
              onChange={onEmployeeSelect}
              required
              renderOption={(option) => (
                <Box>
                  <Typography>
                    <strong>{option.employeeName}</strong>
                  </Typography>
                  <Typography>{`Rut: ${option.rut}`}</Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Nombre trabajador"
                  //  placeholder="Nombre de trabajador"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <RutTextField
              label="Rut empresa"
              name="businessRut"
              required
              error={true}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.businessRut}
              helperText={
                formik.touched.businessRut && formik.errors.businessRut
              }
              error={
                formik.touched.businessRut && Boolean(formik.errors.businessRut)
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              options={companies}
              value={selectedCompany || ''}
              getOptionLabel={(option) => option.businessName || ''}
              onChange={onCompanySelect}
              renderOption={(option) => (
                <Box>
                  <Typography>
                    {`Razón social: `}
                    <strong>{option.businessName}</strong>
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
            <TextField
              label="Nombre carrera"
              name="careerId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.careerId}
              helperText={formik.touched.careerId && formik.errors.careerId}
              error={formik.touched.careerId && Boolean(formik.errors.careerId)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
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
              onChange={formik.handleChange}
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
            <TextField
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
        disableNext={!formik.isValid}
        handleNext={formik.handleSubmit}
      />
    </Box>
  )
}

export default StepOne
