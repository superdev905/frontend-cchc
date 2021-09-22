import { Box, Grid } from '@material-ui/core'
import ApprovedCard from './Card'

const Statistics = () => (
  <Box p={2}>
    <Grid container spacing={2}>
      <ApprovedCard label="Monto total" number={1000} />
      <ApprovedCard label="Beneficios" number={10} />
    </Grid>
  </Box>
)

export default Statistics
