import { memo, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog } from '../../Shared'
import { Button, Select, SubmitButton, TextArea } from '../../UI'
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

const simpleSchema = Yup.object().shape({
  question: Yup.string().required('Ingrese pregunta'),
  question_type_id: Yup.number().required('Selecciona tipo de pregunta')
})

const SimpleSelection = () => (
  <Box>
    <QuestionOption questionType="SIMPLE_SELECTION" value="Si" disabled />
    <QuestionOption questionType="SIMPLE_SELECTION" value="No" disabled />
  </Box>
)

const MultipleSelection = ({ options, onChange, onAdd, onDelete, error }) => {
  const showError = () => {
    if (!error) return ''
    //  eslint-disable-next-line
    if (typeof error === 'object') return error.filter((item) => item)[0].value
    return error
  }

  return (
    <Box>
      {options.map((item) => (
        <QuestionOption
          questionType="MULTIPLE_SELECTION"
          value={item.value}
          disabled
          editable={false}
          onChange={(e) => onChange(e.target.value, item)}
          onDelete={() => onDelete(item)}
          showOptionDelete
        />
      ))}
      <Box>
        <Typography
          style={{ marginTop: '10px', fontSize: '12px', color: 'red' }}
        >
          {showError()}
        </Typography>
      </Box>
      <Box marginTop="10px" display="flex" justifyContent="flex-end">
        <Button onClick={onAdd}>Agregar opción</Button>
      </Box>
    </Box>
  )
}

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
  const [currentType, setCurrentType] = useState('')
  const [enableOptions, setEnableOptions] = useState(false)
  const { isMobile } = useSelector((state) => state.ui)
  const { questionTypesList } = useSelector((state) => state.poll)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema: enableOptions
      ? simpleSchema.concat(multipleQuestion)
      : simpleSchema,
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

  console.log(formik.errors, enableOptions)

  useEffect(() => {
    if (currentType === 'MULTIPLE_SELECTION') {
      setEnableOptions(true)
    } else {
      setEnableOptions(false)
    }
  }, [currentType, enableOptions])

  useEffect(() => {
    dispatch(pollActions.getQuestionTypes())
  }, [])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={'md'}
      fullWidth
      fullScreen={isMobile}
    >
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} Pregunta`}
        </Typography>
        <Box p={2} style={{ backgroundColor: '#F6F6F6' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextArea
                rowsMin={1}
                label="Pregunta"
                name="question"
                required
                onChange={formik.handleChange}
                value={formik.values.question}
                error={
                  formik.touched.question && Boolean(formik.errors.question)
                }
                helperText={formik.touched.question && formik.errors.question}
              ></TextArea>
            </Grid>

            <Grid item xs={12} md={12}>
              <Select
                label="Tipo de Pregunta"
                name="question_type_id"
                required
                onChange={(e) => {
                  const { value } = e.target
                  const questionType = questionTypesList.find(
                    (item) => item.id === parseInt(value, 10)
                  )
                  setCurrentType(questionType.key)
                  formik.setFieldValue('question_type_id', value)
                }}
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
                  <option key={`question_type_id--${index}`} value={item.id}>
                    {item.display_name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              {currentType && (
                <Box>
                  <Typography>Respuestas</Typography>
                  {currentType === 'SIMPLE_SELECTION' && <SimpleSelection />}
                  {currentType === 'MULTIPLE_SELECTION' && (
                    <MultipleSelection
                      options={formik.values.options}
                      onAdd={() => {
                        const temp = [...formik.values.options]
                        temp.push({
                          index: temp.length + 1,
                          value: 'Nueva opción'
                        })
                        formik.setFieldValue('options', temp)
                      }}
                      onChange={(textValue, option) => {
                        let temp = [...formik.values.options]
                        temp = temp.map((item) =>
                          item.index === option.index
                            ? { ...item, value: textValue }
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
                      error={formik.errors.options}
                    />
                  )}
                  {currentType === 'TEXT' && <AnswerText />}
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

export default memo(QuestionModal)
