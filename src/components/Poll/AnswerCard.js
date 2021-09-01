import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Box, Chip, makeStyles, Typography } from '@material-ui/core'
import QuestionOption from './Question/QuestionOption'
import { TextArea } from '../UI'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F6F6F6',
    borderRadius: 5,
    marginBottom: 20
  },
  buttons: {
    '& button': {
      margin: 0,
      padding: 5
    }
  },
  centerVertical: {
    display: 'flex',
    alignItems: 'center'
  },
  order: {
    width: 35,
    height: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 5,
    color: theme.palette.common.white,
    marginRight: 10
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  questionType: {
    margin: '10px'
  }
}))

const AnswerCard = ({
  //  onClick
  index,
  answer,
  onAnswer,
  textResponse,
  simpleResponse,
  selectedOptions
}) => {
  const classes = useStyles()
  const { poll, question } = useSelector((state) => state.poll)

  return (
    <Box className={classes.root}>
      <Box p={1}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="15px"
        >
          <Box className={classes.centerVertical}>
            <Box className={classes.order}>{index}</Box>
            <Typography className={classes.question}>{poll.id}</Typography>
          </Box>
        </Box>
        {!answer && (
          <Box className={classes.questionType}>
            Tipo de respuesta{' '}
            <Chip color="primary" label={question.type_name} />
          </Box>
        )}
        <Box>
          {question.type === 'SIMPLE_SELECTION' && (
            <>
              <QuestionOption
                selected={simpleResponse === 'Si'}
                value="Si"
                disabled={!answer}
                onAnswer={(e) => {
                  onAnswer(e, question)
                }}
              />
              <QuestionOption
                selected={simpleResponse === 'No'}
                value="No"
                disabled={!answer}
                onAnswer={(e) => {
                  onAnswer(e, question)
                }}
              />
            </>
          )}
          {question.type === 'MULTIPLE_SELECTION' && (
            <>
              {question.options.map((item) => (
                <QuestionOption
                  value={item.option_name}
                  disabled={!answer}
                  questionType={'MULTIPLE_SELECTION'}
                  editable={answer}
                  selected={selectedOptions.includes(item.id)}
                  onAnswer={(e) => {
                    onAnswer(e, question, item)
                  }}
                />
              ))}
            </>
          )}
          {question.type === 'TEXT' && (
            <>
              <TextArea
                value={textResponse}
                disabled={!answer}
                onChange={(e) => onAnswer(e, question)}
              />
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}

AnswerCard.defaultProps = {
  question: {
    type: 'MULTIPLE_SELECTION'
  },
  editable: true,
  answer: false
}

AnswerCard.propTypes = {
  question: PropTypes.object
}

export default AnswerCard
