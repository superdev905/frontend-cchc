import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import { PollsDot } from '../../components/Polls'
import { PageHeading } from '../../components/UI'
import uiActions from '../../state/actions/ui'
import CoursesList from '../../components/Courses/CoursesList'
import OTECSList from '../../components/Courses/OTECSList'

const Courses = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(uiActions.setCurrentModule('CURSOS'))
  }, [])

  return (
    <Box>
      <PageHeading>
        Cursos <PollsDot module="CURSOS" />
      </PageHeading>
      <CoursesList />
      <OTECSList />
    </Box>
  )
}

export default Courses
