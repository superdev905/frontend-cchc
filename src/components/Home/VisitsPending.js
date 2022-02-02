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
    textAlign: 'center'
  },
  center: {
    textAlign: 'center'
  }
}))

const VisitsPending = ({ height }) => {
  const classes = useStyles({ height })
  return (
    <Box mt={1} mb={2}>
      <Box className={classes.cardRoot}>
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12}>
            <Typography gutterBottom variant="h6" className={classes.center}>
              Tipo de Visita / Tarea
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-around">
          <Grid item xs={8}>
            <Typography variant="body1" className={classes.date}>
              11-02-2022
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">Obra</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default VisitsPending