import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog } from '../../Shared'
import { Button, Select, SubmitButton, TextArea, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'
import pollActions from '../../../state/actions/poll'
import QuestionOption from './QuestionOption'

const validationSchema = Yup.object().shape({
  question: Yup.string().required('Ingrese pregunta'),
  question_type_id: Yup.string().required('Selecciona tipo de pregunta')
})

const SimpleSelection = () => (
  <Box>
    <QuestionOption questionType="SIMPLE_SELECTION" question="Si" disabled />
    <QuestionOption
      questionType="SIMPLE_SELECTION"
      question="No"
      disabled
      value={false}
    />
  </Box>
)

const MultipleSelection = () => (
  <Box>
    <QuestionOption questionType="MULTIPLE_SELECTION" question="Si" disabled />
    <QuestionOption
      questionType="MULTIPLE_SELECTION"
      question="No"
      disabled
      value={false}
    />
  </Box>
)

const AnswerText = () => (
  <Box>
    <TextArea disabled />
  </Box>
)

const QuestionModal = ({
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
  const [currentType, setCurrentType] = useState(null)
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

  useEffect(() => {
    console.log(formik.values.question_type_id)
    if (formik.values.question_type_id) {
      setCurrentType(
        questionTypesList.find(
          (item) => item.id === parseInt(formik.values.question_type_id, 10)
        )
      )
    } else {
      setCurrentType(null)
    }
  }, [formik.values.question_type_id])

  useEffect(() => {
    dispatch(pollActions.getQuestionTypes())
  }, [])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} Pregunta`}
        </Typography>
        <Box p={2} style={{ backgroundColor: '#F6F6F6' }}>
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

            <Grid item xs={12} md={12}>
              <Select
                label="Tipo de Pregunta"
                name="question_type_id"
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
                {questionTypesList.map((item, index) => (
                  <option
                    key={`question_type_id--${index}`}
                    value={`${item.id}`}
                  >
                    {item.display_name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              {currentType && (
                <Box>
                  <Typography>Respuestas</Typography>
                  {currentType.key === 'SIMPLE_SELECTION' && (
                    <SimpleSelection />
                  )}
                  {currentType.key === 'MULTIPLE_SELECTION' && (
                    <MultipleSelection />
                  )}
                  {currentType.key === 'TEXT' && <AnswerText />}
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
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
    </Dialog>
  )
}

QuestionModal.defaultProps = {
  type: 'CREATE'
}

export default QuestionModal
