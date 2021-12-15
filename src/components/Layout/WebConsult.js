import { useEffect } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Box, makeStyles, Typography } from '@material-ui/core'
import { Button } from '../UI'
import generateColor from '../../utils/generateColor'
import questionEmployeeActions from '../../state/actions/questionEmployee'

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
  const dispatch = useDispatch()
  const history = useHistory()
  const { employeeId, employee } = useSelector(
    (state) => state.questionEmployee
  )

  useEffect(() => {
    dispatch(questionEmployeeActions.getEmployeeDetails(employeeId))
  }, [employeeId])

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
              {`${employee?.names} ${employee?.paternal_surname}`.toUpperCase()}
            </Typography>
            <Typography>{`Rut: ${employee?.run}`}</Typography>
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
