import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSuccess } from '../../../hooks'
import commonActions from '../../../state/actions/common'
import { CurrencyTextField, Dialog } from '../../Shared'
import { Button, Select, SubmitButton, TextField } from '../../UI'
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

  const { rshList, communes } = useSelector((state) => state.common)

  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    initialValues: {
      rsh: type === 'UPDATE' ? data.rsh : '',
      rshId: type === 'UPDATE' ? data.rshId : '',
      communeId: type === 'UPDATE' ? data.communeId : '',
      commune: type === 'UPDATE' ? data.commune : '',
      currentSubsidy: type === 'UPDATE' ? data.currentSubsidy : '',
      targetSubsidy: type === 'UPDATE' ? data.targetSubsidy : '',
      atc: type === 'UPDATE' ? data.atc : '',
      disability: type === 'UPDATE' ? data.disability : '',
      salary: type === 'UPDATE' ? data.salary : employee?.current_job.salary
    },
    onSubmit: (values) => {
      const formData = {
        ...values,
        maritalStatusId: employee?.marital_status_id,
        contractType: employee?.current_job.contract_type
      }
      submitFunction(formData)
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            onClose()
            enqueueSnackbar('Datos de diagnostico creado', {
              variant: 'success'
            })
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
                {['Subsidio 1', 'Subsidio 2'].map((item) => (
                  <option key={`option-subsidio-${item}`} value={item.id}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
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
              />
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
              <TextField
                label="Estado civil"
                required
                value={employee?.marital_status.description}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <CurrencyTextField
                label="Renta"
                required
                value={employee?.current_job.salary}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                label="Tipo de contrato"
                required
                value={employee?.current_job.contract_type}
                inputProps={{ readOnly: true }}
              />
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
