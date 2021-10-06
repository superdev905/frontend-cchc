import { Box } from '@material-ui/core'
import ClassesCard from './Card'

const ClassesTab = () => (
  <Box>
    <ClassesCard.Container>
      <ClassesCard.AddCard />
      <ClassesCard completed />
      <ClassesCard />
      <ClassesCard />
      <ClassesCard />
    </ClassesCard.Container>
  </Box>
)

export default ClassesTab
