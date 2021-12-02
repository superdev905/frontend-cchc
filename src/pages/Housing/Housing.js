import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import HouseDashboard from '../../components/Housing/HouseDashboard'
import HouseCredit from '../../components/Housing/HouseCredit'
import HouseAtention from '../../components/Housing/HouseAtention'
import HouseOwners from '../../components/Housing/HouseOwners'

const Housing = () => (
  <Box>
    <PageHeading>Vivienda</PageHeading>
    <Box>
      <HouseDashboard />
      <HouseCredit />
      <HouseAtention />
      <HouseOwners />
    </Box>
    <br />
  </Box>
)
export default Housing
