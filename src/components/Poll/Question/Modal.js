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

const multipleQuestion = Yup.object().shape({
  options: Yup.array()
    .of(
      Yup.object({
        index: Yup.number(),
        value: Yup.string().required('Una opción no puede ser vacía')
      })
    )
    .min(3, 'Selecciona al menos tres opciones')
    .required('Agregue opciones')
})

const validationSchema = Yup.object().shape({
  question: Yup.string().required('Ingrese pregunta'),
  question_type_id: Yup.string().required('Selecciona tipo de pregunta')
})

const SimpleSelection = () => (
  <Box>
    <QuestionOption questionType="SIMPLE_SELECTION" value="Si" disabled />
    <QuestionOption questionType="SIMPLE_SELECTION" value="No" disabled />
  </Box>
)

const MultipleSelection = ({ options, onChange, onAdd, onDelete }) => (
  <Box>
    {options.map((item) => (
      <QuestionOption
        questionType="MULTIPLE_SELECTION"
        value={item.value}
        disabled
        editable={false}
        onChange={(e) => onChange(e.target.value, item)}
        onDelete={() => onDelete(item)}
      />
    ))}
    <Box marginTop="10px" display="flex" justifyContent="flex-end">
      <Button onClick={onAdd}>Agregar opción</Button>
    </Box>
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
  const [enableOptions, setEnableOptions] = useState(false)
  const { isMobile } = useSelector((state) => state.ui)
  const { questionTypesList } = useSelector((state) => state.poll)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema: enableOptions
      ? validationSchema.concat(multipleQuestion)
      : validationSchema,
    initialValues: {
      question: type === 'UPDATE' ? data.question : '',
      question_type_id: type === 'UPDATE' ? data.question_type.id : '',
      options:
        type === 'UPDATE'
          ? data.options.map((item, i) => ({
              index: i + 1,
              value: item.option_name
            }))
          : [{ index: 1, value: 'Opción 1' }]
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({
        ...values,
        options: values.options.map((item) => item.value)
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
    if (formik.values.question_type_id) {
      const questionType = questionTypesList.find(
        (item) => item.id === parseInt(formik.values.question_type_id, 10)
      )
      setCurrentType(questionType)
      setEnableOptions(questionType.key === 'MULTIPLE_SELECTION')
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
                    <MultipleSelection
                      options={formik.values.options}
                      onAdd={() => {
                        const temp = [...formik.values.options]
                        temp.push({
                          index: temp.length + 1,
                          value: 'Nueva opción'
                        })
                        console.log(temp)
                        formik.setFieldValue('options', temp)
                      }}
                      onChange={(value, option) => {
                        let temp = [...formik.values.options]
                        temp = temp.map((item) =>
                          item.index === option.index
                            ? { ...item, value }
                            : item
                        )
                        formik.setFieldValue('options', temp)
                      }}
                      onDelete={(option) => {
                        let temp = [...formik.values.options]
                        temp = temp
                          .filter((item) => item.index !== option.index)
                          .map((item, i) => ({ ...item, index: i + 1 }))
                        formik.setFieldValue('options', temp)
                      }}
                    />
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
