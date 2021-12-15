import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog, DataTable } from '../Shared'
import { useSuccess } from '../../hooks'
import { Select, SubmitButton, Button } from '../UI'

const validationSchema = Yup.object().shape({
  departament: Yup.string().required('Selecciona Departamento'),
  professional: Yup.string().required('Seleccione Profesional')
})

const QuestionAssign = ({
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
      departament: type === 'UPDATE' ? data.departament : '',
      professional: type === 'UPDATE' ? data.professional : '',
      is_mandatory:
        type === 'UPDATE' ? `${data.is_mandatory ? 'SI' : 'NO'}` : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({
        ...values,
        is_mandatory: values.is_mandatory === 'SI'
      })
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
    if (open) {
      formik.resetForm()
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          Asignar Preguntas
        </Typography>
        <Box p={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Select
                label="Departamento"
                name="departament"
                required
                onChange={formik.handleChange}
                value={formik.values.departament}
                error={
                  formik.touched.departament &&
                  Boolean(formik.errors.departament)
                }
                helperText={
                  formik.touched.departament && formik.errors.departament
                }
              >
                <option value="">Seleccione Departamento</option>
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Profesional"
                name="professional"
                required
                onChange={formik.handleChange}
                value={formik.values.professional}
                error={
                  formik.touched.professional &&
                  Boolean(formik.errors.professional)
                }
                helperText={
                  formik.touched.professional && formik.errors.professional
                }
              >
                <option value="">Seleccione Profesional</option>
              </Select>
            </Grid>
            <DataTable
              emptyMessage={'No existen Preguntas'}
              columns={[
                {
                  name: 'N°',
                  selector: (row) => row.number
                },
                {
                  name: 'Fecha',
                  selector: (row) => row.date
                },
                {
                  name: 'Area',
                  selector: (row) => row.area
                },
                {
                  name: 'Beneficiario',
                  selector: (row) => row.beneficiario
                }
              ]}
            />
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
              Asignar
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

QuestionAssign.defaultProps = {
  type: 'Create'
}

export default QuestionAssign
