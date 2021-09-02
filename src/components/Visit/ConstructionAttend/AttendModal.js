import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { DatePicker, Dialog } from '../../Shared'
import { Button, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'
import commonActions from '../../../state/actions/common'

const validationSchema = Yup.object({
  type_id: Yup.number().required(''),
  type_name: Yup.string().required('Seleccione tipo de Atención'),
  quantity: Yup.number('Ingrese número')
    .min(1, 'La cantidad deber ser mayor a 1')
    .required('Ingrese cantidad')
    .positive()
    .integer()
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
  const [currentDate] = useState(new Date())

  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      date: type !== 'CREATE' ? new Date(data.date) : currentDate,
      type_id: type !== 'CREATE' ? data.type_id : '',
      type_name: type !== 'CREATE' ? data.type_name : '',
      quantity: type !== 'CREATE' ? data.quantity : ''
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

  const getTitle = (actionType) => {
    if (actionType === 'VIEW') return 'Atención en obra'
    if (actionType === 'UPDATE') return 'Actualizar atención en obra'
    return 'Crear atención en obra'
  }
  const validNumber = (num) => {
    if (num === '') return 0
    if (Number.isNaN(num)) return 0
    if (num * 1 < 0) return 0

    return parseInt(num, 10)
  }

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
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
    >
      <Box>
        <Typography
          align="center"
          variant="h6"
          style={{ marginBottom: '15px' }}
        >
          {getTitle(type)}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DatePicker
              label="Fecha de atención"
              required
              value={currentDate}
              onChange={(targetDate) => {
                formik.setFieldValue('date', targetDate)
              }}
              disabled={type === 'VIEW'}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              options={assistanceTypes}
              value={selectedType || ''}
              getOptionLabel={(option) => option.name || ''}
              onChange={(__, option) => {
                formik.setFieldValue('type_id', option ? option.id : '')
                formik.setFieldValue('type_name', option ? option.name : '')
              }}
              disabled={type === 'VIEW'}
              renderOption={(option) => (
                <Box>
                  <Typography>{option.name}</Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} required label="Tipo de atención" />
              )}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <TextField
              label="Cantidad de personas"
              name="quantity"
              required
              type="number"
              value={formik.values.quantity}
              onChange={(e) => {
                formik.setFieldValue('quantity', validNumber(e.target.value))
                formik.setFieldTouched('quantity')
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              helperText={formik.touched.quantity && formik.errors.quantity}
              inputProps={{ readOnly: type === 'VIEW' }}
            />
          </Grid>
        </Grid>
        <Box textAlign="center" marginTop="15px">
          {type === 'VIEW' ? (
            <Button onClick={onClose}>Aceptar</Button>
          ) : (
            <>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <SubmitButton
                onClick={formik.handleSubmit}
                loading={formik.isSubmitting}
                disabled={!formik.isValid || formik.isSubmitting}
                success={success}
              >
                {type === 'UPDATE' ? 'Actualizar ' : 'Crear '} atención
              </SubmitButton>
            </>
          )}
        </Box>
      </Box>
    </Dialog>
  )
}

AssistanceType.propTypes = {
  type: 'CREATE'
}

export default AssistanceType
