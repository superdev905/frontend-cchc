import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Chip, makeStyles, Typography } from '@material-ui/core'
import AnswerForm from './AnswerForm'
import AnswerFilled from './Answer/Filled'
import AnswerEmpty from './Answer/Empty'
import questionActions from '../../state/actions/questions'

const useStyles = makeStyles(() => ({
  chip: {
    fontSize: 15,
    marginRight: 5
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold'
  }
}))

const Details = ({ question, handler }) => {
  const classes = useStyles()
  const { questionNumber } = useParams()
  const dispatch = useDispatch()

  const answerQuestion = (values) =>
    dispatch(questionActions.answerQuestion(questionNumber, values))

  return (
    <Box>
      <Typography className={classes.title}>
        Titulo: {question?.title}
      </Typography>
      <Typography>Consulta: {question?.question}</Typography>
      <Box my={2}>
        <Chip
          className={classes.chip}
          variant="oulined"
          label={`Estado: ${question?.status}`}
          size="medium"
        />
        <Chip
          className={classes.chip}
          variant="oulined"
          label={`Area: ${question?.areaName}`}
          size="medium"
        />
      </Box>
      <Box>
        {question.status === 'ASIGNADA' && (
          <AnswerForm
            submitFunction={answerQuestion}
            successFunction={handler}
            defaultAreaId={question.areaId}
          />
        )}
      </Box>
      <Box>
        {question.status === 'RESPONDIDA' && (
          <AnswerFilled answer={question.answer} />
        )}
      </Box>
      <Box>{question.status === 'INGRESADO' && <AnswerEmpty />}</Box>
    </Box>
  )
}

export default Details
