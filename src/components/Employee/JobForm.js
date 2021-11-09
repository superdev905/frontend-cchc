import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { CurrencyTextField, DatePicker, Dialog } from '../Shared'
import { Button, Select, SubmitButton } from '../UI'
import companiesActions from '../../state/actions/companies'
import { useSuccess } from '../../hooks'
import commonActions from '../../state/actions/common'

const validationSchema = Yup.object().shape({
  admission_date: Yup.date().required('Seleccione fecha de ingreso'),
  business_id: Yup.number().required('Seleccione empresa'),
  construction_id: Yup.number().required('Seleccione obra'),
  contract_term: Yup.string().required('Seleccione obra'),
  contract_type: Yup.string().required('Seleccione obra'),
  leave_date: Yup.date().nullable(),
  leave_motive: Yup.string().nullable(),
  salary: Yup.number().required('Ingrese sueldo'),
  specialty_id: Yup.number().required('Seleccione especialidad'),
  specialty_name: Yup.string(),
  specialty_detail_id: Yup.string()
})

const HousingForm = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successMessage,
  successFunction,
  specialty_id,
  specialty_detail_id
}) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const [companies, setCompanies] = useState([])
  const [constructions, setConstructions] = useState([])
  const { isMobile } = useSelector((state) => state.ui)
  const [subSpec, setSubSpec] = useState([])
  const { specList } = useSelector((state) => state.common)

  const formik = useFormik({
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema,
    initialValues: {
      admission_date: type === 'UPDATE' ? data.admission_date : '',
      business_id: type === 'UPDATE' ? data.business_id : '',
      construction_id: type === 'UPDATE' ? data.construction_id : '',
      business_name: type === 'UPDATE' ? data.construction_id : '',
      construction_name: type === 'UPDATE' ? data.construction_id : '',
      contract_term: type === 'UPDATE' ? data.contract_term : '',
      contract_type: type === 'UPDATE' ? data.contract_type : '',
      leave_date: type === 'UPDATE' ? data.leave_date : '',
      leave_motive: type === 'UPDATE' ? data.leave_motive : '',
      salary: type === 'UPDATE' ? data.salary : '',
      specialty_id: type === 'UPDATE' ? data.specialty_id : '',
      specialty_detail_id: type === 'UPDATE' ? data.specialty_detail_id : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction(values)
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })
          changeSuccess(true, () => {
            onClose()
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

  const handleCompanyChange = (e) => {
    const { value } = e.target
    if (value === '') {
      formik.setFieldValue('business_id', value)
      formik.setFieldValue('business_name', value)
      formik.setFieldValue('construction_id', value)
      formik.setFieldValue('construction_name', value)
      setConstructions([])
    } else {
      const currentCompany = companies.find(
        (item) => item.id === parseInt(value, 10)
      )
      setConstructions(currentCompany.constructions)
      formik.setFieldValue('business_id', value)
      formik.setFieldValue('business_name', currentCompany.business_name)
      formik.setFieldValue('construction_id', '')
      formik.setFieldValue('construction_name', '')
    }
  }

  useEffect(() => {
    if (formik.values.contract_type !== 'CESANTE') {
      formik.setFieldValue('leave_date', null)
      formik.setFieldValue('leave_motive', null)
    }
  }, [formik.values.contract_type])

  useEffect(() => {
    if (formik.values.construction_id && constructions.length > 0) {
      const currentCons = constructions.find(
        (item) => item.id === parseInt(formik.values.construction_id, 10)
      )
      formik.setFieldValue('construction_name', currentCons?.name || '')
    }
  }, [formik.values.construction_id, constructions])

  useEffect(() => {
    if (formik.values.business_id && companies.length > 0) {
      const currentCompany = companies.find(
        (item) => item.id === parseInt(formik.values.business_id, 10)
      )
      formik.setFieldValue('business_name', currentCompany.business_name)
      setConstructions(currentCompany.constructions)
    } else {
      setConstructions([])
    }
  }, [formik.values.business_id, companies])

  useEffect(() => {
    if (formik.values.specialty_id && specList.length > 0) {
      setSubSpec(
        specList.find(
          (item) => item.id === parseInt(formik.values.specialty_id, 10)
        ).sub_specialties || []
      )
    } else {
      setSubSpec([])
    }
  }, [formik.values.specialty_id, specList])

  useEffect(() => {
    if (specialty_id && specialty_detail_id) {
      formik.setFieldValue('specialty_id', specialty_id)
      formik.setFieldValue('specialty_detail_id', specialty_detail_id)
    }
  }, [specialty_id, specialty_detail_id])

  useEffect(() => {
    if (open) {
      dispatch(commonActions.getSpecList())
      dispatch(companiesActions.getAvailableCompanies()).then((list) => {
        setCompanies(list)
      })
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} trabajo`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Fecha de ingreso"
                value={formik.values.admission_date}
                required
                onChange={(date) => {
                  formik.setFieldValue('admission_date', date)
                }}
                error={
                  formik.touched.admission_date &&
                  Boolean(formik.errors.admission_date)
                }
                helperText={
                  formik.touched.admission_date && formik.errors.admission_date
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Empresa"
                name="business_id"
                onChange={handleCompanyChange}
                value={formik.values.business_id}
                required
                error={
                  formik.touched.business_id &&
                  Boolean(formik.errors.business_id)
                }
                helperText={
                  formik.touched.business_id && formik.errors.business_id
                }
              >
                <option value="">Seleccione una opción</option>
                {companies.map((item, index) => (
                  <option key={`type-home--${index}`} value={`${item.id}`}>
                    {`${item.business_name}`}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Obra"
                name="construction_id"
                onChange={formik.handleChange}
                value={formik.values.construction_id}
                required
                error={
                  formik.touched.construction_id &&
                  Boolean(formik.errors.construction_id)
                }
                helperText={
                  formik.touched.construction_id &&
                  formik.errors.construction_id
                }
              >
                <option value="">Seleccione una opción</option>
                {constructions
                  .filter(
                    (item) =>
                      item.status !== 'NO_VIGENTE' && item.state !== 'DELETED'
                  )
                  .map((item, index) => (
                    <option key={`type-home--${index}`} value={`${item.id}`}>
                      {`${item.name}`}
                    </option>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Especialidad"
                required
                name="specialty_id"
                onChange={formik.handleChange}
                value={formik.values.specialty_id}
                required
                error={
                  formik.touched.specialty_id &&
                  Boolean(formik.errors.specialty_id)
                }
                helperText={
                  formik.touched.specialty_id && formik.errors.specialty_id
                }
              >
                <option value="">Seleccione una opción</option>
                {specList.map((item, index) => (
                  <option key={`specialty_id--${index}`} value={`${item.id}`}>
                    {`${item.description}`}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Detalle de Especialidad"
                required
                name="specialty_detail_id"
                onChange={formik.handleChange}
                value={formik.values.specialty_detail_id}
                required
                error={
                  formik.touched.specialty_detail_id &&
                  Boolean(formik.errors.specialty_detail_id)
                }
                helperText={
                  formik.touched.specialty_detail_id &&
                  formik.errors.specialty_detail_id
                }
              >
                <option value="">Seleccione una opción</option>
                {subSpec.map((item, index) => (
                  <option
                    key={`specialty_detail--${index}`}
                    value={`${item.id}`}
                  >
                    {`${item.description}`}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Plazo de contrato"
                name="contract_term"
                onChange={formik.handleChange}
                value={formik.values.contract_term}
                required
                error={
                  formik.touched.contract_term &&
                  Boolean(formik.errors.contract_term)
                }
                helperText={
                  formik.touched.contract_term && formik.errors.contract_term
                }
              >
                <option value="">Seleccione una opción</option>
                {['PLAZO FIJO', 'INDEFINIDO', 'POR OBRA O FAENA'].map(
                  (item, index) => (
                    <option key={`property-home--${index}`} value={`${item}`}>
                      {item}
                    </option>
                  )
                )}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Tipo de contrato"
                name="contract_type"
                onChange={formik.handleChange}
                value={formik.values.contract_type}
                required
                error={
                  formik.touched.contract_type &&
                  Boolean(formik.errors.contract_type)
                }
                helperText={
                  formik.touched.contract_type && formik.errors.contract_type
                }
              >
                <option value="">Seleccione una opción</option>
                {['EMPRESA', 'SUB CONTRATRO', 'CESANTE'].map((item, index) => (
                  <option key={`contract-type--${index}`} value={`${item}`}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Fecha de salida"
                value={formik.values.leave_date}
                required
                onChange={(date) => {
                  formik.setFieldValue('leave_date', date)
                }}
                error={
                  formik.touched.leave_date && Boolean(formik.errors.leave_date)
                }
                helperText={
                  formik.touched.leave_date && formik.errors.leave_date
                }
                disabled={formik.values.contract_type !== 'CESANTE'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Motivo finiquito"
                name="leave_motive"
                onChange={formik.handleChange}
                value={formik.values.leave_motive}
                error={
                  formik.touched.leave_motive &&
                  Boolean(formik.errors.leave_motive)
                }
                helperText={
                  formik.touched.leave_motive && formik.errors.leave_motive
                }
                disabled={formik.values.contract_type !== 'CESANTE'}
              >
                <option value="">Seleccione una opción</option>
                {['EMPRESA', 'SUB CONTRATRO', 'CESANTE'].map((item, index) => (
                  <option key={`contract-type--${index}`} value={`${item}`}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <CurrencyTextField
                label="Ingreso"
                name="salary"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.salary}
                required
                error={
                  (formik.values.admission_date || formik.touched.salary) &&
                  Boolean(formik.errors.salary)
                }
                helperText={
                  (formik.values.admission_date || formik.touched.salary) &&
                  formik.errors.salary
                }
              />
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
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} datos`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

HousingForm.defaultProps = {
  type: 'CREATE'
}

export default HousingForm
