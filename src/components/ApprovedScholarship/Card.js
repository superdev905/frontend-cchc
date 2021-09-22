import { Box, Grid, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.gray.gray100,
    borderRadius: 8
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold'
  }
}))

const Card = ({ label, number }) => {
  const classes = useStyles()

  return (
    <Grid item xs={6} lg={2}>
      <Box p={2} className={classes.root}>
        <Typography className={classes.number} align="center">
          {number}
        </Typography>
        <Typography align="center">{label}</Typography>
      </Box>
    </Grid>
  )
}

export default Card
