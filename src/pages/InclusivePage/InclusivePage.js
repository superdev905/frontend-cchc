import { Box } from '@material-ui/core'
import { PageHeading, Wrapper } from '../../components/UI'
import Inclusive from '../../components/Inclusive/Inclusive'

const InclusivePage = () => (
  <Box>
    <Wrapper>
      <PageHeading>Casos Sociales de Inclusión</PageHeading>
      <Box>
        <Inclusive />
      </Box>
    </Wrapper>
  </Box>
)

export default InclusivePage
