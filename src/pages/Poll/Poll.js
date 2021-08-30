import { Box } from '@material-ui/core'
import PollDetails from '../../components/Polls/PollDetails'
import { PageHeading } from '../../components/UI'

const Poll = () => (
  <Box>
    <PageHeading>Detalle de Encuesta</PageHeading>
    <PollDetails />
  </Box>
)

export default Poll
