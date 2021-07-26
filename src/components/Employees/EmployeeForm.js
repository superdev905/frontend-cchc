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
import { decisionList } from '../../config'

const validationSchema = Yup.object().shape({
  run: Yup.string()
    .required('Ingrese run')
    .test('validRUN', 'Ingrese run válido', (v) => rutValidation(v)),
  names: Yup.string().required('Ingrese nombres'),
  paternal_surname: Yup.string().required('Ingrese nombres'),
  maternal_surname: Yup.string().required('Ingrese nombres'),
  gender: Yup.string().required('Seleccione sexo'),
  born_date: Yup.date().required('Seleccione fecha de nacimiento'),
  scholarship_id: Yup.number().required('Seleccione escolaridad'),
  marital_status_id: Yup.number().required('Seleccione estado civil'),
  disability: Yup.string().required('Seleccione opción'),
  credential_disability: Yup.string(),
  recognize: Yup.string().required('Seleccione opción'),
  nationality_id: Yup.number().required('Seleccione nacionalidad'),
  alive: Yup.string().required('Seleccione opción'),
  bank_id: Yup.number('Seleccione banco'),
  account_type: Yup.string('Seleccione tipo de cuenta'),
  account_number: Yup.string('Seleccione número de cuenta'),
  rsh: Yup.string('Seleccione opción'),
  rsh_percentage: Yup.string('Seleccione opción')
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
  const { maritalStatus, nationalities, scholarshipList, banks, rshList } =
    useSelector((state) => state.common)
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
      marital_status_id: type === 'UPDATE' ? data.marital_status_id : '',
      disability: type === 'UPDATE' ? data.disability : '',
      credential_disability:
        type === 'UPDATE' ? data.credential_disability : '',
      recognize: type === 'UPDATE' ? data.recognize : '',
      nationality_id: type === 'UPDATE' ? data.nationality_id : '',
      alive: type === 'UPDATE' ? data.alive : '',
      bank_id: type === 'UPDATE' ? data.bank_id : '',
      account_type: type === 'UPDATE' ? data.account_type : '',
      account_number: type === 'UPDATE' ? data.account_number : '',
      rsh: type === 'UPDATE' ? data.rsh : '',
      rsh_percentage: type === 'UPDATE' ? data.rsh_percentage : ''
    },
    onSubmit: (values) => {
      submitFunction(values).then(() => {
        formik.setSubmitting(false)
        enqueueSnackbar(successMessage, {
          variant: 'success',
          autoHideDuration: 1500
        })
        successFunction()
      })
    }
  })

  useEffect(() => {
    dispatch(commonActions.getMaritalStatuses())
    dispatch(commonActions.getNationalities())
    dispatch(commonActions.getScholarship())
    dispatch(commonActions.getBanks())
    dispatch(commonActions.getRSH())
  }, [])
  return (
    <Dialog open={open} onClose={onClose} maxWidth={'lg'}>
      <Box>
        <Typography variant="h6" align="center">
          Nuevo trabajador
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <RutTextField
                label="Run"
                name="run"
                required
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
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Sexo"
                name="gender"
                required
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
              >
                <option value="">Seleccione sexo</option>
                {['MASCULINO', 'FEMENINO', 'INDETERMINADO'].map((item, i) => (
                  <option key={`gender-${i}-${item}`} value={item}>
                    {item}
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
                label="Discapacidad"
                name="disability"
                required
                value={formik.values.disability}
                onChange={formik.handleChange}
                error={
                  formik.touched.disability && Boolean(formik.errors.disability)
                }
                helperText={
                  formik.touched.disability && formik.errors.disability
                }
              >
                <option value="">Seleccione escolaridad</option>
                {decisionList.map((item, i) => (
                  <option key={`gender-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Crendencial de discapacidad"
                name="credential_disability"
                required
                value={formik.values.credential_disability}
                onChange={formik.handleChange}
                error={
                  formik.touched.credential_disability &&
                  Boolean(formik.errors.credential_disability)
                }
                helperText={
                  formik.touched.credential_disability &&
                  formik.errors.credential_disability
                }
              >
                <option value="">Seleccione escolaridad</option>
                {decisionList.map((item, i) => (
                  <option key={`credential-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Reconocer"
                name="recognize"
                required
                value={formik.values.recognize}
                onChange={formik.handleChange}
                error={
                  formik.touched.recognize && Boolean(formik.errors.recognize)
                }
                helperText={formik.touched.recognize && formik.errors.recognize}
              >
                <option value="">Seleccione opción</option>
                {decisionList.map((item, i) => (
                  <option key={`option-r-${i}-${item}`} value={item}>
                    {item}
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
                label="Vivo"
                name="alive"
                required
                value={formik.values.alive}
                onChange={formik.handleChange}
                error={formik.touched.alive && Boolean(formik.errors.alive)}
                helperText={formik.touched.alive && formik.errors.alive}
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
                label="Banco"
                name="bank_id"
                value={formik.values.bank_id}
                onChange={formik.handleChange}
                error={formik.touched.bank_id && Boolean(formik.errors.bank_id)}
                helperText={formik.touched.bank_id && formik.errors.bank_id}
              >
                <option value="">Seleccione escolaridad</option>
                {banks.map((item, i) => (
                  <option key={`gender-${i}-${item}`} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                label="Tipo de cuenta"
                name="account_type"
                value={formik.values.account_type}
                onChange={formik.handleChange}
                error={
                  formik.touched.account_type &&
                  Boolean(formik.errors.account_type)
                }
                helperText={
                  formik.touched.account_type && formik.errors.account_type
                }
              >
                <option value="">Seleccione escolaridad</option>
                {['CUENTA CORRIENTE', 'AHORRO', 'VISTA'].map((item, i) => (
                  <option key={`account-type-${i}-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                label="Número de cuenta"
                name="account_number"
                value={formik.values.account_number}
                onChange={formik.handleChange}
                error={
                  formik.touched.account_number &&
                  Boolean(formik.errors.account_number)
                }
                helperText={
                  formik.touched.account_number && formik.errors.account_number
                }
              />
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
                <option value="">Seleccione escolaridad</option>
                {rshList.map((item, i) => (
                  <option key={`rsh-item-${i}-${item.id}`} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                label="RSH %"
                name="rsh_percentage"
                value={formik.values.rsh_percentage}
                onChange={formik.handleChange}
                error={
                  formik.touched.rsh_percentage &&
                  Boolean(formik.errors.rsh_percentage)
                }
                helperText={
                  formik.touched.rsh_percentage && formik.errors.rsh_percentage
                }
              />
            </Grid>
          </Grid>
          <Box textAlign="center" marginTop="10px">
            <Button variant="outlined">Cancelar </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              disabled={!formik.isValid}
            >
              Crear Ficha
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
