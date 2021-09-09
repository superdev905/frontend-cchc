import { useDispatch } from 'react-redux'
import { Box, makeStyles } from '@material-ui/core'
import { useEffect } from 'react'
import { useToggle } from '../../hooks'
import ModulePollsDialog from './ModulePollsDialog'
import pollActions from '../../state/actions/poll'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 32,
    width: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: '50%',
    backgroundColor: theme.palette.error.main
  }
}))

const ModuleDot = ({ module }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { open, toggleOpen } = useToggle()

  useEffect(() => {
    dispatch(pollActions.getModulePolls({ module }))
  }, [module])

  return (
    <Box display="inline">
      <Box className={classes.root} onClick={toggleOpen}>
        <Box className={classes.dot}></Box>
      </Box>
      <ModulePollsDialog open={open} onClose={toggleOpen} module={module} />
    </Box>
  )
}

export default ModuleDot
