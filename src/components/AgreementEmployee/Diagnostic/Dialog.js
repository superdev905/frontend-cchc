import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSuccess } from '../../../hooks'
import commonActions from '../../../state/actions/common'
import { CurrencyTextField, Dialog } from '../../Shared'
import { Button, Select, SubmitButton } from '../../UI'
import { decisionList } from '../../../config'

const validationSchema = Yup.object().shape({
  rsh: Yup.string(),
  rshId: Yup.number().required('Seleecione RSH'),
  commune: Yup.string(),
  communeId: Yup.number().required('Seleccione communa'),
  salary: Yup.number().required('Ingrese monto'),
  currentSubsidy: Yup.string().required('Seleccione subsidio actual'),
  targetSubsidy: Yup.string().required('Ingrese subsidio al que postula'),
  atc: Yup.string().required('Ingrese ATC'),
  disability: Yup.string().required('Seleccione opción')
})

const SavingDialog = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successFunction
}) => {
  const dispatch = useDispatch()
  const { success, changeSuccess } = useSuccess()
  const { enqueueSnackbar } = useSnackbar()
  const { employee } = useSelector((state) => state.employees)

  const { rshList, communes, maritalStatus, subsidyList } = useSelector(
    (state) => state.common
  )

  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    initialValues: {
      rsh: type === 'UPDATE' ? data.rsh : '',
      rshId: type === 'UPDATE' ? data.rshId : employee?.rsh_id,
      communeId: type === 'UPDATE' ? data.communeId : '',
      commune: type === 'UPDATE' ? data.commune : '',
      currentSubsidy: type === 'UPDATE' ? data.currentSubsidy : '',
      targetSubsidy: type === 'UPDATE' ? data.targetSubsidy : '',
      atc: type === 'UPDATE' ? data.atc : '',
      disability: type === 'UPDATE' ? data.disability : employee?.disability,
      salary: type === 'UPDATE' ? data.salary : employee?.current_job?.salary,
      maritalStatusId:
        type === 'UPDATE'
          ? data.maritalStatusId
          : employee?.marital_status?.id || '',
      contractType:
        type === 'UPDATE'
          ? data.contractType
          : employee?.current_job?.contract_type || ''
    },
    onSubmit: (values) => {
      const formData = {
        ...values,
        rsh: rshList.find((item) => item.id === parseInt(values.rshId, 10))
          .description,
        commune: communes.find(
          (item) => item.id === parseInt(values.communeId, 10)
        ).name
      }
      submitFunction(formData)
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            onClose()
            enqueueSnackbar(
              `Datos de diagnostico ${
                type === 'UPDATE' ? 'actualizados' : 'creados'
              }`,
              {
                variant: 'success'
              }
            )
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
    dispatch(commonActions.getRSH())
    dispatch(commonActions.getCommunes())
    dispatch(commonActions.getMaritalStatuses())
    dispatch(commonActions.getTypesSubsidy())
  }, [])
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Box>
        <Typography
          variant="h6"
          style={{ fontWeight: 'bold', marginBottom: 15 }}
          align="center"
        >{`${
          type === 'UPDATE' ? 'Actualizar ' : 'Agregar '
        }datos de diagnóstico`}</Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Select
                label="RSH"
                required
                name="rshId"
                value={formik.values.rshId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rshId && Boolean(formik.errors.rshId)}
                helperText={formik.touched.rshId && formik.errors.rshId}
              >
                <option value="">Selecciona una opción</option>
                {rshList.map((item) => (
                  <option key={`option-${item.id}`} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Select
                label="Comuna (FPS o RSH)"
                required
                name="communeId"
                value={formik.values.communeId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.communeId && Boolean(formik.errors.communeId)
                }
                helperText={formik.touched.communeId && formik.errors.communeId}
              >
                <option value="">Selecciona una opción</option>
                {communes.map((item) => (
                  <option key={`option-${item.id}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Select
                label="Subsidio actual"
                required
                name="currentSubsidy"
                value={formik.values.currentSubsidy}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.currentSubsidy &&
                  Boolean(formik.errors.currentSubsidy)
                }
                helperText={
                  formik.touched.currentSubsidy && formik.errors.currentSubsidy
                }
              >
                <option value="">Selecciona una opción</option>
                {subsidyList.map((item, index) => (
                  <option
                    key={`option-subsidio-${index}`}
                    value={item.description}
                  >
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Select
                label="Subsidio al que postula"
                required
                name="targetSubsidy"
                value={formik.values.targetSubsidy}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.targetSubsidy &&
                  Boolean(formik.errors.targetSubsidy)
                }
                helperText={
                  formik.touched.targetSubsidy && formik.errors.targetSubsidy
                }
              >
                <option value="">Selecciona una opción</option>
                {subsidyList.map((item, index) => (
                  <option
                    key={`option-subsidio-${index}`}
                    value={item.description}
                  >
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Select
                label="ATC"
                required
                name="atc"
                value={formik.values.atc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.atc && Boolean(formik.errors.atc)}
                helperText={formik.touched.atc && formik.errors.atc}
              >
                <option value="">Selecciona una entidad</option>
                {decisionList.map((item) => (
                  <option key={`option-atc-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Select
                label="Discapacidad"
                required
                name="disability"
                value={formik.values.disability}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.disability && Boolean(formik.errors.disability)
                }
                helperText={
                  formik.touched.disability && formik.errors.disability
                }
              >
                <option value="">Selecciona una entidad</option>
                {decisionList.map((item) => (
                  <option key={`option-atc-${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Select
                label="Estado civil"
                required
                value={formik.values.maritalStatusId}
                error={
                  formik.touched.maritalStatusId &&
                  Boolean(formik.errors.maritalStatusId)
                }
                helperText={
                  formik.touched.maritalStatusId &&
                  formik.errors.maritalStatusId
                }
              >
                <option value="">Selecciona opción</option>
                {maritalStatus.map((item) => (
                  <option key={`option-atc-${item.id}`} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} lg={6}>
              <CurrencyTextField
                label="Renta"
                name="salary"
                required
                value={formik.values.salary}
                onChange={formik.handleChange}
                error={formik.touched.salary && Boolean(formik.errors.salary)}
                helperText={formik.touched.salary && formik.errors.salary}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Select
                label="Tipo de contrato"
                name="contractType"
                onChange={formik.handleChange}
                value={formik.values.contractType}
                required
                error={
                  formik.touched.contractType &&
                  Boolean(formik.errors.contractType)
                }
                helperText={
                  formik.touched.contractType && formik.errors.contractType
                }
              >
                <option value="">SELECCIONE OPCIÓN</option>
                {['EMPRESA', 'SUB CONTRATO', 'CESANTE'].map((item, index) => (
                  <option key={`contract-type--${index}`} value={`${item}`}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Button variant="outlined" onClick={onClose}>
              Cerrar
            </Button>
            <SubmitButton
              disabled={!formik.isValid}
              loading={formik.isSubmitting}
              success={success}
              onClick={formik.handleSubmit}
            >
              {type === 'UPDATED' ? 'Actualizar' : 'Guardar'}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

SavingDialog.defaultProps = {
  type: 'CREATE'
}

export default SavingDialog
