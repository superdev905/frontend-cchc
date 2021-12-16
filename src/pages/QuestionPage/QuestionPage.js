import { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { HeadingWithButton } from '../../components/Shared'
import { EmployeeQuestionDetails } from '../../components/WebConsult/Employee'
import questionEmployeeActions from '../../state/actions/questionEmployee'

const QuestionPage = () => {
  const dispatch = useDispatch()
  const { questionNumber } = useParams()
  const [loading, setLoading] = useState(false)
  const getQuestionDetails = () => {
    setLoading(true)
    dispatch(questionEmployeeActions.getQuestionDetails(questionNumber)).then(
      () => {
        setLoading(false)
      }
    )
  }
  useEffect(() => {
    getQuestionDetails()
  }, [questionNumber])
  return (
    <Box>
      <HeadingWithButton
        title={`Detalle de pregunta N° ${questionNumber}`}
        loading={loading}
      />
      <EmployeeQuestionDetails loading={loading} />
    </Box>
  )
}

export default QuestionPage
