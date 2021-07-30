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

const validationSchema = Yup.object().shape({
  admission_date: Yup.date().required('Seleccione fecha de ingreso'),
  business_id: Yup.number().required('Seleccione empresa'),
  construction_id: Yup.number().required('Seleccione obra'),
  contract_term: Yup.string().required('Seleccione obra'),
  contract_type: Yup.string().required('Seleccione obra'),
  leave_date: Yup.date(),
  leave_motive: Yup.string().required('Seleccione motivo'),
  salary: Yup.number().required('Ingrese sueldo')
})

const HousingForm = ({
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
  const [companies, setCompanies] = useState([])
  const [constructions, setConstructions] = useState([])
  const { isMobile } = useSelector((state) => state.ui)

  const formik = useFormik({
    validateOnMount: true,
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
      salary: type === 'UPDATE' ? data.salary : ''
    },
    onSubmit: (values) => {
      submitFunction(values)
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })
          onClose()
          changeSuccess(true)
          if (successFunction) {
            successFunction()
          }
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
    if (formik.values.construction_id && constructions.length > 0) {
      const currentCons = constructions.find(
        (item) => item.id === parseInt(formik.values.construction_id, 10)
      )
      formik.setFieldValue('construction_name', currentCons.business_name)
    }
  }, [formik.values.construction_id, constructions])

  useEffect(() => {
    if (formik.values.business_id && companies.length > 0) {
      const currentCompany = companies.find(
        (item) => item.id === parseInt(formik.values.business_id, 10)
      )
      console.log(currentCompany)
      formik.setFieldValue('business_name', currentCompany.business_name)
      setConstructions(currentCompany.constructions)
    } else {
      setConstructions([])
    }
  }, [formik.values.business_id, companies])

  useEffect(() => {
    if (open) {
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
                onChange={formik.handleChange}
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
                {constructions.map((item, index) => (
                  <option key={`type-home--${index}`} value={`${item.id}`}>
                    {`${item.business_name}`}
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Motivo finiquito"
                name="leave_motive"
                onChange={formik.handleChange}
                value={formik.values.leave_motive}
                required
                error={
                  formik.touched.leave_motive &&
                  Boolean(formik.errors.leave_motive)
                }
                helperText={
                  formik.touched.leave_motive && formik.errors.leave_motive
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
              <CurrencyTextField
                label="Ingreso"
                name="salary"
                onChange={formik.handleChange}
                value={formik.values.salary}
                required
                error={formik.touched.salary && Boolean(formik.errors.salary)}
                helperText={formik.touched.salary && formik.errors.salary}
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