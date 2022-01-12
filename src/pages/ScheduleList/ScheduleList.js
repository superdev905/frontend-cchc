import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import { ScheduleList } from '../../components/Schedule'
import { ModuleIndicator } from '../../components/Shared'

const ListPage = () => (
  <Box>
    <ModuleIndicator module={'PROGRAMACIÓN'} />
    <Box marginBottom="10px" display="flex" alignItems="center">
      <PageHeading>Programaciones</PageHeading>
    </Box>
    <ScheduleList />
  </Box>
)

export default ListPage
