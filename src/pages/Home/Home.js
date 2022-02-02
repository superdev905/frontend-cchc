import { Box, Typography, makeStyles } from '@material-ui/core'
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
    <Box display="flex" justifyContent="space-evenly" mt={2}>
      <Box>
        <Typography className={classes.tittle}>Visitas Pendientes</Typography>
        <VisitsPending />
      </Box>
      <Box>
        <Typography className={classes.tittle}>
          Beneficios Entregados
        </Typography>
        <BenefitsDelivery />
        <Typography className={classes.tittle}>Atenciones</Typography>
        <Atentions />
      </Box>
    </Box>
  )
}

export default Home
