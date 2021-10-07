import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import coursesActions from '../../state/actions/courses'
import { CourseDetails, CourseTab } from '../../components/Course'
import { HeadingWithButton } from '../../components/Shared'
import { Button, Wrapper } from '../../components/UI'

const Course = ({ children }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { idCourse } = useParams()
  const [loading, setLoading] = useState(null)
  const { courseDetails: course } = useSelector((state) => state.courses)

  const fetchCourse = () => {
    setLoading(true)
    dispatch(coursesActions.getCourse(idCourse)).then(() => {
      setLoading(false)
    })
  }

  const goBack = () => {
    history.push('/courses')
  }

  useEffect(() => {
    fetchCourse()
  }, [])

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
