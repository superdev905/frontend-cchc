import { capitalize } from 'lodash'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Autocomplete } from '@material-ui/lab'
import { Box, Grid, Typography } from '@material-ui/core'
import { CompanyRow, CurrencyTextField, Dialog } from '../../Shared'
import { Button, InputLabel, Select, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'
import commonActions from '../../../state/actions/common'
import usersActions from '../../../state/actions/users'
import benefitsActions from '../../../state/actions/benefits'

const optionsList = [1, 2, 3]
const modalities = ['PRESENCIAL', 'E-LEARNING', 'ON LINE']

const validationSchema = Yup.object().shape({
  otecId: Yup.string().required(
    'Seleccione empresa que realiza la capacitación'
  ),
  instructorId: Yup.string().required('Ingrese relator'),
  place: Yup.string().required('Ingrese lugar'),
  modality: Yup.string().required('Seleccione modalidad'),
  participants: Yup.string().required('Ingrese participantes'),
  courseHours: Yup.string().required('Ingrese horas del curso'),
  occupationName: Yup.string().required('Seleccione nombre oficio'),
  assignedTo: Yup.string().required('Seleccione responsable de fundación'),
  enrollCost: Yup.string().required('Ingrese costo de matrícula')
})

const Course = ({ open, onClose, type, benefit }) => {
  const dispatch = useDispatch()
  const { success } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)
  const { otecs, specList } = useSelector((state) => state.common)
  const { create } = useSelector((state) => state.benefits)
  const [selectedOTEC, setSelectedOTEC] = useState(null)
  const [instructorsList, setInstructorList] = useState([])

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      otecId: type === 'UPDATE' ? benefit.courseRestriction.otecId : '',
      otecName: type === 'UPDATE' ? benefit.courseRestriction.otecName : '',
      instructorId:
        type === 'UPDATE' ? benefit.courseRestriction.instructorId : '',
      instructorName:
        type === 'UPDATE' ? benefit.courseRestriction.instructorName : '',
      place: type === 'UPDATE' ? benefit.courseRestriction.place : '',
      modality: type === 'UPDATE' ? benefit.courseRestriction.modality : '',
      participants:
        type === 'UPDATE' ? benefit.courseRestriction.participants : '',
      courseHours:
        type === 'UPDATE' ? benefit.courseRestriction.courseHours : '',
      occupationName:
        type === 'UPDATE' ? benefit.courseRestriction.occupationName : '',
      assignedTo: type === 'UPDATE' ? benefit.courseRestriction.assignedTo : '',
      enrollCost: type === 'UPDATE' ? benefit.courseRestriction.enrollCost : ''
    },
    onSubmit: (values) => {
      const data = {
        ...create.benefit,
        createdDate: new Date(),
        description: '',
        projectName: '',
        isActive: true,
        courseRestriction: values
      }
      if (create.type === 'CREATE') {
        dispatch(benefitsActions.createBenefit(data)).then(() => {
          dispatch(
            benefitsActions.updateCreate({
              ...create,
              step: create.step + 1
            })
          )
        })
      }
    }
  })

  useEffect(() => {
    if (type === 'UPDATE' && otecs.length > 0) {
      const currentOtec = otecs.find(
        (item) => item.id === parseInt(benefit.otecId, 10)
      )
      setSelectedOTEC(currentOtec)
    }
  }, [type, otecs])

  useEffect(() => {
    const otecId = selectedOTEC?.id || ''
    const otecName = selectedOTEC?.businessName || ''
    formik.setFieldValue('otecId', otecId)
    formik.setFieldValue('otecName', otecName)
  }, [selectedOTEC])

  useEffect(() => {
    const { instructorId } = formik.values
    if (instructorId && instructorsList.length > 0) {
      const currentInstructor = instructorsList.find(
        (item) => item.id === parseInt(instructorId, 10)
      )
      formik.setFieldValue('instructorName', currentInstructor.name)
    } else {
      formik.setFieldValue('instructorName', '')
    }
  }, [formik.values.instructorId, instructorsList])

  useEffect(() => {
    const { instructorId } = formik.values
    if (instructorId === '') {
      formik.setFieldValue('instructorId', '')
      formik.setFieldValue('instructorName', '')
    }
  }, [formik.values.instructorId, instructorsList])

  useEffect(() => {
    if (open) {
      formik.resetForm()
      dispatch(commonActions.getAllOTECS())
      dispatch(commonActions.getSpecList())
      dispatch(usersActions.getOTECUsers()).then((result) => {
        setInstructorList(result)
      })
    }
  }, [open, type])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${
            type === 'UPDATE' ? 'Actualizar' : 'Nueva'
          } restricción por curso`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <InputLabel required>Empresa que capacita</InputLabel>
              {selectedOTEC ? (
                <CompanyRow
                  company={selectedOTEC}
                  onDelete={() => {
                    setSelectedOTEC(null)
                  }}
                />
              ) : (
                <Autocomplete
                  required
                  options={otecs}
                  value={''}
                  getOptionLabel={(option) => option.businessName || ''}
                  onChange={(__, option) => {
                    setSelectedOTEC(option)
                  }}
                  renderOption={(option) => (
                    <CompanyRow.Autocomplete
                      company={option}
                      iconColor="#BD52F2"
                    />
                  )}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Relator"
                required
                name="instructorId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.instructorId}
                helperText={
                  formik.touched.instructorId && formik.errors.instructorId
                }
                error={
                  formik.touched.instructorId &&
                  Boolean(formik.errors.instructorId)
                }
              >
                <option value="">Seleccione relator</option>
                {instructorsList.map((item) => (
                  <option
                    value={item.id}
                  >{`${item.names} ${item.paternal_surname} ${item.maternal_surname}`}</option>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Lugar"
                required
                name="place"
                value={formik.values.place}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.place && Boolean(formik.errors.place)}
                helperText={formik.touched.place && formik.errors.place}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Select
                label="Modalidad"
                required
                name="modality"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.modality}
                helperText={formik.touched.modality && formik.errors.modality}
                error={
                  formik.touched.modality && Boolean(formik.errors.modality)
                }
              >
                <option value="">Seleccione modalidad</option>
                {modalities.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Participantes"
                type="number"
                required
                name="participants"
                value={formik.values.participants}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.participants &&
                  Boolean(formik.errors.participants)
                }
                helperText={
                  formik.touched.participants && formik.errors.participants
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Horas del curso"
                type="number"
                required
                name="courseHours"
                value={formik.values.courseHours}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.courseHours &&
                  Boolean(formik.errors.courseHours)
                }
                helperText={
                  formik.touched.courseHours && formik.errors.courseHours
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Nombre del oficio"
                required
                name="occupationName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.occupationName}
                helperText={
                  formik.touched.occupationName && formik.errors.occupationName
                }
                error={
                  formik.touched.occupationName &&
                  Boolean(formik.errors.occupationName)
                }
              >
                <option value="">Seleccione oficio</option>
                {specList.map((item, index) => (
                  <option key={`specialty_id--${index}`} value={`${item.id}`}>
                    {`${item.description}`}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Responsable fundación"
                required
                name="assignedTo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.assignedTo}
                helperText={
                  formik.touched.assignedTo && formik.errors.assignedTo
                }
                error={
                  formik.touched.assignedTo && Boolean(formik.errors.assignedTo)
                }
              >
                <option value="">Seleccione responsable</option>
                {optionsList.map((item) => (
                  <option value={item}>{capitalize(item)}</option>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <CurrencyTextField
                label="Costo de matricula"
                required
                name="enrollCost"
                value={formik.values.enrollCost}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.enrollCost && Boolean(formik.errors.enrollCost)
                }
                helperText={
                  formik.touched.enrollCost && formik.errors.enrollCost
                }
              />
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
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} restricción`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

Course.defaultProps = {
  type: 'CREATE'
}

export default Course
