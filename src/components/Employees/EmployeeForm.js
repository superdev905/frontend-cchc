import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  Radio,
  Typography
} from '@material-ui/core'
import { DatePicker, Dialog } from '../Shared'
import { Button, RutTextField, Select, SubmitButton, TextField } from '../UI'
import { isPollListAnswered, rutValidation } from '../../validations'
import commonActions from '../../state/actions/common'
import pollActions from '../../state/actions/poll'
import { decisionList } from '../../config'
import { PollsModule } from '../Polls'

const statusList = ['REALIZADO', 'EN TRAMITE']
const disabilityType = [
  'DISCAPACIDAD FISICA O MOTORA',
  'DISCAPACIDAD SENSORIAL',
  'DISCAPACIDAD INTELECTUAL',
  'DISCAPACIDAD PSÍQUICA'
]

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: `15px 0px`
  },
  label: {
    fontSize: 14,
    marginBottom: 5
  }
}))

const disabilitySchema = Yup.object().shape({
  credential_disability: Yup.string().required('Seleccione opción'),
  disability_type: Yup.string().required('Seleccione tipo'),
  disability_percentage: Yup.string().required(
    'Seleccione porcentaje de discapacidad'
  )
})

const validationSchema = Yup.object().shape({
  run: Yup.string()
    .required('Ingrese run')
    .test('validRUN', 'Ingrese run válido', (v) => rutValidation(v)),
  names: Yup.string().required('Ingrese nombres'),
  paternal_surname: Yup.string().required('Ingrese nombres'),
  maternal_surname: Yup.string(),
  gender: Yup.string().required('Seleccione sexo'),
  born_date: Yup.date().required('Seleccione fecha de nacimiento'),
  scholarship_id: Yup.number().required('Seleccione escolaridad'),
  marital_status_id: Yup.number().required('Seleccione estado civil'),
  disability: Yup.string().required('Seleccione opción'),
  credential_disability: Yup.string(),
  recognize: Yup.string().required('Seleccione opción'),
  nationality_id: Yup.number().required('Seleccione nacionalidad'),
  alive: Yup.string().required('Seleccione opción'),
  //  bank_id: Yup.number('Seleccione banco'),
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
  const classes = useStyles()
  const dispatch = useDispatch()
  const [hasDisability, setHasDisability] = useState(
    type === 'UPDATE' ? data.disability === 'SI' : false
  )
  const { enqueueSnackbar } = useSnackbar()
  const { maritalStatus, nationalities, scholarshipList, banks, rshList } =
    useSelector((state) => state.common)
  const { moduleResponse } = useSelector((state) => state.poll)
  const { module: currentModule } = useSelector((state) => state.ui)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema: hasDisability
      ? validationSchema.concat(disabilitySchema)
      : validationSchema,
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
      disability_type: type === 'UPDATE' ? data.disability_type : '',
      disability_percentage:
        type === 'UPDATE' ? data.disability_percentage : '',
      recognize: type === 'UPDATE' ? data.recognize : '',
      nationality_id: type === 'UPDATE' ? data.nationality_id : '',
      alive: type === 'UPDATE' ? data.alive : '',
      bank_id: type === 'UPDATE' ? data.bank_id : '',
      account_type: type === 'UPDATE' ? data.account_type : '',
      account_number: type === 'UPDATE' ? data.account_number : '',
      rsh: type === 'UPDATE' ? data.rsh : '',
      rsh_percentage: type === 'UPDATE' ? data.rsh_percentage : '',
      rsh_status: type === 'UPDATE' ? data.rsh_status : ''
    },
    onSubmit: (values) => {
      const submitData = { ...values }
      if (submitData.bank_id === '') {
        delete submitData.bank_id
      }
      if (submitData.rsh_status === '') {
        delete submitData.rsh_status
      }
      submitFunction(submitData)
        .then((result) => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, {
            variant: 'success',
            autoHideDuration: 1500
          })
          onClose()
          if (successFunction) {
            successFunction(result)
          }
          if (type === 'CREATE') {
            moduleResponse.pollStatus.forEach((item) => {
              dispatch(
                pollActions.updateResponse(item.responseId, {
                  source_module: currentModule,
                  related_data: `${values.names} ${values.paternal_surname}`,
                  related_data_id: result.id
                })
              )
            })
          }
        })
        .catch((err) => {
          enqueueSnackbar(err, {
            variant: 'error'
          })
        })
    }
  })

  const getPollValidation = () => {
    if (type === 'UPDATE') return false
    return !isPollListAnswered(moduleResponse)
  }

  useEffect(() => {
    if (formik.values.disability === 'NO') {
      formik.setFieldValue('credential_disability', '')
      formik.setFieldValue('disability_type', '')
      formik.setFieldValue('disability_percentage', '')

      setHasDisability(false)
    } else {
      setHasDisability(true)
    }
  }, [formik.values.disability, hasDisability])

  useEffect(() => {
    if (formik.values.rsh === 'NO') {
      formik.setFieldValue('rsh_percentage', '')
    }
  }, [formik.values.rsh])

  useEffect(() => {
    const format = formik.values.run
    const newFormat = format.replace(/\./g, '').replace(/-/g, '').slice(0, -1)
    if (
      formik.values.bank_id === '1' &&
      formik.values.account_type === 'VISTA'
    ) {
      formik.setFieldValue('account_number', newFormat)
    }
  }, [formik.values.bank_id, formik.values.account_type])

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
          {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} trabajador`}
        </Typography>
        <Box p={2}>
          <Box>
            <Typography className={classes.heading}>Información </Typography>
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
                  value={formik.values.born_date}
                  onChange={(date) => {
                    formik.setFieldValue('born_date', date)
                  }}
                  error={
                    formik.touched.born_date && Boolean(formik.errors.born_date)
                  }
                  helperText={
                    formik.touched.born_date && formik.errors.born_date
                  }
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
                    formik.touched.scholarship_id &&
                    formik.errors.scholarship_id
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
                    formik.touched.nationality_id &&
                    formik.errors.nationality_id
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
            </Grid>

            <Typography className={classes.heading}>Discapacidad </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Select
                  label="Discapacidad"
                  name="disability"
                  required
                  value={formik.values.disability}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.disability &&
                    Boolean(formik.errors.disability)
                  }
                  helperText={
                    formik.touched.disability && formik.errors.disability
                  }
                >
                  <option value="">Seleccione opción</option>
                  {decisionList.map((item, i) => (
                    <option key={`gender-${i}-${item}`} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={4}>
                <Select
                  required={hasDisability}
                  label="Credencial"
                  name="credential_disability"
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
                  disabled={formik.values.disability === 'NO'}
                >
                  <option value="">Seleccione opción</option>
                  {decisionList.map((item, i) => (
                    <option key={`credential-${i}-${item}`} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12} md={4}>
                <Select
                  label="Tipo de discapacidad"
                  name="disability_type"
                  value={formik.values.disability_type}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.disability_type &&
                    Boolean(formik.errors.disability_type)
                  }
                  helperText={
                    formik.touched.disability_type &&
                    formik.errors.disability_type
                  }
                  disabled={formik.values.disability === 'NO'}
                >
                  <option value="">Seleccione tipo</option>
                  {disabilityType.map((item, i) => (
                    <option key={`credential-${i}-${item}`} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Discapacidad %"
                  name="disability_percentage"
                  required
                  value={formik.values.disability_percentage}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.disability_percentage &&
                    Boolean(formik.errors.disability_percentage)
                  }
                  helperText={
                    formik.touched.disability_percentage &&
                    formik.errors.disability_percentage
                  }
                  disabled={formik.values.disability === 'NO'}
                />
              </Grid>
            </Grid>
            <Typography className={classes.heading}>
              Información económica
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={4}>
                <Select
                  label="Banco"
                  name="bank_id"
                  value={formik.values.bank_id}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.bank_id && Boolean(formik.errors.bank_id)
                  }
                  helperText={formik.touched.bank_id && formik.errors.bank_id}
                >
                  <option value="">Sin banco</option>
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
                  <option value="">Sin tipo de cuenta</option>
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
                    formik.touched.account_number &&
                    formik.errors.account_number
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
                  <option value="">Seleccione opción</option>
                  {decisionList.map((item, i) => (
                    <option key={`rsh-item-${i}-${item.id}`} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Select
                  label="RSH %"
                  name="rsh_percentage"
                  disabled={formik.values.rsh === 'NO'}
                  value={formik.values.rsh_percentage}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.rsh_percentage &&
                    Boolean(formik.errors.rsh_percentage)
                  }
                  helperText={
                    formik.touched.rsh_percentage &&
                    formik.errors.rsh_percentage
                  }
                >
                  <option value="">Seleccione opción </option>
                  {rshList.map((item, i) => (
                    <option
                      key={`rsh-item-${i}-${item.id}`}
                      value={item.description}
                    >
                      {item.description}
                    </option>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <Select
                  label="Estado RSH"
                  name="rsh_status"
                  disabled={formik.values.rsh === 'NO'}
                  value={formik.values.rsh_status}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.rsh_status &&
                    Boolean(formik.errors.rsh_status)
                  }
                  helperText={
                    formik.touched.rsh_status && formik.errors.rsh_status
                  }
                  readOnly={type === 'VIEW'}
                  InputProps={{
                    classes: {
                      disabled: classes.disabled
                    }
                  }}
                >
                  <option value="">Seleccione estado</option>
                  {statusList.map((item, i) => (
                    <option key={`rsh_status-item-${i}-${item}`} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Typography className={classes.heading}>Otros</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={4}>
                <InputLabel className={classes.label} required>
                  Vivo
                </InputLabel>
                <Box>
                  <FormControlLabel
                    value="end"
                    control={
                      <Radio
                        color="primary"
                        checked={formik.values.alive === 'SI'}
                        onChange={() => {
                          formik.setFieldValue('alive', 'SI')
                        }}
                      />
                    }
                    label="SI"
                  />
                  <FormControlLabel
                    value="end"
                    control={
                      <Radio
                        color="primary"
                        checked={formik.values.alive === 'NO'}
                        onChange={() => {
                          formik.setFieldValue('alive', 'NO')
                        }}
                      />
                    }
                    label="NO"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Select
                  label="Pertenece a Reconocer"
                  name="recognize"
                  onChange={formik.handleChange}
                  value={formik.values.recognize}
                  required
                  error={
                    formik.touched.recognize && Boolean(formik.errors.recognize)
                  }
                  helperText={
                    formik.touched.recognize && formik.errors.recognize
                  }
                >
                  <option value="">Seleccione una opción</option>
                  {decisionList.map((item, index) => (
                    <option key={`region--${index}`} value={`${item}`}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Box>
          <Box>{type === 'CREATE' && <PollsModule />}</Box>
          <Box textAlign="center" marginTop="10px">
            <Button onClick={onClose} variant="outlined">
              Cancelar
            </Button>
            <SubmitButton
              onClick={formik.handleSubmit}
              disabled={
                !formik.isValid || formik.isSubmitting || getPollValidation()
              }
            >
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} trabajador`}
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
