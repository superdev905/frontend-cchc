import { Box, makeStyles, Typography } from '@material-ui/core'
import Button from './CustomButton'
import SuccessImage from '../../assets/media/success.png'

const useStyles = makeStyles(() => ({
  img: {
    width: 120,
    height: 120
  },
  message: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10
  }
}))

const Success = ({ event, message }) => {
  const classes = useStyles()
  return (
    <Box>
      <Box mb={2} display={'flex'} justifyContent={'center'}>
        <img className={classes.img} src={SuccessImage}></img>
      </Box>
      <Box textAlign={'center'}>
        <Typography className={classes.message}>{message}</Typography>
        {event && <Button onClick={event}>Aceptar</Button>}
      </Box>
    </Box>
  )
}

Success.propTypes = {}

export default Success
