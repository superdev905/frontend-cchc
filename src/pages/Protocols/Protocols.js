import { Box } from '@material-ui/core'
import { ProtocolsList } from '../../components/Protocols'
import { ModuleIndicator } from '../../components/Shared'
import { PageHeading } from '../../components/UI'

const Protocols = () => (
  <Box>
    <ModuleIndicator module={'PROTOCOLOS'} />
    <PageHeading>Protocolos</PageHeading>
    <ProtocolsList />
  </Box>
)

export default Protocols
