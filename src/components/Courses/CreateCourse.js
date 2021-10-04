import * as Yup from 'yup'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { addMonths } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog } from '../Shared'
import { Button, Select, SubmitButton, TextArea, TextField } from '../UI'
import { useSuccess } from '../../hooks'
import commonActions from '../../state/actions/common'

const validationSchema = Yup.object().shape({
  code: Yup.string().required('Ingrese código'),
  nameCourse: Yup.string().required('Ingrese nombre del curso'),
  otec: Yup.string().required('Seleccione OTEC'),
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
  const { isMobile } = useSelector((state) => state.ui)
  const { otecs } = useSelector((state) => state.common)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      code: type === 'UPDATE' ? data.code : '',
      nameCourse: type === 'UPDATE' ? data.nameCourse : '',
      otec: type === 'UPDATE' ? data.otec : '',
      description: type === 'UPDATE' ? data.description : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({
        ...values,
        confirmation_date: new Date(addMonths(new Date(), 1))
      })
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
    if (open) {
      dispatch(commonActions.getAllOTECS())
    }
  }, [open, type])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'lg'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${type === 'Registrar' ? 'Actualizar' : 'Nuevo'} Curso`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Código"
                name="code"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
                inputProps={{
                  maxLength: 9
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nombre"
                required
                name="nameCourse"
                value={formik.values.nameCourse}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.nameCourse && Boolean(formik.errors.nameCourse)
                }
                helperText={
                  formik.touched.nameCourse && formik.errors.nameCourse
                }
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Select
                label="OTEC"
                name="otec"
                required
                value={formik.values.otec}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.otec && Boolean(formik.errors.otec)}
                helperText={formik.touched.otec && formik.errors.otec}
              >
                <option value="">Seleccione OTEC</option>
                {otecs.map((item) => (
                  <option value={item.id}>{item.businessName}</option>
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
