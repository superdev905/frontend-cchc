import { Box, Grid, Typography } from '@material-ui/core'

const Card = ({ contact }) => (
  <Grid item xs={12} md={6}>
    <Box p={2}>
      <Typography>{contact.fullName}</Typography>
      <Typography>{contact.charge}</Typography>
      <Typography>{contact.phone}</Typography>
    </Box>
  </Grid>
)

export default Card
