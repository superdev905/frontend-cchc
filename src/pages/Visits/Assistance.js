import { Box } from '@material-ui/core'
import { EventList } from '../../components/Assistance'
import { PollsDot } from '../../components/Polls'
import { PageHeading } from '../../components/UI'

const Assistance = () => (
  <Box>
    <PageHeading>
      Próximas visitas <PollsDot module="VISITAS" />
    </PageHeading>

    <EventList />
  </Box>
)

export default Assistance
