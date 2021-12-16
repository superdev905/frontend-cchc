import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import QuestionActions from '../../state/actions/questions'
import { Button, Wrapper } from '../../components/UI'
import Answer from '../../components/WebConsultBoss/Answer'
import { HeadingWithButton } from '../../components/Shared'
import { QuestionDetails, QuestionLoader } from '../../components/Question'
import { formatDate, formatHours } from '../../formatters'

const useStyles = makeStyles((theme) => ({
  head: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  },
  assignationContent: {
    backgroundColor: theme.palette.gray.gray100,
    borderRadius: theme.spacing(1)
  }
}))

const Question = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { questionNumber } = useParams()
  const [loading, setLoading] = useState(false)
  const { question } = useSelector((state) => state.questions)

  const fetchData = () => {
    setLoading(true)
    dispatch(QuestionActions.getQuestionDetails(questionNumber)).then(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Wrapper>
      <Box className={classes.head}>
        <Box display="flex">
          <Box>
            <HeadingWithButton
              title={`Pregunta N ${questionNumber}`}
              loading={loading}
              timeAgo={`el ${formatDate(question?.createdDate)} - ${formatHours(
                question?.createdDate
              )}`}
            />
            <Answer />
          </Box>
        </Box>
        <Box>
          <Button>Asignar</Button>
        </Box>
      </Box>
      <Box px={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={7}>
            {loading ? (
              <>
                <QuestionLoader />
              </>
            ) : (
              <QuestionDetails question={question} />
            )}
          </Grid>
          <Grid item xs={12} lg={5}>
            <Box className={classes.assignationContent} p={2}>
              <Box>
                <Typography>Detalles de trabajador</Typography>
              </Box>
              <Box>
                <Typography>Detalles de asignación</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  )
}

export default Question
