import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import MigrantList from '../../components/Migrants/MigrantList'
import { ModuleIndicator } from '../../components/Shared'

const Migrant = () => (
  <Box>
    <ModuleIndicator module={'MIGRANTES'} />
    <PageHeading>Migrantes</PageHeading>
    <MigrantList />
  </Box>
)

export default Migrant
