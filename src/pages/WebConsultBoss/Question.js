import { Box } from '@material-ui/core'
import { PageHeading, Wrapper } from '../../components/UI'
import Questions from '../../components/WebConsultBoss/Question'
import QuestionList from '../../components/WebConsultBoss/QuestionList'

const Question = () => (
  <Box>
    <Wrapper>
      <PageHeading>Preguntas</PageHeading>
      <Box>
        <Questions />
      </Box>
      <Box>
        <QuestionList />
      </Box>
    </Wrapper>
  </Box>
)

export default Question
