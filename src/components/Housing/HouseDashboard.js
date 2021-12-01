import { Box, Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const HouseDashboard = () => (
  <Box>
    <Grid container spacing={2} alignItems="center">
      <Grid item md={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h2" alingItem="center">
              2
            </Typography>
            <Typography variant="body2">Convenios</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h2">6</Typography>
            <Typography variant="body2">Trabajadores</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h2">20</Typography>
            <Typography variant="body2">Propietarios</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
)

export default HouseDashboard
