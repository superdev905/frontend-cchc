import { Box } from '@material-ui/core'
import { PageHeading, Wrapper } from '../../components/UI'
import { InclusionList } from '../../components/Inclusion'

const InclusivePage = () => (
  <Box>
    <PageHeading>Casos Sociales de Inclusión</PageHeading>
    <Wrapper>
      <InclusionList />
    </Wrapper>
  </Box>
)

export default InclusivePage
