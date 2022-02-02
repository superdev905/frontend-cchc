import { Box, Grid, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  cardRoot: ({ height }) => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(2),
    minHeight: height || 80,
    maxHeight: height || 130,
    padding: theme.spacing(4)
  }),
  name: {
    textAlign: 'center'
  }
}))

const BenefitsDelivery = ({ height }) => {
  const classes = useStyles({ height })

  return (
    <Box className={classes.cardRoot}>
      <Grid container spacing={4}>
        <Grid item xs={12} className={classes.name}>
          <Typography variant="h6">Nombre de Beneficio</Typography>
        </Grid>
        <Grid container justifyContent="space-evenly">
          <Grid item>
            <Typography variant="body2">Estado</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">Fecha de Inicio</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">Fecha de Fin</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BenefitsDelivery
