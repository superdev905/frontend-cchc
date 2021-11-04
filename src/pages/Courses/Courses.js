import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import uiActions from '../../state/actions/ui'
import CoursesList from '../../components/Courses/CoursesList'

const Courses = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(uiActions.setCurrentModule('CURSOS'))
  }, [])

  return (
    <Box>
      <PageHeading>Cursos</PageHeading>
      <CoursesList />
    </Box>
  )
}

export default Courses
