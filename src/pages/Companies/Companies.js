import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import CompaniesList from '../../components/Companies/List'
import { PollsDot } from '../../components/Polls'

const Companies = () => (
  <Box>
    <PageHeading>
      Empresas <PollsDot />
    </PageHeading>
    <CompaniesList />
  </Box>
)

export default Companies
