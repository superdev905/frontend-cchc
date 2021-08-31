import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Chip } from '@material-ui/core'
import { LabeledRow, StatusChip, Text, EmptyState } from '../UI'
import { formatDate, formatText } from '../../formatters'
import pollActions from '../../state/actions/poll'

const PollDetails = ({ fetching }) => {
  const dispatch = useDispatch()
  const { poll } = useSelector((state) => state.poll)
  const [loading, setLoading] = useState(false)
  const [question, setQuestion] = useState(false)

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
    </Box>
  )
}

export default PollDetails
