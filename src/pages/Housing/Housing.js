import { Box } from '@material-ui/core'
import { PageHeading, Wrapper } from '../../components/UI'
import HouseDashboard from '../../components/Housing/HouseDashboard'
import HouseCredit from '../../components/Housing/HouseCredit'
import HouseOwners from '../../components/Housing/HouseOwners'

const Housing = () => (
  <Box>
    <Wrapper>
      <PageHeading>Vivienda</PageHeading>
      <Box>
        <HouseDashboard />
      </Box>
      <Box>
        <HouseCredit />
      </Box>
      <Box>
        <HouseOwners />
      </Box>
    </Wrapper>
  </Box>
)
export default Housing
