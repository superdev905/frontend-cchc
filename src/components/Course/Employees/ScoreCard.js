import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { formatDate } from '../../../formatters'

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid',
    borderRadius: 5
  },
  infoBox: {
    backgroundColor: theme.palette.gray.gray100
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  date: {
    marginBottom: 10,
    fontSize: 14
  }
}))

const ScoreCard = ({ score, avg }) => {
  const classes = useStyles()
  return (
    <Grid item xs={6} md={4}>
      <Box p={2} className={classes.root}>
        <Box className={classes.date}>{`Fecha: ${formatDate(new Date())}`}</Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box className={classes.infoBox} py={2}>
              <Typography align="center" className={classes.number}>
                {score}
              </Typography>
              <Typography align="center">Nota</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className={classes.infoBox} py={2}>
              <Typography align="center" className={classes.number}>
                {avg}
              </Typography>
              <Typography align="center">Promedio</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}

export default ScoreCard
