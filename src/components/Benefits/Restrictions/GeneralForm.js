import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid } from '@material-ui/core'
import { CurrencyTextField } from '../../Shared'
import { Button, Select, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'
import { genderList, decisionList } from '../../../config'
import commonActions from '../../../state/actions/common'
import { generalSchema } from './schemas'
import { formatText } from '../../../formatters'

const activityTypes = ['INDIVIDUAL', 'MASIVO']
const previsionList = ['N/A', 'FONASA A', 'TODOS EXCEPTO FONASA A']
const inscribers = ['TRABAJADOR', 'EMPRESA']
const fundingList = ['PROYECTO SOCIAL', 'GOBIERNO', 'PROPIA EMPRESA', 'OTRO']

const General = ({
  onCancel,
  data,
  successMessage,
  submitFunction,
  successFunction
}) => {
  const dispatch = useDispatch()
  const { success, changeSuccess } = useSuccess()
  const { enqueueSnackbar } = useSnackbar()
  const { nationalities, rshList } = useSelector((state) => state.common)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema: generalSchema,
    initialValues: {
      nationalityId: data.nationalityId || '',
      nationalityName: data.nationalityName || '',
      rshId: data.rshId || '',
      rshName: data.rshName || '',
      legalCharge: data.legalCharge || '',
      prevision: data.prevision || '',
      retired: data.retired || '',
      belongsToReconocer: data.belongsToReconocer || '',
      isAdult: data.isAdult || '',
      gender: data.gender || '',
      activityType: data.activityType || '',
      inscriber: data.inscriber || '',
      funding: data.funding || '',
      maxSalary: data.maxSalary || ''
    },
    onSubmit: (values) => {
      submitFunction(values)
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            enqueueSnackbar(successMessage, { variant: 'success' })
            if (successFunction) {
              successFunction()
            }
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })

  useEffect(() => {
    const { nationalityId } = formik.values
    if (nationalityId && nationalities.length > 0) {
      const currentNationality = nationalities.find(
        (item) => item.id === parseInt(nationalityId, 10)
      )
      formik.setFieldValue('nationalityName', currentNationality.description)
    } else {
      formik.setFieldValue('nationalityName', '')
    }
  }, [formik.values.nationalityId, nationalities])

  useEffect(() => {
    const { nationalityId } = formik.values
    if (nationalityId === '') {
      formik.setFieldValue('nationalityId', '')
      formik.setFieldValue('nationalityName', '')
    }
  }, [formik.values.nationalityId, nationalities])

  useEffect(() => {
    const { rshId } = formik.values
    if (rshId && rshList.length > 0) {
      const currentRSH = rshList.find((item) => item.id === parseInt(rshId, 10))
      formik.setFieldValue('rshName', currentRSH.description)
    } else {
      formik.setFieldValue('rshName', '')
    }
  }, [formik.values.rshId, rshList])

  useEffect(() => {
    const { rshId } = formik.values
    if (rshId === '') {
      formik.setFieldValue('rshId', '')
      formik.setFieldValue('rshName', '')
    }
  }, [formik.values.rshId, rshList])

  useEffect(() => {
    dispatch(commonActions.getNationalities())
    dispatch(commonActions.getRSH())
  }, [])

  return (
    <Box>
      <Box>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Select
                label="Nacionalidad"
                name="nationalityId"
                required
                value={formik.values.nationalityId}
                onChange={formik.handleChange}
                error={
                  formik.touched.nationalityId &&
                  Boolean(formik.errors.nationalityId)
                }
                helperText={
                  formik.touched.nationalityId && formik.errors.nationalityId
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
            <Grid item xs={12} md={6}>
              <Select
                label="RSH %"
                name="rshId"
                value={formik.values.rshId}
                onChange={formik.handleChange}
                error={formik.touched.rshId && Boolean(formik.errors.rshId)}
                helperText={formik.touched.rshId && formik.errors.rshId}
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
            <Grid item xs={12} md={6}>
              <Select
                label="Carga legal"
                required
                name="legalCharge"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.legalCharge}
                helperText={
                  formik.touched.legalCharge && formik.errors.legalCharge
                }
                error={
                  formik.touched.legalCharge &&
                  Boolean(formik.errors.legalCharge)
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
            <Grid item xs={12} md={6}>
              <Select
                label="Previsión"
                required
                name="prevision"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.prevision}
                helperText={formik.touched.prevision && formik.errors.prevision}
                error={
                  formik.touched.prevision && Boolean(formik.errors.prevision)
                }
              >
                <option value="">Seleccione prevision</option>
                {previsionList.map((item) => (
                  <option value={item}>
                    {formatText.capitalizeString(item)}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Jubilado"
                required
                name="retired"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.retired}
                helperText={formik.touched.retired && formik.errors.retired}
                error={formik.touched.retired && Boolean(formik.errors.retired)}
              >
                <option value="">Seleccione estado de jubilación</option>
                {decisionList.map((item) => (
                  <option value={item}>
                    {formatText.capitalizeString(item)}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Pertenece a reconocer"
                required
                name="belongsToReconocer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.belongsToReconocer}
                helperText={
                  formik.touched.belongsToReconocer &&
                  formik.errors.belongsToReconocer
                }
                error={
                  formik.touched.belongsToReconocer &&
                  Boolean(formik.errors.belongsToReconocer)
                }
              >
                <option value="">Seleccione opcion</option>
                {decisionList.map((item) => (
                  <option value={item}>
                    {formatText.capitalizeString(item)}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Edad"
                name="isAdult"
                required
                value={formik.values.isAdult}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.isAdult && Boolean(formik.errors.isAdult)}
                helperText={formik.touched.isAdult && formik.errors.isAdult}
                inputProps={{ maxLength: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Sexo"
                required
                name="gender"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
                helperText={formik.touched.gender && formik.errors.gender}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
              >
                <option value="">Seleccione estado civil</option>
                {genderList.map((item, i) => (
                  <option key={`gender-${i}-${item.key}`} value={item.key}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Tipo de actividad por participantes"
                required
                name="activityType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.activityType}
                helperText={
                  formik.touched.activityType && formik.errors.activityType
                }
                error={
                  formik.touched.activityType &&
                  Boolean(formik.errors.activityType)
                }
              >
                <option value="">Seleccione opcion</option>
                {activityTypes.map((item) => (
                  <option value={item}>
                    {formatText.capitalizeString(item)}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Quien inscribe"
                required
                name="inscriber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.inscriber}
                helperText={formik.touched.inscriber && formik.errors.inscriber}
                error={
                  formik.touched.inscriber && Boolean(formik.errors.inscriber)
                }
              >
                <option value="">Seleccione quien inscribe</option>
                {inscribers.map((item) => (
                  <option value={item}>
                    {formatText.capitalizeString(item)}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Financiamiento"
                required
                name="funding"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.funding}
                helperText={formik.touched.funding && formik.errors.funding}
                error={formik.touched.funding && Boolean(formik.errors.funding)}
              >
                <option value="">Seleccione financiamiento</option>
                {fundingList.map((item) => (
                  <option value={item}>
                    {formatText.capitalizeString(item)}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <CurrencyTextField
                label="Renta tope para postular"
                required
                name="maxSalary"
                value={formik.values.maxSalary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.maxSalary && Boolean(formik.errors.maxSalary)
                }
                helperText={formik.touched.maxSalary && formik.errors.maxSalary}
              />
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

General.defaultProps = {
  type: 'CREATE'
}

export default General
