import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Wrapper } from '../UI'

const useStyles = makeStyles((theme) => ({
  cardRoot: ({ height }) => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(2),
    minHeight: height || 80,
    padding: theme.spacing(4)
  }),
  name: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },
  status: {
    textAlign: 'center',
    fontSize: 10
  },
  date: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(5),
    textAlign: 'center',
    fontSize: 10,
    color: 'white'
  }
}))

const BenefitsDelivery = ({ height }) => {
  const classes = useStyles({ height })

  return (
    <Wrapper>
      <Typography>Ultimos beneficios entregados</Typography>
      <Box className={classes.cardRoot} boxShadow={3} mt={2} mb={2} ml={2}>
        <Grid container fluid spacing={3}>
          <Grid item xs={12}>
            <Typography className={classes.name}>
              Nombre de Beneficio
            </Typography>
            <Box mt={1} mb={1}>
              <Typography className={classes.status}>Estado</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container fluid spacing={1}>
          <Grid item xs={6}>
            <Box>
              <Typography className={classes.date} noWrap>
                02-02-2022
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Typography className={classes.date} noWrap>
                04-12-2024
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  )
}

export default BenefitsDelivery
