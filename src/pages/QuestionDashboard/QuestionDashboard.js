import { Box, makeStyles, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Can from '../../components/Can'
import {
  QuestionAssignationTable,
  QuestionDistribution,
  QuestionLastCards,
  QuestionLastQuestions
} from '../../components/Question/Dashboard'
import { Button, PageHeading, Wrapper } from '../../components/UI'

const useStyles = makeStyles(() => ({
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 }
}))

const Question = () => {
  const history = useHistory()
  const classes = useStyles()
  return (
    <Box>
      <PageHeading>Consultas web</PageHeading>
      <Box mt={1} mb={2}>
        <QuestionLastCards />
      </Box>
      <Can
        availableTo={['ADMIN', 'JEFATURA']}
        yes={() => (
          <Box>
            <Box my={1}>
              <Wrapper>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography className={classes.title}>
                    Asignaciones
                  </Typography>
                  <Button
                    onClick={() => {
                      history.push(`/question/list`)
                    }}
                  >
                    Ver preguntas
                  </Button>
                </Box>
                <Box>
                  <QuestionAssignationTable />
                </Box>
              </Wrapper>
            </Box>
            <Box my={1}>
              <Wrapper>
                <Typography className={classes.title}>
                  Distribución de preguntas
                </Typography>
                <Box>
                  <QuestionDistribution />
                </Box>
              </Wrapper>
            </Box>
          </Box>
        )}
        no={() => null}
      />
      <Can
        availableTo={['SOCIAL_ASSISTANCE']}
        yes={() => (
          <Box>
            <Box my={1}>
              <Wrapper>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography className={classes.title}>
                    Ultimas preguntas asignadas
                  </Typography>
                  <Button
                    onClick={() => {
                      history.push(`/question/list`)
                    }}
                  >
                    Ver preguntas
                  </Button>
                </Box>
                <Box>
                  <QuestionLastQuestions />
                </Box>
              </Wrapper>
            </Box>
          </Box>
        )}
        no={() => null}
      />
    </Box>
  )
}

export default Question
