import { Box } from '@material-ui/core'
import { ProtocolsList } from '../../components/Protocols'
import { PageHeading } from '../../components/UI'

const Protocols = () => (
  <Box>
    <PageHeading>Protocolos</PageHeading>
    <ProtocolsList />
  </Box>
)

export default Protocols
