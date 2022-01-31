import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { courseConfig } from '../../config'
import { useSuccess } from '../../hooks'
import courseActions from '../../state/actions/courses'
import { Dialog } from '../Shared'
import { Button, Select, SubmitButton } from '../UI'

const validationSchema = Yup.object().shape({
  status: Yup.string().required('Seleccione estado de curso')
})

const UpdateCourse = ({ open, onClose, status }) => {
  const dispatch = useDispatch()
  const { idCourse } = useParams()

  const { enqueueSnackbar } = useSnackbar()
  const { isMobile } = useSelector((state) => state.ui)
  const { success, changeSuccess } = useSuccess()

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      status: status || ''
    },
    onSubmit: (values) => {
      dispatch(courseActions.updateCourseStatus(idCourse, values))
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(true, () => {
            dispatch(courseActions.getCourse(idCourse))
            onClose()
          })
        })
        .catch((err) => {
          formik.setSubmitting(false)
          enqueueSnackbar(err, { variant: 'error' })
        })
    }
  })

  return (
    <>
      <Dialog open={open} onClose={onClose} fullScreen={isMobile} fullWidth>
        <Box mt={2}>
          <Typography
            variant="h6"
            align="center"
            style={{ fontWeight: 'bold' }}
          >
            Estado de curso
          </Typography>
          <Box>
            <Select
              label={'Estado de curso'}
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
            >
              {courseConfig.statusList.map((item) => (
                <option key={`curse-option-item`} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Box>
          <Box textAlign="center" marginTop="10px">
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <SubmitButton
              success={success}
              loading={formik.isSubmitting}
              onClick={formik.handleSubmit}
              disabled={!formik.isValid}
            >
              Agregar
            </SubmitButton>
          </Box>
        </Box>
      </Dialog>
    </>
  )
}

export default UpdateCourse
