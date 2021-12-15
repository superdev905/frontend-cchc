import { useEffect } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Box, makeStyles, Typography } from '@material-ui/core'
import { COLORS } from '../../utils/generateColor'
import questionEmployeeActions from '../../state/actions/questionEmployee'
import { Button } from '../UI'
import { useToggle } from '../../hooks'
import { EmployeeQuestionModal } from '../WebConsult/Employee'

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
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: COLORS[2],
    marginRight: 10
  }
}))

const WebConsult = ({ children }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { employeeId, employee } = useSelector(
    (state) => state.questionEmployee
  )
  const { open, toggleOpen } = useToggle()

  useEffect(() => {
    dispatch(questionEmployeeActions.getEmployeeDetails(employeeId))
  }, [employeeId])

  const handleLogOut = () => {
    dispatch(questionEmployeeActions.logOutEmployee())
  }

  return (
    <Box className={classes.root}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className={clsx(classes.wrapper, classes.heading)}
      >
        <Box display="flex" alignItems="center">
          <Avatar className={classes.avatar}>
            {employee?.names && employee.names.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography style={{ fontSize: 18, fontWeight: 'bold' }}>
              {`${employee?.names} ${employee?.paternal_surname}`.toUpperCase()}
            </Typography>
            <Typography>{`Rut: ${employee?.run}`}</Typography>
          </Box>
        </Box>
        <Box>
          <Button onClick={toggleOpen}>Nueva pregunta</Button>
          <Button
            onClick={() => {
              handleLogOut()
              history.push(`/consultas-web`)
            }}
            variant="outlined"
          >
            Salir
          </Button>
        </Box>
      </Box>
      <Box className={classes.wrapper}>{children}</Box>
      {open && <EmployeeQuestionModal open={open} onClose={toggleOpen} />}
    </Box>
  )
}

export default WebConsult
