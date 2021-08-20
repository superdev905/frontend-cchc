import { Grid } from '@material-ui/core'

import PensionSituation from './PensionSituation'
import HousingSituation from './HousingSituation'
import { Wrapper } from '../UI'

const Situation = () => (
  <Wrapper>
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <PensionSituation />
      </Grid>
      <Grid item xs={12} md={6}>
        <HousingSituation />
      </Grid>
    </Grid>
  </Wrapper>
)

export default Situation
