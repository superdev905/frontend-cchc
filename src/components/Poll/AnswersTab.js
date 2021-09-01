import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box } from '@material-ui/core'
import GridOnIcon from '@material-ui/icons/GridOn'
import { Button, EmptyState } from '../UI'
import AnswerRow from './AnswerRow'
import pollActions from '../../state/actions/poll'

const AnswerTab = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { idPoll } = useParams()
  const { pollAnswers } = useSelector((state) => state.poll)

  const fetchAnswers = () => {
    setLoading(true)
    dispatch(pollActions.getPollAnswers({ poll_id: idPoll })).then(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchAnswers()
  }, [])

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <Button size="small" startIcon={<GridOnIcon />}>
          Exportar a excel
        </Button>
      </Box>
      <Box p={1}>
        <AnswerRow.Heading />
        {loading ? (
          <>
            <AnswerRow loader />
            <AnswerRow loader />
          </>
        ) : (
          <>
            {pollAnswers.length === 0 ? (
              <EmptyState message="No hay respuestas para esta encuesta" />
            ) : (
              pollAnswers.map((item) => (
                <AnswerRow
                  answer={{ ...item, userFullName: item.user_fullname }}
                />
              ))
            )}
          </>
        )}
      </Box>
    </Box>
  )
}
export default AnswerTab
