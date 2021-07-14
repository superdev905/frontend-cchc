import { Box, makeStyles, Typography } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import Button from '../UI/CustomButton'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    fontWeight: 'bold',
    marginBottom: '15px'
  },
  button: {
    textTransform: 'inherit'
  }
}))

const Forbidden = ({ ...props }) => {
  const classes = useStyles()

  const goBack = () => {
    props.history.goBack()
  }

  const goHome = () => {
    props.history.push('/')
  }
  return (
    <Box className={classes.root}>
      <Box>
        <Typography align="center" variant="h5" className={classes.message}>
          No puedes ver esta página
        </Typography>
        <Typography align="center">
          No tienes permisos suficientes acceder a esta página.
        </Typography>
        <Box display="flex" justifyContent="center">
          <Button onClick={goBack}> Volver</Button>
          <Button onClick={goHome} className={classes.button}>
            Ir a home
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default withRouter(Forbidden)
