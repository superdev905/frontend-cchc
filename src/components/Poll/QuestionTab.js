import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box } from '@material-ui/core'
import pollActions from '../../state/actions/poll'
import { useToggle } from '../../hooks'
import { QuestionCard, AddQuestion, QuestionModal } from './Question'
import { EmptyState } from '../UI'

const QuestionTab = () => {
  const { open, toggleOpen } = useToggle()
  const { idPoll } = useParams()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { questionList, poll } = useSelector((state) => state.poll)

  const createQuestion = (values) =>
    dispatch(
      pollActions.createQuestions({
        ...values,
        created_by: user.id,
        poll_id: idPoll
      })
    )

  const getQuestions = () => {
    dispatch(pollActions.getQuestions({ poll_id: idPoll }))
  }
  useEffect(() => {
    getQuestions()
  }, [])

  return (
    <Box>
      {poll?.status === 'VIGENTE' && <AddQuestion onClick={toggleOpen} />}
      {questionList.length === 0 ? (
        <EmptyState message="Esta encuesta no tiene preguntas" />
      ) : (
        <>
          {questionList.map((item, index) => (
            <QuestionCard
              question={{
                ...item,
                type_name: item.question_type.display_name,
                type: item.question_type.key
              }}
              index={index + 1}
              textResponse=""
              selectedOptions={[]}
              simpleResponse=""
              successFunction={getQuestions}
            />
          ))}
        </>
      )}

      <QuestionModal
        open={open}
        onClose={toggleOpen}
        submitFunction={createQuestion}
        successMessage={'Pregunta creada'}
        successFunction={getQuestions}
      />
    </Box>
  )
}
QuestionTab.propTypes = {}

export default QuestionTab
