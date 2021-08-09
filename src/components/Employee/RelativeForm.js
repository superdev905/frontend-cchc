import { useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { DatePicker, Dialog } from '../Shared'
import { Button, RutTextField, Select, SubmitButton, TextField } from '../UI'
import { rutValidation } from '../../validations'
import commonActions from '../../state/actions/common'
import { decisionList, genderList } from '../../config'
import SelectableCard from '../UI/SelectableCard/SelectableCard'
import { useSuccess } from '../../hooks'

const validationSchema = Yup.object().shape({
  run: Yup.string().test('validRUN', 'Ingrese run válido', (v) => {
    if (!v) return true
    return rutValidation(v)
  }),
  names: Yup.string().required('Ingrese nombres'),
  paternal_surname: Yup.string().required('Ingrese nombres'),
  maternal_surname: Yup.string().required('Ingrese nombres'),
  gender: Yup.string().required('Seleccione sexo'),
  born_date: Yup.date().required('Seleccione fecha de nacimiento'),
  scholarship_id: Yup.number().required('Seleccione escolaridad'),
  marital_status_id: Yup.number().required('Seleccione estado civil'),
  job_id: Yup.number().required('Seleccione ocupación/actividad'),
  nationality_id: Yup.number().required('Seleccione nacionalidad'),
  relationship_id: Yup.number().required('Seleccione parentesco'),
  legal_charge: Yup.string().required('Seleccion opcion de carga legal'),
  rsh: Yup.string('Seleccione opción'),
  rsh_percentage_id: Yup.number()
})

const EmployeeModal = ({
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
  const {
    maritalStatus,
    nationalities,
    scholarshipList,
    rshList,
    relationshipList,
    activities
  } = useSelector((state) => state.common)
  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      run: type === 'UPDATE' ? data.run : '',
      names: type === 'UPDATE' ? data.names : '',
      paternal_surname: type === 'UPDATE' ? data.paternal_surname : '',
      maternal_surname: type === 'UPDATE' ? data.maternal_surname : '',
      gender: type === 'UPDATE' ? data.gender : '',
      born_date: type === 'UPDATE' ? data.born_date : null,
      scholarship_id: type === 'UPDATE' ? data.scholarship_id : '',
      nationality_id: type === 'UPDATE' ? data.nationality_id : '',
      marital_status_id: type === 'UPDATE' ? data.marital_status_id : '',
      relationship_id: type === 'UPDATE' ? data.relationship_id : '',
      job_id: type === 'UPDATE' ? data.job_id : '',
      rsh: type === 'UPDATE' ? data.rsh : '',
      rsh_percentage_id: type === 'UPDATE' ? data.rsh_percentage_id : '',
      legal_charge: type === 'UPDATE' ? data.legal_charge : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction(values)
        .then(() => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })
          changeSuccess(true, () => {
            resetForm()
            successFunction()
            onClose()
          })
        })
        .catch((err) => {
          enqueueSnackbar(err, {
            variant: 'error'
          })
        })
    }
  })

  useEffect(() => {
    if (open) {
      dispatch(commonActions.getMaritalStatuses())
      dispatch(commonActions.getNationalities())
      dispatch(commonActions.getScholarship())
      dispatch(commonActions.getBanks())
      dispatch(commonActions.getRSH())
      dispatch(commonActions.getRelationships())
      dispatch(commonActions.getActivities())
    }
  }, [open])
  return (
    <Dialog open={open} onClose={onClose} maxWidth={'lg'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center">
          {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} pariente`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <RutTextField
                label="RUN pariente"
                name="run"
                value={formik.values.run}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.run && Boolean(formik.errors.run)}
                helperText={formik.touched.run && formik.errors.run}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                label="Nombres"
                name="names"
                required
                value={formik.values.names}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.names && Boolean(formik.errors.names)}
                helperText={formik.touched.names && formik.errors.names}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                label="Apellido paterno"
                name="paternal_surname"
                required
                value={formik.values.paternal_surname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.paternal_surname &&
                  Boolean(formik.errors.paternal_surname)
                }
                helperText={
                  formik.touched.paternal_surname &&
                  formik.errors.paternal_surname
                }
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                label="Apellido materno"
                name="maternal_surname"
                required
                value={formik.values.maternal_surname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.maternal_surname &&
                  Boolean(formik.errors.maternal_surname)
                }
                helperText={
                  formik.touched.maternal_surname &&
                  formik.errors.maternal_surname
                }
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <DatePicker
                label="Fecha de nacimiento"
                value={formik.values.born_date}
                required
                onChange={(date) => {
                  formik.setFieldValue('born_date', date)
                }}
                error={
                  formik.touched.born_date && Boolean(formik.errors.born_date)
                }
                helperText={formik.touched.born_date && formik.errors.born_date}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectableCard.Container label="Seleccione sexo" required>
                {genderList.map((item, i) => (
                  <SelectableCard
                    key={`gender-card-${item.key}-${i}`}
                    selected={item.key === formik.values.gender}
                    onClick={() => {
                      formik.setFieldTouched('gender')
                      formik.setFieldValue('gender', item.key)
                    }}
                  >
                    {item.name}
                  </SelectableCard>
                ))}
              </SelectableCard.Container>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Estado civil"
                name="marital_status_id"
                required
                value={formik.values.marital_status_id}
                onChange={formik.handleChange}
                error={
                  formik.touched.marital_status_id &&
                  Boolean(formik.errors.marital_status_id)
                }
                helperText={
                  formik.touched.marital_status_id &&
                  formik.errors.marital_status_id
                }
              >
                <option value="">Seleccione estado civil</option>
                {maritalStatus.map((item, i) => (
                  <option
                    key={`marital-status-${i}-${item.id}`}
                    value={item.id}
                  >
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Escolaridad"
                name="scholarship_id"
                required
                value={formik.values.scholarship_id}
                onChange={formik.handleChange}
                error={
                  formik.touched.scholarship_id &&
                  Boolean(formik.errors.scholarship_id)
                }
                helperText={
                  formik.touched.scholarship_id && formik.errors.scholarship_id
                }
              >
                <option value="">Seleccione escolaridad</option>
                {scholarshipList.map((item, i) => (
                  <option key={`scholarship-${i}-${item.id}`} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Nacionalidad"
                name="nationality_id"
                required
                value={formik.values.nationality_id}
                onChange={formik.handleChange}
                error={
                  formik.touched.nationality_id &&
                  Boolean(formik.errors.nationality_id)
                }
                helperText={
                  formik.touched.nationality_id && formik.errors.nationality_id
                }
              >
                <option value="">Seleccione nacionalidad</option>
                {nationalities.map((item, i) => (
                  <option key={`natinality-${i}-${item.id}`} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Parentesco"
                name="relationship_id"
                required
                value={formik.values.relationship_id}
                onChange={formik.handleChange}
                error={
                  formik.touched.relationship_id &&
                  Boolean(formik.errors.relationship_id)
                }
                helperText={
                  formik.touched.relationship_id &&
                  formik.errors.relationship_id
                }
              >
                <option value="">Seleccione parentesco</option>
                {relationshipList.map((item, i) => (
                  <option key={`relationship-${i}-${item.id}`} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Ocupación/Actividad"
                name="job_id"
                required
                value={formik.values.job_id}
                onChange={formik.handleChange}
                error={formik.touched.job_id && Boolean(formik.errors.job_id)}
                helperText={formik.touched.job_id && formik.errors.job_id}
              >
                <option value="">Seleccione opción</option>
                {activities.map((item, i) => (
                  <option key={`relationship-${i}-${item.id}`} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Carga legal"
                name="legal_charge"
                required
                value={formik.values.legal_charge}
                onChange={formik.handleChange}
                error={
                  formik.touched.legal_charge &&
                  Boolean(formik.errors.legal_charge)
                }
                helperText={
                  formik.touched.legal_charge && formik.errors.legal_charge
                }
              >
                <option value="">Seleccione opción</option>
                {decisionList.map((item, i) => (
                  <option key={`alive-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="RSH"
                name="rsh"
                value={formik.values.rsh}
                onChange={formik.handleChange}
                error={formik.touched.rsh && Boolean(formik.errors.rsh)}
                helperText={formik.touched.rsh && formik.errors.rsh}
              >
                <option value="">Seleccione rsh</option>
                {decisionList.map((item, i) => (
                  <option key={`rsh-item-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="RSH %"
                name="rsh_percentage_id"
                value={formik.values.rsh_percentage_id}
                onChange={formik.handleChange}
                error={
                  formik.touched.rsh_percentage_id &&
                  Boolean(formik.errors.rsh_percentage_id)
                }
                helperText={
                  formik.touched.rsh_percentage_id &&
                  formik.errors.rsh_percentage_id
                }
              >
                <option value="">Sin RSH %</option>
                {rshList.map((item, i) => (
                  <option
                    key={`rsh-percentage-item-${i}-${item.id}`}
                    value={item.id}
                  >
                    {item.description}
                  </option>
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
              disabled={!formik.isValid}
              success={success}
              loading={formik.isSubmitting}
            >
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} datos`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

EmployeeModal.defaultProps = {
  type: 'CREATE'
}

export default EmployeeModal
