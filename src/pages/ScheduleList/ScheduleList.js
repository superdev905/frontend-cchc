import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import { ScheduleList } from '../../components/Schedule'

const ListPage = () => (
  <Box>
    <Box marginBottom="10px" display="flex" alignItems="center">
      <PageHeading>Programaciones</PageHeading>
    </Box>
    <ScheduleList />
  </Box>
)

export default ListPage
