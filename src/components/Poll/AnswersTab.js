import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box } from '@material-ui/core'
import GridOnIcon from '@material-ui/icons/GridOn'
import { Button, EmptyState } from '../UI'
import AnswerRow from './AnswerRow'
import pollActions from '../../state/actions/poll'
import AnswerDialog from './AnswerDialog'
import { useToggle } from '../../hooks'

const AnswerTab = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState(null)
  const { idPoll } = useParams()
  const { pollAnswers } = useSelector((state) => state.poll)
  const { isMobile } = useSelector((state) => state.ui)
  const { open, toggleOpen } = useToggle()

  const fetchAnswers = () => {
    setLoading(true)
    dispatch(pollActions.getPollAnswers({ poll_id: idPoll })).then(() => {
      setLoading(false)
    })
  }

  const exportData = () => {
    dispatch(pollActions.exportData({ poll_id: idPoll }))
  }

  useEffect(() => {
    fetchAnswers()
  }, [])

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <Button size="small" startIcon={<GridOnIcon />} onClick={exportData}>
          Exportar a excel
        </Button>
      </Box>
      <Box p={1}>
        {!isMobile && <AnswerRow.Heading />}
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
                  onView={() => {
                    setCurrentAnswer(item)
                    toggleOpen()
                  }}
                />
              ))
            )}
          </>
        )}

        {open && currentAnswer && (
          <AnswerDialog
            open={open}
            onClose={toggleOpen}
            userAnswer={currentAnswer}
          />
        )}
      </Box>
    </Box>
  )
}
export default AnswerTab
