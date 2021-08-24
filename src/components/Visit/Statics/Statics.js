import { Grid, Typography } from '@material-ui/core'
import { Wrapper } from '../../UI'

const Statics = () => {
  return (
    <Wrapper>
      <Typography>Estadisticas de la visita</Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Wrapper>
            <Box>
              <Typography></Typography>
            </Box>
          </Wrapper>
        </Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
    </Wrapper>
  )
}

export default Statics
