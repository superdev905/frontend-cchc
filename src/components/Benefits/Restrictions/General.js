import { capitalize } from 'lodash'
import * as Yup from 'yup'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Box, Grid, Typography } from '@material-ui/core'
import { CurrencyTextField, Dialog } from '../../Shared'
import { Button, Select, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'
import { genderList, decisionList } from '../../../config'
import commonActions from '../../../state/actions/common'
import benefitsActions from '../../../state/actions/benefits'

const activityTypes = ['INDIVIDUAL', 'MASIVO']
const previsionList = ['N/A', 'FONASA A', 'TODOS EXCEPTO FONASA A']
const inscribers = ['TRABAJADOR', 'EMPRESA']
const fundingList = ['PROYECTO SOCIAL', 'GOBIERNO', 'PROPIA EMPRESA', 'OTRO']

const validationSchema = Yup.object().shape({
  nationalityId: Yup.string().required('Seleccione nacionalidad'),
  rshId: Yup.string().required('Seleccione rsh'),
  legalCharge: Yup.string().required('Seleccione carga legal'),
  prevision: Yup.string().required('Seleccione previsión'),
  retired: Yup.string().required('Seleccione estado de jubilación'),
  belongsToReconocer: Yup.string().required(
    'Seleccione si pertenece a reconocer'
  ),
  isAdult: Yup.string().required('Ingrese edad'),
  gender: Yup.string().required('Seleccione genero'),
  activityType: Yup.string().required('Seleccione tipo de actividad'),
  inscriber: Yup.string().required('Seleccione quien inscribe'),
  funding: Yup.string().required('Seleccione financiamiento'),
  maxSalary: Yup.string().required('Ingrese renta')
})

const General = ({ open, onClose, type, benefit }) => {
  const dispatch = useDispatch()
  const { success } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)
  const { create } = useSelector((state) => state.benefits)
  const { nationalities, rshList } = useSelector((state) => state.common)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      nationalityId:
        type === 'UPDATE' ? benefit.generalRestriction.nationalityId : '',
      nationalityName:
        type === 'UPDATE' ? benefit.generalRestriction.nationalityName : '',
      rshId: type === 'UPDATE' ? benefit.generalRestriction.rshId : '',
      rshName: type === 'UPDATE' ? benefit.generalRestriction.rshName : '',
      legalCharge:
        type === 'UPDATE' ? benefit.generalRestriction.legalCharge : '',
      prevision: type === 'UPDATE' ? benefit.generalRestriction.prevision : '',
      retired: type === 'UPDATE' ? benefit.generalRestriction.retired : '',
      belongsToReconocer:
        type === 'UPDATE' ? benefit.generalRestriction.belongsToReconocer : '',
      isAdult: type === 'UPDATE' ? benefit.generalRestriction.isAdult : '',
      gender: type === 'UPDATE' ? benefit.generalRestriction.gender : '',
      activityType:
        type === 'UPDATE' ? benefit.generalRestriction.activityType : '',
      inscriber: type === 'UPDATE' ? benefit.generalRestriction.inscriber : '',
      funding: type === 'UPDATE' ? benefit.generalRestriction.funding : '',
      maxSalary: type === 'UPDATE' ? benefit.generalRestriction.maxSalary : ''
    },
    onSubmit: (values) => {
      const data = {
        ...create,
        benefit: {
          ...create.benefit,
          generalRestriction: values
        }
      }
      if (create.type === 'CREATE') {
        dispatch(
          benefitsActions.updateCreate({
            ...create,
            ...data,
            step: create.step - 1
          })
        )
      }
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
    if (open) {
      dispatch(commonActions.getNationalities())
      dispatch(commonActions.getRSH())
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${type === 'UPDATE' ? 'Actualizar' : 'Nueva'} restricción general`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
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
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
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
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
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
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
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
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
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

General.defaultProps = {
  type: 'CREATE'
}

export default General
