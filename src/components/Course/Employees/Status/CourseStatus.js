import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog } from '../../../Shared'
import { Button, Select, SubmitButton } from '../../../UI'
import { useSuccess } from '../../../../hooks'

const statusStudentList = ['APROBADO', 'REPROBADO']

const validationSchema = Yup.object().shape({
  studentStatus: Yup.string().required(
    'Ingrese estado de aprobación del alumno'
  )
})

const CourseStatus = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successMessage,
  successFunction
}) => {
  const [currentDate] = useState(new Date())
  const { idCourse } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      courseId: idCourse,
      date: currentDate,
      studentStatus: type === 'UPDATE' ? data.studentStatus : ''
    },
    onSubmit: (values, { resetForm }) => {
      submitFunction({
        ...values,
        createDate: new Date().toISOString()
      })
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            onClose()
            enqueueSnackbar(successMessage, {
              variant: 'success'
            })
            resetForm()
            if (successFunction) {
              successFunction()
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
    if (open) {
      formik.resetForm()
    }
  }, [open, type])

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          {`${type === 'UPDATE' ? 'Actualizar' : 'Nuevo'} Seguimiento`}
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Select
                label="Estado alumno"
                required
                name="studentStatus"
                value={formik.values.studentStatus}
                onChange={formik.handleChange}
                error={
                  formik.touched.studentStatus &&
                  Boolean(formik.errors.studentStatus)
                }
                helperText={
                  formik.touched.studentStatus && formik.errors.studentStatus
                }
              >
                <option value="">SELECCINE ESTADO DE ESTUDIANTE</option>
                {statusStudentList.map((item) => (
                  <option value={item}>{item}</option>
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
              loading={formik.isSubmitting}
              success={success}
            >
              {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} Seguimiento`}
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

CourseStatus.defaultProps = {
  type: 'CREATE'
}

export default CourseStatus
