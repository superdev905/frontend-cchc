import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { CompanyRow, Dialog } from '../Shared'
import {
  Button,
  InputLabel,
  Select,
  SubmitButton,
  TextArea,
  TextField
} from '../UI'
import { useSuccess } from '../../hooks'
import commonActions from '../../state/actions/common'

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .min(5, 'Debe contener al menos 5 caracteres')
    .required('Ingrese código'),
  name: Yup.string().required('Ingrese nombre del curso'),
  otecId: Yup.string().required('Seleccione otec'),
  description: Yup.string().required('Ingrese descripción')
})

const CreateCourse = ({
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
  const [selectedOTEC, setSelectedOTEC] = useState(null)
  const { isMobile } = useSelector((state) => state.ui)
  const { otecs, roles } = useSelector((state) => state.common)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      code: type === 'UPDATE' ? data.code : '',
      name: type === 'UPDATE' ? data.name : '',
      otecId: type === 'UPDATE' ? data.otecId : '',
      otecName: type === 'UPDATE' ? data.otecName : '',
      instructorId: type === 'UPDATE' ? data.instructorId : '',
      instructorName: type === 'UPDATE' ? data.instructorName : '',
      description: type === 'UPDATE' ? data.description : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({
        ...values,
        createDate: new Date().toISOString()
      })
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            onClose()
            enqueueSnackbar(successMessage, {
              variant: 'success'
            })
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
    if (type === 'UPDATE' && otecs.length > 0) {
      const currentOtec = otecs.find(
        (item) => item.id === parseInt(data.otecId, 10)
      )
      setSelectedOTEC(currentOtec)
    }
  }, [type, otecs])

  useEffect(() => {
    const otecId = selectedOTEC?.id || ''
    const otecName = selectedOTEC?.businessName || ''
    formik.setFieldValue('otecId', otecId)
    formik.setFieldValue('otecName', otecName)
  }, [selectedOTEC])

  useEffect(() => {
    const { instructorId } = formik.values
    if (instructorId && roles.length > 0) {
      const currentInstructor = roles.find(
        (item) => item.id === parseInt(instructorId, 10)
      )
      formik.setFieldValue('instructorName', currentInstructor.name)
    } else {
      formik.setFieldValue('instructorName', '')
    }
  }, [formik.values.instructorId, roles])

  useEffect(() => {
    const { instructorId } = formik.values
    if (instructorId === '') {
      formik.setFieldValue('instructorId', 0)
      formik.setFieldValue('instructorName', 0)
    }
  }, [formik.values.instructorId, roles])

  useEffect(() => {
    if (open) {
      formik.resetForm()
      dispatch(commonActions.getAllOTECS())
      dispatch(commonActions.getRoles())
    }
  }, [open, type])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${type === 'UPDATE' ? 'Actualizar' : 'Nuevo'} Curso`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                label="Código"
                name="code"
                required
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
                inputProps={{ maxLength: 5 }}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <TextField
                label="Nombre"
                required
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel required>OTEC</InputLabel>
              {selectedOTEC ? (
                <CompanyRow
                  company={selectedOTEC}
                  onDelete={() => {
                    setSelectedOTEC(null)
                  }}
                />
              ) : (
                <Autocomplete
                  required
                  options={otecs}
                  value={''}
                  getOptionLabel={(option) => option.businessName || ''}
                  onChange={(__, option) => {
                    setSelectedOTEC(option)
                  }}
                  renderOption={(option) => (
                    <CompanyRow.Autocomplete
                      company={option}
                      iconColor="#BD52F2"
                    />
                  )}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            </Grid>
            <Grid item xs={12} md={12}>
              <Select
                label="Relator"
                name="instructorId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.instructorId}
                helperText={
                  formik.touched.instructorId && formik.errors.instructorId
                }
                error={
                  formik.touched.instructorId &&
                  Boolean(formik.errors.instructorId)
                }
              >
                <option value="">Seleccione relator</option>
                {roles.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextArea
                label="Descripción"
                required
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} Curso`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

CreateCourse.defaultProps = {
  type: 'CREATE'
}

export default CreateCourse
