import { Box, Grid, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  cardRoot: ({ height }) => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(2),
    minHeight: height || 80,
    padding: theme.spacing(2)
  }),
  name: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },
  run: {
    textAlign: 'center',
    fontSize: 10
  },
  date: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(5),
    textAlign: 'center',
    fontSize: 10,
    color: 'white'
  },
  status: {
    textAlign: 'center',
    fontSize: 10
  }
}))

const Atentions = ({ height }) => {
  const classes = useStyles({ height })

  return (
    <Box className={classes.cardRoot} boxShadow={3} mt={2} mb={2} ml={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm spacing={2}>
          <Typography className={classes.name}>Nombre Trabajador</Typography>
          <Box mt={1}>
            <Typography className={classes.run}>Rut</Typography>
          </Box>
        </Grid>
        <Grid container justifyContent="space-around">
          <Grid item xs={4}>
            <Typography className={classes.date} noWrap>
              15-02-2022
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.status}>Area</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.status}>Estado</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Atentions
