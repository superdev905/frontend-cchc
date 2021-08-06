import { useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog, CurrencyTextField } from '../Shared'
import { Button, Select, SubmitButton } from '../UI'
import commonActions from '../../state/actions/common'
import { useSuccess } from '../../hooks'
import { decisionList } from '../../config'

const validationSchema = Yup.object().shape({
  isapre_fonasa_id: Yup.number().required('Seleccione ISAPRE/FONASA'),
  afp_isp_id: Yup.number().required('Seleccione AFP/ISP'),
  is_pensioner: Yup.string().required('Seleccione opción'),
  belongs_to_recognize: Yup.string().required('Seleccione opción'),
  pension_amount: Yup.string()
})

const PensionSituation = ({
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
  const { AfpIspList, IsapreFonasaList } = useSelector((state) => state.common)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      isapre_fonasa_id: type === 'UPDATE' ? data.isapre_fonasa_id : '',
      afp_isp_id: type === 'UPDATE' ? data.afp_isp_id : '',
      is_pensioner: type === 'UPDATE' ? data.is_pensioner : '',
      belongs_to_recognize: type === 'UPDATE' ? data.belongs_to_recognize : '',
      pension_amount: type === 'UPDATE' ? data.pension_amount : ''
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

  useEffect(() => {
    if (formik.values.is_pensioner !== 'SI') {
      formik.setFieldValue('pension_amount', '')
    }
  }, [formik.values.is_pensioner])

  useEffect(() => {
    if (open) {
      dispatch(commonActions.getAfpIsp())
      dispatch(commonActions.getIsapreFonasa())
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${
            type === 'UPDATE' ? 'Actualizar' : 'Crear'
          } Situación previsional`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <Select
                label="iSAPRE/FONASA"
                name="isapre_fonasa_id"
                onChange={formik.handleChange}
                value={formik.values.isapre_fonasa_id}
                required
                error={
                  formik.touched.isapre_fonasa_id &&
                  Boolean(formik.errors.isapre_fonasa_id)
                }
                helperText={
                  formik.touched.isapre_fonasa_id &&
                  formik.errors.isapre_fonasa_id
                }
              >
                <option value="">Seleccione una opción</option>
                {IsapreFonasaList.map((item, index) => (
                  <option key={`region--${index}`} value={`${item.id}`}>
                    {`${item.description}`}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="AFP/ISP"
                name="afp_isp_id"
                onChange={formik.handleChange}
                value={formik.values.afp_isp_id}
                required
                error={
                  formik.touched.afp_isp_id && Boolean(formik.errors.afp_isp_id)
                }
                helperText={
                  formik.touched.afp_isp_id && formik.errors.afp_isp_id
                }
              >
                <option value="">Seleccione una opción</option>
                {AfpIspList.map((item, index) => (
                  <option key={`region--${index}`} value={`${item.id}`}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Pensionado"
                name="is_pensioner"
                onChange={formik.handleChange}
                value={formik.values.is_pensioner}
                required
                error={
                  formik.touched.is_pensioner &&
                  Boolean(formik.errors.is_pensioner)
                }
                helperText={
                  formik.touched.is_pensioner && formik.errors.is_pensioner
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
            <Grid item xs={12} md={6}>
              <Select
                label="Pertenece a Reconocer"
                name="belongs_to_recognize"
                onChange={formik.handleChange}
                value={formik.values.belongs_to_recognize}
                required
                error={
                  formik.touched.belongs_to_recognize &&
                  Boolean(formik.errors.belongs_to_recognize)
                }
                helperText={
                  formik.touched.belongs_to_recognize &&
                  formik.errors.belongs_to_recognize
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
            <Grid item xs={12} md={6}>
              <CurrencyTextField
                label="Monto de pensión"
                name="pension_amount"
                value={formik.values.pension_amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.pension_amount &&
                  Boolean(formik.errors.pension_amount)
                }
                helperText={
                  formik.touched.pension_amount && formik.errors.pension_amount
                }
                disabled={formik.values.is_pensioner === 'NO'}
                inputProps={{
                  readOnly: formik.values.is_pensioner === 'NO'
                }}
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

PensionSituation.defaultProps = {
  type: 'CREATE'
}

export default PensionSituation
