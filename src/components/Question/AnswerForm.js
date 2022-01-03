import { useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { useSuccess } from '../../hooks'
import { Select, SubmitButton, TextArea } from '../UI'
import commonActions from '../../state/actions/common'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.gray.gray100
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  editor: {
    width: '100%',
    minHeight: 200,
    border: `1px solid ${theme.palette.gray700}`
  }
}))

const validationSchema = Yup.object().shape({
  areaId: Yup.number().required('Seleccione área'),
  topicId: Yup.number().required('Seleccione tema'),
  channel: Yup.string().required('Seleccione canal'),
  answer: Yup.string().required('Ingrese respuesta')
})

const Answer = ({
  type,
  data,
  submitFunction,
  successMessage,
  successFunction,
  defaultAreaId
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const editor = useRef(null)
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { areas } = useSelector((state) => state.common)
  const [topics, setTopics] = useState([])

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ align: [] }],
      ['link', 'code-block'],
      [{ color: [] }, { background: [] }],
      ['clean']
    ]
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'link',
    'code-block',
    'color',
    'background',
    'clean',
    'align',
    'font'
  ]

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues: {
      areaId: type === 'UPDATE' ? data.areaId : defaultAreaId || '',
      topicId: type === 'UPDATE' ? data.topicId : '',
      channel: type === 'UPDATE' ? data.channel : '',
      answer: type === 'UPDATE' ? data.answer : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({
        ...values,
        areaName: areas.find((item) => item.id === parseInt(values.areaId, 10))
          .name,
        topicName: topics.find(
          (item) => item.id === parseInt(values.topicId, 10)
        ).name,
        date: new Date().toISOString()
      })
        .then((result) => {
          formik.setSubmitting(false)
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })
          changeSuccess(true, () => {
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

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'area': {
        const area = areas.find((item) => item.id === parseInt(value, 10))
        setTopics(area?.topics || [])
        formik.setFieldValue('areaId', area?.id || '')
        formik.setFieldValue('topicId', '')
        setTimeout(() => {
          formik.setFieldTouched('areaId', 'topicId')
        }, 500)
        break
      }
      case 'topic': {
        const topic = topics.find((item) => item.id === parseInt(value, 10))
        formik.setFieldValue('topicId', topic?.id || '')
        setTimeout(() => {
          formik.setFieldTouched('topicId')
        }, 500)
        break
      }
      default:
        throw new Error('Error')
    }
  }

  useEffect(() => {
    if (formik.values.areaId && areas.length > 0) {
      handleSelectChange({
        target: { name: 'area', value: formik.values.areaId }
      })
    }
  }, [formik.values.area_id, areas])

  useEffect(() => {
    dispatch(commonActions.getAreas())
  }, [])

  return (
    <Box className={classes.root} px={2} py={3}>
      <Box mb={2}>
        <Typography className={classes.title}>Respuesta</Typography>
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Select
              label="Area"
              name="area"
              required
              onChange={handleSelectChange}
              onBlur={formik.handleBlur}
              value={formik.values.areaId}
              error={formik.touched.areaId && Boolean(formik.errors.areaId)}
              helperText={formik.touched.areaId && formik.errors.areaId}
            >
              <option value="">Seleccione Area</option>
              {areas.map((item) => (
                <option value={item.id} key={`area-${item.id}`}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xd={12} md={6}>
            <Select
              label="Tema"
              name="topic"
              required
              onChange={handleSelectChange}
              onBlur={formik.handleBlur}
              value={formik.values.topicId}
              error={formik.touched.topicId && Boolean(formik.errors.topicId)}
              helperText={formik.touched.topicId && formik.errors.topicId}
            >
              <option value="">Seleccione Tema</option>
              {topics.map((item, index) => (
                <option key={`area--${index}`} value={`${item.id}`}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xd={12} md={6}>
            <Select
              label="Canal"
              name="channel"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channel}
              error={formik.touched.channel && Boolean(formik.errors.channel)}
              helperText={formik.touched.channel && formik.errors.channel}
            >
              <option value="">Seleccione Canal</option>
              {['CORREO', 'TÉLEFONO'].map((item) => (
                <option value={item} key={`channel-${item}`}>
                  {item}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <ReactQuill
              ref={editor}
              className={classes.editor}
              theme={'snow'}
              placeholder="Respuesta..."
              preserveWhitespace
              modules={modules}
              formats={formats}
              onChange={(e) => {
                formik.setFieldValue('answer', e)
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextArea
              label="Respuesta"
              name="answer"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.answer}
              error={formik.touched.answer && Boolean(formik.errors.answer)}
              helperText={formik.touched.answer && formik.errors.answer}
              maxLength={800}
            />
          </Grid>
        </Grid>
        <Box>
          <SubmitButton
            onClick={formik.handleSubmit}
            disabled={!formik.isValid}
            success={success}
          >
            Enviar respuesta
          </SubmitButton>
        </Box>
      </Box>
    </Box>
  )
}

Answer.defaultProps = {
  type: 'Create'
}

export default Answer
