import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog } from '../Shared'
import { Button, Select, SubmitButton, TextField } from '../UI'
import { useSuccess } from '../../hooks'
import { statusList } from '../../config'

const validationSchema = Yup.object().shape({
  question: Yup.string().required('Ingrese pregunta'),
  question_type_id: Yup.string().required('Selecciona tipo de pregunta')
})

const QuestionCreate = ({
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
  const { questionTypesList } = useSelector((state) => state.poll)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      question: type === 'UPDATE' ? data.question : '',
      question_type_id: type === 'UPDATE' ? data.question_type_id : ''
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
              successFunction(result)
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} Pregunta`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                label="Pregunta"
                name="question"
                required
                onChange={formik.handleChange}
                value={formik.values.question}
                error={
                  formik.touched.question && Boolean(formik.errors.question)
                }
                helperText={formik.touched.question && formik.errors.question}
              ></TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <Select
                label="Tipo de Pregunta"
                name="question_type"
                required
                onChange={formik.handleChange}
                value={formik.values.question_type_id}
                error={
                  formik.touched.question_type_id &&
                  Boolean(formik.errors.question_type_id)
                }
                helperText={
                  formik.touched.question_type_id &&
                  formik.errors.question_type_id
                }
              >
                <option value="">Seleccione una opción</option>
                {statusList.map((item, index) => (
                  <option
                    key={`question_type_id--${index}`}
                    value={`${item.key}`}
                  >
                    {item.name}
                  </option>
                ))}
              </Select>
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
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} pregunta`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

QuestionCreate.defaultProps = {
  type: 'CREATE'
}

export default QuestionCreate
