import { useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { DatePicker, Dialog } from '../Shared'
import { Button, Select, SubmitButton, TextArea, TextField } from '../UI'
import { useSuccess } from '../../hooks'
import { moduleConfig, statusList } from '../../config'

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Ingrese título de encuesta'),
  start_date: Yup.date().required('Ingrese fecha de ingreso'),
  end_date: Yup.date().required('Ingrese fecha de fin'),
  status: Yup.string().required('Selecciona status'),
  modules: Yup.array()
    .of(Yup.string().required('Seleccione módulo'))
    .min(1, 'Selecciona un al menos un módulo')
    .required('Seleccione obra')
})

const PollCreate = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      title: type === 'UPDATE' ? data.title : '',
      start_date: type === 'UPDATE' ? data.start_date : '',
      end_date: type === 'UPDATE' ? data.end_date : '',
      modules:
        type === 'UPDATE' ? data.modules.map((item) => item.module_name) : [],
      status: type === 'UPDATE' ? data.status : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction(values)
        .then((result) => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })
          changeSuccess(true, () => {
            onClose()
            resetForm()
            if (successFunction) {
              successFunction(result.id)
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
    if (formik.values.start_date) {
      formik.setFieldTouched('start_date')
      formik.setFieldValue('end_date', '')
    }
  }, [formik.values.start_date])

  useEffect(() => {
    if (formik.values.end_date) {
      formik.setFieldTouched('end_date')
    }
  }, [formik.values.end_date])

  useEffect(() => {
    if (open) {
      formik.resetForm()
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} Encuesta`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextArea
                rowsMin={1}
                label="Título de encuesta"
                name="title"
                required
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                maxLength={400}
              ></TextArea>
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Fecha de Inicio"
                disabledPast
                disabledFuture={false}
                value={formik.values.start_date}
                required
                onChange={(date) => {
                  formik.setFieldValue('start_date', date)
                  formik.setFieldTouched('start_date')
                }}
                disabledPast={true}
                error={
                  formik.touched.start_date && Boolean(formik.errors.start_date)
                }
                helperText={
                  formik.touched.start_date && formik.errors.start_date
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Fecha de Fin"
                disabledPast
                disabledFuture={false}
                value={formik.values.end_date}
                minDate={formik.values.start_date}
                required
                onChange={(date) => {
                  formik.setFieldValue('end_date', date)
                  formik.setFieldTouched('end_date')
                }}
                error={
                  formik.touched.end_date && Boolean(formik.errors.end_date)
                }
                helperText={formik.touched.end_date && formik.errors.end_date}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Select
                label="Estado"
                name="status"
                required
                onChange={formik.handleChange}
                value={formik.values.status}
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
              >
                <option value="">Seleccione una opción</option>
                {statusList.map((item, index) => (
                  <option key={`status--${index}`} value={`${item.key}`}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="modules"
                options={moduleConfig.modulesList}
                defaultValue={formik.values.modules}
                onChange={(__, e) => {
                  formik.setFieldValue('modules', e)
                }}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Módulos"
                    required
                    placeholder="Módulo"
                    error={
                      formik.touched.modules && Boolean(formik.errors.modules)
                    }
                    helperText={formik.touched.modules && formik.errors.modules}
                  />
                )}
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

PollCreate.defaultProps = {
  type: 'CREATE'
}

export default PollCreate
