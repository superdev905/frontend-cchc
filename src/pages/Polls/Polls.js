import { Box } from '@material-ui/core'
import PollHeader from '../../components/Polls/PollHeader'
import { ModuleIndicator } from '../../components/Shared'
import { PageHeading } from '../../components/UI'

const Polls = () => (
  <Box>
    <ModuleIndicator module={'ENCUESTAS'} />
    <PageHeading>Encuestas</PageHeading>
    <PollHeader />
  </Box>
)

export default Polls
