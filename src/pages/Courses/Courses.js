import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'

import CoursesList from '../../components/Courses/CoursesList'
import { ModuleIndicator } from '../../components/Shared'

const Courses = () => (
  <Box>
    <ModuleIndicator module={'CURSOS'} />
    <PageHeading>Cursos</PageHeading>
    <CoursesList />
  </Box>
)

export default Courses
