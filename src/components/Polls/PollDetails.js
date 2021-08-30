import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Paper,
  makeStyles,
  Chip
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { useToggle } from '../../hooks'
import { LabeledRow, StatusChip, Text, EmptyState } from '../UI'
import { formatDate, formatText } from '../../formatters'
import QuestionCreate from './QuestionCreate'
import pollActions from '../../state/actions/poll'

const useStyles = makeStyles(() => ({
  iconAdd: {
    fontSize: 50
  },
  footer: {
    textAlign: 'center'
  }
}))

const PollDetails = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { poll } = useSelector((state) => state.poll)
  const { open: openQuestion, toggleOpen: toggleOpenQuestion } = useToggle()
  const [loading, setLoading] = useState(false)
  const [question, setQuestion] = useState(false)

  const createQuestion = (values) => {
    const data = { ...values }
    return dispatch(pollActions.createQuestions(data))
  }

  const fetchQuestions = (id) => {
    setLoading(true)
    dispatch(pollActions.getQuestions({ poll_id: id }))
      .then((list) => {
        setLoading(false)
        setQuestion(list)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  return (
    <Box p={2}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <LabeledRow label="Fecha de inicio:">
              <Text loading={loading}>
                {poll ? formatDate(poll.start_date) : ''}
              </Text>
            </LabeledRow>
            <LabeledRow label="Fecha de fin:">
              <Text loading={loading}>
                {poll ? formatDate(poll.end_date) : ''}
              </Text>
            </LabeledRow>
            <LabeledRow label="Creado por:">
              <Text loading={loading}>{poll?.created_by}</Text>
            </LabeledRow>
          </Grid>
          <Grid item xs={12} md={6}>
            <LabeledRow label="Estado:">
              <Text loaderWidth="80%" loading={loading}>
                {poll && (
                  <StatusChip
                    success={poll.status === 'VIGENTE'}
                    error={poll.status === 'NO_VIGENTE'}
                    label={formatText.capitalizeString(poll.status)}
                  />
                )}
              </Text>
            </LabeledRow>
            <LabeledRow label="Módulos:">
              <Text loaderWidth="80%" loading={fetching}>
                {poll &&
                  poll.modules.map((item, index) => (
                    <Chip
                      style={{ marginRight: '5px' }}
                      color="primary"
                      key={`module-chip-${item.id}-${index}`}
                      label={formatText.capitalizeString(item.module_name)}
                    />
                  ))}
              </Text>
            </LabeledRow>
          </Grid>
        </Grid>
      </Box>

      {question.length === 0 && (
        <EmptyState message="Esta encuesta no tiene preguntas" />
      )}

      <Paper elevation={0} className={classes.footer}>
        <Box p={2}>
          <IconButton onClick={toggleOpenQuestion}>
            <AddCircleIcon color="primary" className={classes.iconAdd} />
          </IconButton>
          <Typography>Nueva Pregunta</Typography>
        </Box>

        <QuestionCreate
          open={openQuestion}
          onClose={toggleOpenQuestion}
          submitFunction={createQuestion}
          successMessage="Pregunta agregada correctamente"

          // successFunction={redirectToPoll}
        />
      </Paper>
    </Box>
  )
}

export default PollDetails
