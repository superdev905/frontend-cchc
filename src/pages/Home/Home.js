import { Box, Grid } from '@material-ui/core'
import {
  NextVisits,
  LastAttentions,
  DeliveredBenefits
} from '../../components/Home'
import { ModuleIndicator } from '../../components/Shared'

const Home = () => (
  <Box>
    <ModuleIndicator module={'HOME'} />
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <NextVisits />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Box>
          <DeliveredBenefits />
          <LastAttentions />
        </Box>
      </Grid>
    </Grid>
  </Box>
)

export default Home
