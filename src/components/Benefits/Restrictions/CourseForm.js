import { capitalize } from 'lodash'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { Autocomplete } from '@material-ui/lab'
import { Box, Grid } from '@material-ui/core'
import { CompanyRow, CurrencyTextField } from '../../Shared'
import { Button, InputLabel, Select, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'
import commonActions from '../../../state/actions/common'
import usersActions from '../../../state/actions/users'
import { courseSchema } from './schemas'

const modalities = ['PRESENCIAL', 'ELEARNING', 'ON LINE']

const Course = ({
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
  const { otecs, specList } = useSelector((state) => state.common)
  const [selectedOTEC, setSelectedOTEC] = useState(null)
  const [instructorsList, setInstructorList] = useState([])
  const [foundationUsers, setFoundationUsers] = useState([])

  const formik = useFormik({
    validateOnMount: true,
    validationSchema: courseSchema,
    initialValues: {
      otecId: data?.otecId || '',
      otecName: data?.otecName || '',
      instructorId: data?.instructorId || '',
      instructorName: data?.instructorName || '',
      place: data?.place || '',
      modality: data?.modality || '',
      participants: data?.participants || '',
      courseHours: data?.courseHours || '',
      occupationName: data?.occupationName || '',
      assignedTo: data?.assignedTo || '',
      assignedName: data?.assignedName || '',
      enrollCost: data?.enrollCost || ''
    },
    onSubmit: (values) => {
      submitFunction(values)
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
    if (otecs.length > 0 && data) {
      const currentOtec = otecs.find(
        (item) => item.id === parseInt(data.otecId, 10)
      )
      setSelectedOTEC(currentOtec)
    }
  }, [otecs])

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
    const { assignedTo } = formik.values
    if (assignedTo && foundationUsers.length > 0) {
      const currentUser = foundationUsers.find(
        (item) => item.id === parseInt(assignedTo, 10)
      )
      formik.setFieldValue(
        'assignedName',
        `${currentUser.names} ${currentUser.paternal_surname} ${currentUser.maternal_surname}`
      )
    } else {
      formik.setFieldValue('assignedName', '')
    }
  }, [formik.values.assignedTo, foundationUsers])

  useEffect(() => {
    formik.resetForm()
    dispatch(commonActions.getAllOTECS())
    dispatch(commonActions.getSpecList())
    dispatch(usersActions.getOTECUsers()).then((result) => {
      setInstructorList(result)
    })
    dispatch(usersActions.getFoundationUsers()).then((result) => {
      setFoundationUsers(result)
    })
  }, [])

  return (
    <Box>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
              <option value="">SELECCIONE RELATOR</option>
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
              error={formik.touched.modality && Boolean(formik.errors.modality)}
            >
              <option value="">SELECCIONE MODALIDAD</option>
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
                formik.touched.courseHours && Boolean(formik.errors.courseHours)
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
              <option value="">SELECCIONE OFICIO </option>
              {specList.map((item, index) => (
                <option
                  key={`specialty_id--${index}`}
                  value={`${item.description}`}
                >
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
              helperText={formik.touched.assignedTo && formik.errors.assignedTo}
              error={
                formik.touched.assignedTo && Boolean(formik.errors.assignedTo)
              }
            >
              <option value="">SELECCIONE RESPONSABLE</option>
              {foundationUsers.map((item) => (
                <option
                  value={item.id}
                >{`${item.names} ${item.paternal_surname} ${item.maternal_surname}`}</option>
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
              helperText={formik.touched.enrollCost && formik.errors.enrollCost}
            />
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

Course.defaultProps = {
  type: 'CREATE'
}

export default Course
