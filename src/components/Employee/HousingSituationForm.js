import { useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog } from '../Shared'
import { Button, Select, SubmitButton, TextArea } from '../UI'
import commonActions from '../../state/actions/common'
import { useSuccess } from '../../hooks'

const validationSchema = Yup.object().shape({
  type_home_id: Yup.number().required('Seleccione AFP/ISP'),
  property_home_id: Yup.number().required('Seleccione opción'),
  type_subsidy_id: Yup.number().required('Seleccione opción'),
  description: Yup.string().required('Ingrese description')
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
  const { isMobile } = useSelector((state) => state.ui)
  const { propertyHomeList, typesHomeList, subsidyList } = useSelector(
    (state) => state.common
  )

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      type_home_id: type === 'UPDATE' ? data.type_home_id : '',
      property_home_id: type === 'UPDATE' ? data.property_home_id : '',
      type_subsidy_id: type === 'UPDATE' ? data.type_subsidy_id : '',
      description: type === 'UPDATE' ? data.description : ''
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
    if (open) {
      dispatch(commonActions.getAfpIsp())
      dispatch(commonActions.getIsapreFonasa())
      dispatch(commonActions.getTypesHome())
      dispatch(commonActions.getPropertyHome())
      dispatch(commonActions.getTypesSubsidy())
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${
            type === 'UPDATE' ? 'Actualizar' : 'Crear'
          } Situación habitacional`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Select
                label="Tipo de vivienda"
                name="type_home_id"
                onChange={formik.handleChange}
                value={formik.values.type_home_id}
                required
                error={
                  formik.touched.type_home_id &&
                  Boolean(formik.errors.type_home_id)
                }
                helperText={
                  formik.touched.type_home_id && formik.errors.type_home_id
                }
              >
                <option value="">Seleccione una opción</option>
                {typesHomeList.map((item, index) => (
                  <option key={`type-home--${index}`} value={`${item.id}`}>
                    {`${item.description}`}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Propiedad de la vivienda"
                name="property_home_id"
                onChange={formik.handleChange}
                value={formik.values.property_home_id}
                required
                error={
                  formik.touched.property_home_id &&
                  Boolean(formik.errors.property_home_id)
                }
                helperText={
                  formik.touched.property_home_id &&
                  formik.errors.property_home_id
                }
              >
                <option value="">Seleccione una opción</option>
                {propertyHomeList.map((item, index) => (
                  <option key={`property-home--${index}`} value={`${item.id}`}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Tipo de subsidio"
                name="type_subsidy_id"
                onChange={formik.handleChange}
                value={formik.values.type_subsidy_id}
                required
                error={
                  formik.touched.type_subsidy_id &&
                  Boolean(formik.errors.type_subsidy_id)
                }
                helperText={
                  formik.touched.type_subsidy_id &&
                  formik.errors.type_subsidy_id
                }
              >
                <option value="">Seleccione una opción</option>
                {subsidyList.map((item, index) => (
                  <option key={`subsidy--${index}`} value={`${item.id}`}>
                    {item.description}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextArea
                label="Descripción"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                required
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
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
