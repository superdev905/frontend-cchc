import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { Dialog } from '../../Shared'
import { Button, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'
import commonActions from '../../../state/actions/common'

const validationSchema = Yup.object({
  type_id: Yup.number().required(''),
  type_name: Yup.string().required('Seleccione tipo de Atención'),
  quantity: Yup.number('Ingrese número válido')
    .min(1)
    .required('Ingrese cantidad')
})

const AssistanceType = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successFunction
}) => {
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const { success, changeSuccess } = useSuccess()
  const { assistanceTypes } = useSelector((state) => state.common)
  const [selectedType, setSelectedType] = useState(null)

  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      type_id: type === 'UPDATE' ? data.type_id : '',
      type_name: type === 'UPDATE' ? data.type_name : '',
      quantity: type === 'UPDATE' ? data.quantity : ''
    },
    onSubmit: (values) => {
      submitFunction(values)
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(false)
          if (successFunction) {
            successFunction()
          }
          onClose()
        })
        .catch(() => {
          changeSuccess(false)
          formik.setSubmitting(false)
        })
    }
  })

  useEffect(() => {
    if (open) {
      dispatch(commonActions.getAssistanceTypes({}, false)).then(() => {})
    }
  }, [open])

  useEffect(() => {
    if (formik.values.type_id && assistanceTypes.length > 0) {
      const currentType = assistanceTypes.find(
        (item) => item.id === parseInt(formik.values.type_id, 10)
      )
      formik.setFieldValue('type_name', currentType.name)
      setSelectedType(currentType)
    }
  }, [formik.values.type_id, assistanceTypes])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
    >
      <Box>
        <Typography
          align="center"
          variant="h6"
          style={{ marginBottom: '15px' }}
        >
          {type === 'UPDATE' ? 'Actualizar ' : 'Crear '}
          atención en obra
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              options={assistanceTypes}
              value={selectedType || ''}
              getOptionLabel={(option) => option.name}
              onChange={(__, option) => {
                formik.setFieldValue('type_id', option ? option.id : '')
                formik.setFieldValue('type_name', option ? option.name : '')
              }}
              renderOption={(option) => (
                <Box>
                  <Typography>
                    <strong>{option.name}</strong>
                  </Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Seleccionar tipo" />
              )}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <TextField
              label="Cantidad"
              name="quantity"
              required
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              helperText={formik.touched.quantity && formik.errors.quantity}
            />
          </Grid>
        </Grid>
        <Box textAlign="center" marginTop="15px">
          <Button onClick={onClose} variant="outlined">
            Cancelar
          </Button>
          <SubmitButton
            onClick={formik.handleSubmit}
            loading={formik.isSubmitting}
            disabled={!formik.isValid || formik.isSubmitting}
            success={success}
          >
            {type === 'UPDATE' ? 'Actualizar' : 'Crear'}
          </SubmitButton>
        </Box>
      </Box>
    </Dialog>
  )
}

AssistanceType.propTypes = {
  type: 'CREATE'
}

export default AssistanceType
