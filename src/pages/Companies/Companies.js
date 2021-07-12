import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import CompaniesList from '../../components/Companies/List'

const Companies = () => (
  <Box>
    <PageHeading>Empresas</PageHeading>
    <CompaniesList />
  </Box>
)

export default Companies
