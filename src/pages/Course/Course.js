import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'
import { Box, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { useParams, useHistory } from 'react-router-dom'
import coursesActions from '../../state/actions/courses'
import { CourseDetails, CourseTab } from '../../components/Course'
import { ConfirmDelete, HeadingWithButton } from '../../components/Shared'
import { Button, Wrapper } from '../../components/UI'
import CreateCourse from '../../components/Courses/CreateCourse'

import { useSuccess, useToggle } from '../../hooks'
import UpdateCourse from '../../components/Courses/UpdateStatus'

const Course = ({ children }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { idCourse } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const { courseDetails: course } = useSelector((state) => state.courses)
  const { success, changeSuccess } = useSuccess()
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { open: openUpdateCourse, toggleOpen: toggleOpenUpdateCourse } =
    useToggle()

  const updateCourse = (values) =>
    dispatch(
      coursesActions.updateCourse(course.id, {
        ...values,
        benefitId: course.benefitId
      })
    )

  const fetchCourse = () => {
    setLoading(true)
    dispatch(coursesActions.getCourse(idCourse)).then(() => {
      setLoading(false)
    })
  }
  const deleteCourses = (id) => {
    setDeleting(true)
    dispatch(
      coursesActions.patchCourse(id, {
        state: 'DELETED'
      })
    )
      .then(() => {
        setDeleting(false)
        changeSuccess(true, () => {
          toggleOpenDelete()
          fetchCourse()
          enqueueSnackbar('Curso eliminado exitosamente', {
            autoHideDuration: 1500,
            variant: 'success'
          })
        })
      })
      .catch(() => {
        setDeleting(false)
      })
  }

  const goBack = () => {
    history.push('/courses')
  }

  useEffect(() => {
    if (idCourse) {
      fetchCourse()
    }
  }, [idCourse])

  return (
    <Wrapper>
      <Box display="flex" justifyContent="space-between">
        <HeadingWithButton
          goBack={goBack}
          title={course && `${course.code} - ${course.name}`}
          timeAgo={course && course.timeAgo}
          loading={loading}
        />
        <Box>
          <Button
            variant="outlined"
            onClick={toggleOpenUpdateCourse}
            disabled={course?.state === 'DELETED'}
          >
            Actualizar estado
          </Button>
          <Button
            danger
            onClick={toggleOpenDelete}
            disabled={course?.state === 'DELETED'}
          >
            Eliminar
          </Button>
          <Button
            onClick={toggleOpenUpdate}
            disabled={course?.state === 'DELETED'}
          >
            Editar
          </Button>
        </Box>
      </Box>
      <CourseDetails loading={loading} />
      <CourseTab>{children}</CourseTab>

      {course && openUpdate && (
        <CreateCourse
          type="UPDATE"
          open={openUpdate}
          onClose={toggleOpenUpdate}
          data={course}
          submitFunction={updateCourse}
          successFunction={fetchCourse}
          successMessage="Datos de curso actualizados"
        />
      )}

      {course && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          onConfirm={() => deleteCourses(course.id)}
          message={
            <Box>
              <Box mb={2}>
                <Typography variant="h6">
                  ¿Estás seguro de eliminar este curso?
                </Typography>
              </Box>
              <Alert severity="warning">
                Al eliminar este curso se eliminará el beneficio asociado
              </Alert>
            </Box>
          }
          loading={deleting}
          success={success}
        />
      )}

      {course && openUpdateCourse && (
        <UpdateCourse
          status={course.status}
          open={openUpdateCourse}
          onClose={toggleOpenUpdateCourse}
        />
      )}
    </Wrapper>
  )
}

export default Course
