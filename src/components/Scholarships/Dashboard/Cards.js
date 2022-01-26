import { Box, Grid } from '@material-ui/core'
import { SimpleCard, Wrapper } from '../../UI'

const Cards = ({ data }) => (
  <Box>
    <Grid container spacing={1}>
      {data.map((item) => (
        <Grid key={`card-${item.key}`} item xs={4}>
          <Wrapper>
            <SimpleCard data={item.value} label={item.name} />
          </Wrapper>
        </Grid>
      ))}
    </Grid>
  </Box>
)

export default Cards
