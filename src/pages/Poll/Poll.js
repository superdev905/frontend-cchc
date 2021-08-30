import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
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
  const [loading, setLoading] = useState(false)
  const { poll } = useSelector((state) => state.poll)

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
          <Button>Editar</Button>
          <Button danger>Eliminar</Button>
        </Box>
      </Box>
      <PollDetails fetching={loading} />
      <PollTabs />
    </Wrapper>
  )
}

export default Poll
