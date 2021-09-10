import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import {
  CalendarToday as CalendarIcon,
  ArrowBack as BackIcon
} from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'
import pollActions from '../../state/actions/poll'
import PollDetails from '../../components/Polls/PollDetails'
import { PageHeading, Button, Wrapper } from '../../components/UI'
import { PollTabs } from '../../components/Poll'
import { useToggle, useSuccess } from '../../hooks'
import { ConfirmDelete } from '../../components/Shared'
import PollCreate from '../../components/Polls/PollCreate'

const useStyles = makeStyles((theme) => ({
  head: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  },
  title: {
    color: theme.palette.common.black
  },
  createdTime: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    color: theme.palette.gray.gray600,
    marginRight: 5
  }
}))

const Poll = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()
  const { idPoll } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const { poll } = useSelector((state) => state.poll)
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { success, changeSuccess } = useSuccess()

  const fetchData = () => {
    setLoading(true)
    dispatch(pollActions.getPollDetails(idPoll)).then(() => {
      setLoading(false)
    })
  }

  const goBack = () => {
    history.goBack()
  }

  useEffect(() => {
    fetchData()
  }, [])

  const updatePoll = (values) =>
    dispatch(
      pollActions.updatePoll(idPoll, {
        state: poll.state,
        created_by: poll.created_by,
        author: poll.author,
        ...values
      })
    )

  const onDelete = (id) => {
    dispatch(pollActions.deletePoll(id))
      .then(() => {
        changeSuccess(true, () => {
          toggleOpenDelete()
          enqueueSnackbar('Encuesta eliminada', { variant: 'success' })
          history.push('/polls')
        })
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  return (
    <Wrapper p={1}>
      <Box className={classes.head}>
        <Box display="flex">
          <Box>
            <IconButton onClick={goBack}>
              <BackIcon />
            </IconButton>
          </Box>
          <Box>
            <PageHeading className={classes.title}>
              {loading ? <Skeleton width="80%" /> : poll?.title}{' '}
            </PageHeading>
            <Typography className={classes.createdTime}>
              <CalendarIcon className={classes.icon} />
              {!loading && `Creado ${poll?.created_delta}`}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button onClick={toggleOpenEdit}>Editar</Button>
          <Button danger onClick={toggleOpenDelete}>
            Eliminar
          </Button>
        </Box>
      </Box>
      <PollDetails fetching={loading} />
      <PollTabs />

      {poll && openEdit && (
        <PollCreate
          type="UPDATE"
          open={openEdit}
          successMessage="Encuesta actualizada"
          onClose={toggleOpenEdit}
          data={poll}
          submitFunction={updatePoll}
          successFunction={fetchData}
        />
      )}

      {poll && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          success={success}
          message={
            <span>
              ¿Estás seguro de eliminar esta encuesta:{' '}
              <strong>{poll.title}</strong>?
            </span>
          }
          onConfirm={() => onDelete(poll.id)}
        />
      )}
    </Wrapper>
  )
}

export default Poll
