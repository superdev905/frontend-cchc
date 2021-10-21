import { capitalize } from 'lodash'
import * as Yup from 'yup'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog } from '../../Shared'
import { Button, Select, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'
import { decisionList } from '../../../config'
import benefitsActions from '../../../state/actions/benefits'
import scholarshipsActions from '../../../state/actions/scholarships'

const validationSchema = Yup.object().shape({
  careerId: Yup.string().required('Seleccione nombre de carrera'),
  averageLastYear: Yup.number()
    .min(1, 'El promedio debe ser mayor o igual a 1')
    .max(7, 'El promedio debe ser menor o igual a 7')
    .required('Ingrese nota'),
  semester: Yup.string().required('Ingrese año de carrera'),
  tracking: Yup.string().required('Ingrese segumiento')
})

const Scholarship = ({ open, onClose, type, benefit }) => {
  const dispatch = useDispatch()
  const { success } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)
  const { create } = useSelector((state) => state.benefits)
  const { careers } = useSelector((state) => state.scholarships)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      careerId:
        type === 'UPDATE' ? benefit.scholarshipRestriction.careerId : '',
      careerName:
        type === 'UPDATE' ? benefit.scholarshipRestriction.careerName : '',
      averageLastYear:
        type === 'UPDATE' ? benefit.scholarshipRestriction.averageLastYear : '',
      semester:
        type === 'UPDATE' ? benefit.scholarshipRestriction.semester : '',
      tracking: type === 'UPDATE' ? benefit.scholarshipRestriction.tracking : ''
    },
    onSubmit: (values) => {
      const data = {
        ...create,
        benefit: {
          ...create.benefit,
          scholarshipRestriction: values
        }
      }
      if (create.type === 'CREATE') {
        dispatch(
          benefitsActions.updateCreate({
            ...create,
            ...data,
            step: create.step - 1
          })
        )
      }
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
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${type === 'UPDATE' ? 'Actualizar' : 'Nueva'} restricción por beca`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Promedio de ultimo año cursado"
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
                  formik.touched.averageLastYear &&
                  formik.errors.averageLastYear
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Año de carrera"
                required
                type="number"
                name="semester"
                value={formik.values.semester}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.semester && Boolean(formik.errors.semester)
                }
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
                <option value="">Seleccione carrera</option>
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
                <option value="">Seleccione seguimiento</option>
                {decisionList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
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
              success={success}
            >
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} restricción`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

Scholarship.defaultProps = {
  type: 'CREATE'
}

export default Scholarship
