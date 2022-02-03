import { Box, Grid, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  cardRoot: ({ height }) => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(2),
    minHeight: height || 80,
    maxHeight: height || 130,
    padding: theme.spacing(4)
  }),
  date: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(5),
    textAlign: 'center',
    color: 'white'
  },
  center: {
    textAlign: 'center'
  }
}))

const VisitsPending = ({ height }) => {
  const classes = useStyles({ height })
  return (
    <Box className={classes.cardRoot} boxShadow={3} mt={2} mb={2}>
      <Grid container>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h6" className={classes.center}>
            Tipo de Visita / Tarea
          </Typography>
          <Typography variant="subtitle1" className={classes.center}>
            Obra
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" className={classes.date}>
            11-02-2022
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default VisitsPending
