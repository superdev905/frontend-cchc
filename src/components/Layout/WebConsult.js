import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import { Avatar, Box, makeStyles, Typography } from '@material-ui/core'
import { Button } from '../UI'
import generateColor from '../../utils/generateColor'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    minHeight: '100%'
  },
  wrapper: {
    padding: theme.spacing(1),
    [theme.breakpoints.up('lg')]: {
      padding: `20px ${125}px `
    }
  },
  heading: {
    borderBottom: `1px solid ${theme.palette.gray.gray700}`
  }
}))

const WebConsult = ({ children }) => {
  const classes = useStyles()

  const history = useHistory()
  return (
    <Box className={classes.root}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className={clsx(classes.wrapper, classes.heading)}
      >
        <Box display="flex" alignItems="center">
          <Avatar
            style={{
              width: 50,
              height: 50,
              backgroundColor: generateColor(),
              marginRight: 10
            }}
          >
            J
          </Avatar>
          <Box>
            <Typography style={{ fontSize: 18, fontWeight: 'bold' }}>
              Jhon Doe
            </Typography>
            <Typography>Rut: 3737.38734y</Typography>
          </Box>
        </Box>
        <Box>
          <Button>Nueva pregunta</Button>
          <Button
            onClick={() => {
              history.push(`/consultas-web`)
            }}
          >
            Salir
          </Button>
        </Box>
      </Box>
      <Box className={classes.wrapper}>{children}</Box>
    </Box>
  )
}

export default WebConsult
