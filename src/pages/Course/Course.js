import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import coursesActions from '../../state/actions/courses'
import { CourseDetails, CourseTab } from '../../components/Course'
import { HeadingWithButton } from '../../components/Shared'
import { Button, Wrapper } from '../../components/UI'

const Course = ({ children }) => {
  const dispatch = useDispatch()
  const { idCourse } = useParams()
  const [loading, setLoading] = useState(null)
  const { courseDetails: course } = useSelector((state) => state.courses)

  const fetchCourse = () => {
    setLoading(true)
    dispatch(coursesActions.getCourse(idCourse)).then(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchCourse()
  }, [])

  return (
    <Wrapper>
      <Box display="flex" justifyContent="space-between">
        <HeadingWithButton
          title={course && `${course.code} - ${course.name}`}
          timeAgo="Hace 1 día"
          loading={loading}
        />
        <Box>
          <Button danger>Eliminar</Button>
          <Button>Editar</Button>
        </Box>
      </Box>
      <CourseDetails loading={loading} />
      <CourseTab>{children}</CourseTab>
    </Wrapper>
  )
}

export default Course
