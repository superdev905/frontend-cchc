import { Avatar, Grid, Typography } from '@material-ui/core'

const AnswerRow = () => (
  <Box>
    <Grid container spacing={1}>
      <Grid item xs={12} md={2}>
        <Avatar>A</Avatar>
      </Grid>
      <Grid item xs={12} md={2}>
        <Typography>Meredith Smith</Typography>
        <Typography>Hace un minuto</Typography>
      </Grid>
      <Grid item xs={12} md={2}></Grid>
      <Grid item xs={12} md={2}></Grid>
    </Grid>
  </Box>
)

AnswerRow.propTypes = {}

export default AnswerRow
