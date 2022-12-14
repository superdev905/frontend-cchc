import { capitalize } from 'lodash'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, Grid } from '@material-ui/core'
import { Button, Select, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'
import { decisionList } from '../../../config'
import scholarshipsActions from '../../../state/actions/scholarships'
import { scholarshipSchema } from './schemas'
import { formatQuery } from '../../../formatters'

const Scholarship = ({
  onCancel,
  data,
  submitFunction,
  successMessage,
  successFunction,
  submitText = 'Actualizar'
}) => {
  const dispatch = useDispatch()
  const { success, changeSuccess } = useSuccess()
  const { enqueueSnackbar } = useSnackbar()
  const { careers } = useSelector((state) => state.scholarships)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema: scholarshipSchema,
    initialValues: {
      careerId: data?.careerId || '',
      careerName: data?.careerName || '',
      averageLastYear: data?.averageLastYear || '',
      semester: data?.semester || '',
      tracking: data?.tracking || ''
    },
    onSubmit: (values) => {
      submitFunction(formatQuery(values))
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            enqueueSnackbar(successMessage, { variant: 'success' })
            if (successFunction) {
              successFunction()
            }
          })
        })
        .catch((err) => {
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })

  useEffect(() => {
    const { careerId } = formik.values
    if (careerId && careers.length > 0) {
      const currentCareer = careers.find(
        (item) => item.id === parseInt(careerId, 10)
      )
      formik.setFieldValue('careerName', currentCareer.name)
    } else {
      formik.setFieldValue('careerName', '')
    }
  }, [formik.values.careerId, careers])

  useEffect(() => {
    const { careerId } = formik.values
    if (careerId === '') {
      formik.setFieldValue('careerId', '')
      formik.setFieldValue('careerName', '')
    }
  }, [formik.values.careerId, careers])

  useEffect(() => {
    dispatch(scholarshipsActions.getCareers())
  }, [])

  return (
    <Box>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Promedio de ultimo a??o cursado"
              required
              type="number"
              name="averageLastYear"
              value={formik.values.averageLastYear}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.averageLastYear &&
                Boolean(formik.errors.averageLastYear)
              }
              helperText={
                formik.touched.averageLastYear && formik.errors.averageLastYear
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="A??o de carrera"
              required
              type="number"
              name="semester"
              value={formik.values.semester}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.semester && Boolean(formik.errors.semester)}
              helperText={formik.touched.semester && formik.errors.semester}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              label="Carrera"
              name="careerId"
              value={formik.values.careerId}
              required
              onChange={formik.handleChange}
            >
              <option value="">NO APLICA</option>
              {careers.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              label="Seguimiento"
              name="tracking"
              value={formik.values.tracking}
              required
              onChange={formik.handleChange}
            >
              <option value="">NO APLICA</option>
              {decisionList.map((item) => (
                <option value={item}>{capitalize(item)}</option>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Box textAlign="center" marginTop="10px">
          <Button onClick={onCancel} variant="outlined">
            Cancelar
          </Button>
          <SubmitButton
            onClick={formik.handleSubmit}
            disabled={!formik.isValid || formik.isSubmitting}
            loading={formik.isSubmitting}
            success={success}
          >
            {submitText}
          </SubmitButton>
        </Box>
      </Box>
    </Box>
  )
}

Scholarship.defaultProps = {
  type: 'CREATE'
}

export default Scholarship
