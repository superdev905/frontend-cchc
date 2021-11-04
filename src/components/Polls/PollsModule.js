import { Box, makeStyles, Typography } from '@material-ui/core'
import { memo, useEffect, useState } from 'react'
import { FiAlertCircle as WarningIcon } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import pollActions from '../../state/actions/poll'
import { useToggle } from '../../hooks'
import { Button, StatusChip } from '../UI'
import ModulePollsDialog from './Answer/Dialog'

const useStyles = makeStyles((theme) => ({
  warningPaper: {
    borderRadius: theme.spacing(1),
    border: `2px solid ${theme.palette.primary.main}`
  },
  text: {
    fontSize: 17,
    marginLeft: theme.spacing(1)
  },
  title: {
    fontSize: 17,
    marginBottom: theme.spacing(1),
    fontWeight: 'bold'
  },
  warningIcon: {
    color: theme.palette.primary.main,
    fontSize: 35
  }
}))

const ModuleDot = () => {
  const classes = useStyles()
  const { open, toggleOpen } = useToggle()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { module } = useSelector((state) => state.ui)
  const { user } = useSelector((state) => state.auth)
  const { modulePollList, moduleResponse } = useSelector((state) => state.poll)

  const fetchModulePolls = () => {
    setLoading(true)
    dispatch(pollActions.getModulePolls({ module, user_id: user.id })).then(
      () => {
        setLoading(false)
      }
    )
  }

  const isPollsAnswered = (list) =>
    list.filter((item) => !item.isAnswered).length === 0

  useEffect(() => {
    const pollStatus = modulePollList.map((item) => ({
      id: item.id,
      isAnswered: false
    }))
    dispatch(
      pollActions.updateModuleStatus({
        isRequired: modulePollList.length > 0,
        isPollAnswered: false,
        pollStatus
      })
    )
  }, [modulePollList])

  useEffect(() => {
    fetchModulePolls()
  }, [])

  return (
    <Box>
      {!loading && modulePollList.length > 0 && (
        <Box mt={3}>
          <Typography className={classes.title}>Encuesta</Typography>
          <Box
            className={classes.warningPaper}
            p={2}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box display={'flex'} alignItems={'center'}>
              <WarningIcon className={classes.warningIcon} />
              <Typography className={classes.text}>
                Tienes encuestas por responder
              </Typography>
            </Box>
            {isPollsAnswered(moduleResponse.pollStatus) ? (
              <StatusChip success label="Respuesta registrada" />
            ) : (
              <Button size={'small'} onClick={toggleOpen}>
                Responser
              </Button>
            )}
          </Box>
          {open && (
            <ModulePollsDialog
              open={open}
              onClose={toggleOpen}
              module={module}
              polls={modulePollList}
            />
          )}
        </Box>
      )}
    </Box>
  )
}
export default memo(ModuleDot)
