import { Box, Typography, makeStyles, Grid } from '@material-ui/core'
import VisitsPending from '../../components/Home/VisitsPending'
import BenefitsDelivery from '../../components/Home/BenefitsDelivery'
import Atentions from '../../components/Home/Atentions'

const useStyles = makeStyles((theme) => ({
  tittle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 600,
    color: '#6A707E',
    textTransform: 'uppercase',
    [theme.breakpoints.up('lg')]: {
      fontSize: 22
    }
  }
}))

const Home = () => {
  const classes = useStyles()

  return (
    <Box display="flex">
      <Grid container fluid justifyContent="center">
        <Box>
          <Typography className={classes.tittle}>Visitas Pendientes</Typography>
          <VisitsPending />
        </Box>
      </Grid>
      <Grid container fluid justifyContent="center">
        <Box>
          <Box>
            <Typography className={classes.tittle}>
              Beneficios Entregados
            </Typography>
            <BenefitsDelivery />
          </Box>
          <Box>
            <Typography className={classes.tittle}>Atenciones</Typography>
            <Atentions />
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}

export default Home
