import { useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Box, Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog } from '../../Shared'
import { Button, Select, SubmitButton, TextArea } from '../../UI'
import commonPublicActions from '../../../state/actions/commonPublic'

const validationSchema = Yup.object().shape({
  areaId: Yup.number().required('Seleccione area'),
  title: Yup.string().required('Ingrese título'),
  question: Yup.string().required('Ingrese consulta')
})

const QuestionModal = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const { areas } = useSelector((state) => state.commonPublic)
  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      areaId: '',
      title: '',
      question: ''
    },
    onSubmit: () => {}
  })

  useEffect(() => {
    if (open) {
      dispatch(commonPublicActions.getAreas())
    }
  }, [open])
  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Box>
        <Typography align="center" variant="h6">
          Nueva pregunta
        </Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
