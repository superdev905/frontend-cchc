import { Box } from '@material-ui/core'
import { useSelector } from 'react-redux'
import QuestionCard from '../QuestionCard'
import Answer from './Answer'

const Details = ({ loading }) => {
  const { question } = useSelector((state) => state.questionEmployee)
  return (
    <Box>
      {!loading && question && (
        <QuestionCard asCard={false} question={question}>
          {question?.answer && <Answer answer={question.answer} />}
        </QuestionCard>
      )}
    </Box>
  )
}

export default Details
