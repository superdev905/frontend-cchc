import { Box } from '@material-ui/core'
import { EventList } from '../../components/Assistance'
import { PageHeading } from '../../components/UI'

const Assistance = () => (
  <Box>
    <PageHeading>Próximas visitas</PageHeading>

    <EventList />
  </Box>
)

export default Assistance
