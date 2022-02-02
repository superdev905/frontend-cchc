import { Box, Grid, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  cardRoot: ({ height }) => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(2),
    minHeight: height || 80,
    maxHeight: height || 130,
    padding: theme.spacing(2)
  }),
  name: {
    textAlign: 'center'
  },
  date: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(5)
  }
}))

const Atentions = ({ height }) => {
  const classes = useStyles({ height })

  return (
    <Box className={classes.cardRoot}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm spacing={2} className={classes.name}>
          <Typography variant="h6">Nombre Trabajador</Typography>
          <Typography variant="subtitle1">Rut</Typography>
        </Grid>
        <Grid container justifyContent="space-around" className={classes.name}>
          <Grid item xs={4}>
            <Typography variant="body1" className={classes.date}>
              15-02-2022
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">Area</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">Estado</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Atentions
