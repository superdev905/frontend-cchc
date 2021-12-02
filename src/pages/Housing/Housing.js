import { Box } from '@material-ui/core'
import { PageHeading, Wrapper } from '../../components/UI'
import HouseDashboard from '../../components/Housing/HouseDashboard'
import HouseCredit from '../../components/Housing/HouseCredit'
import HouseAtention from '../../components/Housing/HouseAtention'
import HouseOwners from '../../components/Housing/HouseOwners'

const Housing = () => (
  <Box>
    <Wrapper>
      <PageHeading>Vivienda</PageHeading>
      <Box>
        <HouseDashboard />
      </Box>
      <br />
      <Box>
        <HouseCredit />
      </Box>
      <Box>
        <HouseAtention />
      </Box>
      <Box>
        <HouseOwners />
      </Box>
    </Wrapper>
  </Box>
)
export default Housing
