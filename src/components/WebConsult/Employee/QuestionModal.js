import { useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog } from '../../Shared'
import { Button, Select, SubmitButton, TextArea } from '../../UI'
import commonPublicActions from '../../../state/actions/commonPublic'
import questionEmployeeActions from '../../../state/actions/questionEmployee'
import { useSuccess } from '../../../hooks'

const validationSchema = Yup.object().shape({
  areaId: Yup.number().required('Seleccione area'),
  title: Yup.string().required('Ingrese título'),
  question: Yup.string().required('Ingrese consulta'),
  delegation: Yup.string().required('Seleeciona delegación')
})

const QuestionModal = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { isMobile } = useSelector((state) => state.ui)
  const { areas, regions } = useSelector((state) => state.commonPublic)
  const { employee } = useSelector((state) => state.questionEmployee)
  const { success, changeSuccess } = useSuccess()
  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      areaId: '',
      title: '',
      question: '',
      delegation: ''
    },
    onSubmit: (values) => {
      dispatch(
        questionEmployeeActions.createQuestion({
          ...values,
          areaName: areas.find(
            (item) => item.id === parseInt(values.areaId, 10)
          ).name,
          employeeId: employee.id,
          employeeRut: employee.run,
          delegation: 'ANTOFAGASTA',
          zone: 'ANTOFAGASTA',
          employeeNames: `${employee.names} ${employee.paternal_surname}`
            .trim()
            .toUpperCase()
        })
      )
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            onClose()
            enqueueSnackbar('Pregunta creada', { variant: 'success' })
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })

  useEffect(() => {
    if (open) {
      dispatch(commonPublicActions.getAreas())
      dispatch(commonPublicActions.getRegions())
    }
  }, [open])
  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Box>
        <Box mb={1}>
          <Typography align="center" variant="h6">
            Nueva pregunta
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Select
                required
                label="Area"
                name="areaId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.areaId}
                error={formik.touched.areaId && Boolean(formik.errors.areaId)}
                helperText={formik.touched.areaId && formik.errors.areaId}
              >
                <option value="">SELECCIONA AREA</option>
                {areas.map((item) => (
                  <option key={`area-${item.id}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Select
                required
                label="Delegación"
                name="delegation"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.delegation}
                error={
                  formik.touched.delegation && Boolean(formik.errors.delegation)
                }
                helperText={
                  formik.touched.delegation && formik.errors.delegation
                }
              >
                <option value="">SELECCIONA DELEGACIÓN</option>
                {regions.map((item) => (
                  <option key={`area-${item.id}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextArea
                label="Título"
                required
                value={formik.values.title}
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rowsMin={1}
                maxLength={300}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextArea
                label="Consulta"
                required
                value={formik.values.question}
                name="question"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                maxLength={1000}
                error={
                  formik.touched.question && Boolean(formik.errors.question)
                }
                helperText={formik.touched.question && formik.errors.question}
              />
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Button onClick={onClose} variant="outlined">
              Cancelar
            </Button>
            <SubmitButton
              loading={formik.isSubmitting}
              onClick={formik.handleSubmit}
              success={success}
            >
              Crear pregunta
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default QuestionModal
