import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import QuestionActions from '../../state/actions/questions'
import {
  Button,
  EmptyState,
  InputLabel,
  LabeledRow,
  Text,
  Wrapper
} from '../../components/UI'
import { HeadingWithButton } from '../../components/Shared'
import {
  QuestionAssignModal,
  QuestionDetails,
  QuestionLoader
} from '../../components/Question'
import { formatDate, formatHours } from '../../formatters'
import { UserCard } from '../../components/Users'
import Can from '../../components/Can'
import { useToggle } from '../../hooks'

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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  }
}))

const Question = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { questionNumber } = useParams()
  const [loading, setLoading] = useState(false)
  const { question } = useSelector((state) => state.questions)
  const { open: openAssign, toggleOpen: toggleOpenAssign } = useToggle()

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
          <HeadingWithButton
            title={`Pregunta N ${questionNumber}`}
            loading={loading}
            timeAgo={`el ${formatDate(question?.createdDate)} - ${formatHours(
              question?.createdDate
            )}`}
          />
        </Box>
        <Box>
          <Can
            availableTo={['ADMIN', 'JEFATURA']}
            yes={() => (
              <Button
                disabled={
                  question?.status === 'ASIGNADA' ||
                  question?.status === 'RESPONDIDA'
                }
                onClick={toggleOpenAssign}
              >
                Asignar
              </Button>
            )}
            no={() => null}
          />
        </Box>
      </Box>
      {openAssign && (
        <QuestionAssignModal open={openAssign} onClose={toggleOpenAssign} />
      )}

      <Box px={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={7}>
            {loading ? (
              <>
                <QuestionLoader />
              </>
            ) : (
              <>
                {question && (
                  <QuestionDetails question={question} handler={fetchData} />
                )}
              </>
            )}
          </Grid>
          <Grid item xs={12} lg={5}>
            <Box className={classes.assignationContent} p={2}>
              <Box>
                <Typography className={classes.title}>
                  Detalles de trabajador
                </Typography>
                <Box mt={1}>
                  <LabeledRow label="Rut:">
                    <Text loading={loading}>{question?.employee?.run}</Text>
                  </LabeledRow>
                  <LabeledRow label="Nombres:">
                    <Text loading={loading}>{question?.employee?.names}</Text>
                  </LabeledRow>
                  <LabeledRow label="Apelidos:">
                    <Text loading={loading}>
                      {`${question?.employee?.paternalSurname} ${question?.employee?.maternalSurname}`}
                    </Text>
                  </LabeledRow>
                  <LabeledRow label="Sexo:">
                    <Text loading={loading}>{question?.employee?.gender}</Text>
                  </LabeledRow>
                </Box>
              </Box>
              <Box mt={2}>
                <Typography className={classes.title}>
                  Detalles de asignación
                </Typography>
                <Box>
                  <>
                    {!question?.assignation ? (
                      <EmptyState
                        bgWhite
                        message="Esta pregunta no fue asignada"
                      />
                    ) : (
                      <>
                        <LabeledRow label="Fecha:">
                          <Text loading={loading}>
                            {formatDate(question?.assignation?.date)}
                          </Text>
                        </LabeledRow>
                        {question?.assignation?.assignedUser && (
                          <Box mt={2}>
                            <InputLabel>Assistente</InputLabel>
                            <UserCard
                              user={question?.assignation?.assignedUser}
                            />
                          </Box>
                        )}
                        {question?.assignation?.boss && (
                          <Box mt={2}>
                            <InputLabel>Jefatura</InputLabel>
                            <UserCard user={question?.assignation?.boss} />
                          </Box>
                        )}
                      </>
                    )}
                  </>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  )
}

export default Question
