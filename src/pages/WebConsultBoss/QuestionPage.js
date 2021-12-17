import { Box } from '@material-ui/core'
import { PageHeading, Wrapper } from '../../components/UI'
import Question from '../../components/WebConsultBoss/Question'
import QuestionList from '../../components/WebConsultBoss/QuestionList'

const QuestionPage = () => (
  <Box>
    <Wrapper>
      <PageHeading>Preguntas</PageHeading>
      <Box>
        <Question />
      </Box>
    </Wrapper>
    <Wrapper>
      <Box>
        <QuestionList />
      </Box>
    </Wrapper>
  </Box>
)

export default QuestionPage
