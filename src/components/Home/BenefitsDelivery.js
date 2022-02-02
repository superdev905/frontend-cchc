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
  },
  date: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(5),
    color: 'white'
  }
}))

const BenefitsDelivery = ({ height }) => {
  const classes = useStyles({ height })

  return (
    <Box className={classes.cardRoot} boxShadow={3} mt={2} mb={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.name}>
          <Typography variant="h6">Nombre de Beneficio</Typography>
        </Grid>
        <Grid container justifyContent="space-around" className={classes.name}>
          <Grid item xs={4}>
            <Typography variant="body2">Estado</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" className={classes.date}>
              02-02-2022
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" className={classes.date}>
              04-12-2024
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BenefitsDelivery
