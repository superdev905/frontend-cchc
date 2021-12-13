import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Box,
  Button,
  IconButton,
  Typography,
  makeStyles
} from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import QuestionActions from '../../state/actions/questions'
import { PageHeading, Wrapper } from '../../components/UI'

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

const Question = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()
  const { idQuestion } = useParams()
  const [loading, setLoading] = useState(false)

  const goBack = () => {
    history.goBack()
  }

  const fetchData = () => {
    setLoading(true)
    dispatch(QuestionActions.getQuestionDetails(idQuestion)).then(() => {
      setLoading(false)
    })
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
            <PageHeading className={classes.title}>Pregunta N</PageHeading>
            <Typography className={classes.createdTime}>
              <CalendarIcon className={classes.icon} />
              {!loading && `Creado ${Question?.creadted_delta}`}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button>Asignar</Button>
        </Box>
      </Box>
    </Wrapper>
  )
}

export default Question
