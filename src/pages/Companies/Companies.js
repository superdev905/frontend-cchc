import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import CompaniesList from '../../components/Companies/List'
import { ModuleIndicator } from '../../components/Shared'

const Companies = () => (
  <Box>
    <ModuleIndicator module={'EMPRESAS'} />
    <PageHeading>Empresas</PageHeading>
    <CompaniesList />
  </Box>
)

export default Companies
