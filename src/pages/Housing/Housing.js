import { Box } from '@material-ui/core'
import { PageHeading, Wrapper } from '../../components/UI'
import HouseDashboard from '../../components/Housing/HouseDashboard'
import HouseCredit from '../../components/Housing/HouseCredit'
import { ModuleIndicator } from '../../components/Shared'

const Housing = () => (
  <Box>
    <ModuleIndicator module={'VIVIENDA'} />
    <Wrapper>
      <PageHeading>Vivienda</PageHeading>
      <Box>
        <HouseDashboard />
      </Box>
      <Box>
        <HouseCredit />
      </Box>
    </Wrapper>
  </Box>
)
export default Housing
