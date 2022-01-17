import { Box, Grid, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    backgroundColor: theme.palette.common.white,
    textAlign: 'center',
    borderRadius: theme.spacing(1)
  },
  data: {
    fontSize: 38,
    fontWeight: 'bold'
  },
  label: {
    opacity: 0.8
  }
}))

const SimpleCard = ({ data, label }) => {
  const classes = useStyles()

  return (
    <Box p={2} className={classes.cardRoot}>
      <Box display="flex" justifyContent="center" padding={0} margin={0}>
        <Typography className={classes.data}>{data}</Typography>
      </Box>
      <Typography className={classes.label}>{label}</Typography>
    </Box>
  )
}

const Cards = () => (
  <Grid container spacing={1}>
    <Grid item xs={6} md={4} lg={2}>
      <SimpleCard label="Visitas por Asignar" data="3" />
    </Grid>
  </Grid>
)

export default Cards
