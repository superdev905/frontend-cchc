import { Box } from '@material-ui/core'
import { PageHeading, Wrapper } from '../../components/UI'
import { InclusionList } from '../../components/Inclusion'
import InclusiveDashboard from '../../components/Inclusive/InclusiveDashboard'

const InclusivePage = () => (
  <Box>
    <PageHeading>Casos Sociales de Inclusión</PageHeading>
    <Box my={2}>
      <InclusiveDashboard />
    </Box>
    <Wrapper>
      <InclusionList />
    </Wrapper>
  </Box>
)

export default InclusivePage
