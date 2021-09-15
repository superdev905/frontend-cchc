import { useEffect, useState } from 'react'
import { Box, makeStyles, Menu, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import poll from '../../state/actions/poll'
import PollCard from '../Polls/Card'
import { Button } from '../UI'
import { useToggle } from '../../hooks'
import ModulePollsDialog from '../Polls/ModulePollsDialog'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: window.innerWidth,
    maxHeight: '500px',
    [theme.breakpoints.up('lg')]: {
      width: '700px'
    }
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  }
}))

const Announcements = ({ open, anchorEl, handleClose }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const { module } = useSelector((state) => state.ui)
  const { user } = useSelector((state) => state.auth)
  const { modulePollList: polls } = useSelector((state) => state.poll)
  const { open: openDetail, toggleOpen: toggleOpenDetail } = useToggle()

  const getPolls = () => {
    setLoading(true)
    dispatch(poll.getModulePolls({ module, user_id: user.id }))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (module && open && user) {
      getPolls()
    }
  }, [module, open, user])

  useEffect(() => {
    if (open && polls.length === 0) {
      enqueueSnackbar('No hay encuestas por responder', {
        variant: 'info'
      })
    }
  }, [open, polls.length])

  return (
    <div>
      <Menu
        open={open}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Box p={2} className={classes.paper}>
          <Typography className={classes.title}>Encuestas</Typography>
          <Box>
            {loading ? (
              <PollCard loader />
            ) : (
              <>
                {polls.map((item) => (
                  <PollCard
                    key={`item-${item.id}`}
                    showAnswers={false}
                    poll={item}
                    onClick={toggleOpenDetail}
                  />
                ))}
              </>
            )}
          </Box>
          <Box marginTop="15px" textAlign="center">
            <Button> Ver todos</Button>
          </Box>
        </Box>
      </Menu>
      <ModulePollsDialog
        open={openDetail}
        onClose={toggleOpenDetail}
        module={module}
      />
    </div>
  )
}
export default Announcements
