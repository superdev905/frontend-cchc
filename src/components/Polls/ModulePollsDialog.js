import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import BackIcon from '@material-ui/icons/ArrowBack'
import pollActions from '../../state/actions/poll'
import { Dialog } from '../Shared'
import PollCard from './Card'
import { formatDate } from '../../formatters'
import { QuestionCard } from '../Poll/Question'

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
}))

const PollList = ({ onSelectPoll }) => {
  const { modulePollList } = useSelector((state) => state.poll)

  return (
    <Box>
      <Typography
        style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}
        align="center"
      >
        Encuestas disponibles
      </Typography>
      <Box>
        {modulePollList.map((item) => (
          <PollCard
            poll={item}
            showAnswers={false}
            onClick={(currentPoll) => {
              console.log(currentPoll)
              onSelectPoll(currentPoll)
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

const AnswerPoll = ({ poll, onBack }) => {
  const classes = useStyles()
  return (
    <Box>
      <Typography className={classes.title}>
        <IconButton onClick={onBack}>
          <BackIcon />
        </IconButton>
        {poll.title}
      </Typography>
      <Box marginBottom="15px">
        <Typography>Preguntas: {poll.questions.length}</Typography>
        <Typography>Fecha de fin: {formatDate(poll.end_date)}</Typography>
      </Box>
      <Box>
        {poll.questions.map((item, index) => (
          <QuestionCard
            editable={false}
            index={index + 1}
            question={{
              ...item,
              type_name: item.question_type.display_name,
              type: item.question_type.key
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

const ModulePollsDialog = ({ open, onClose, module }) => {
  const dispatch = useDispatch()
  const [step, setStep] = useState(0)
  const [selectedPoll, setSelectedPoll] = useState(null)
  const { isMobile } = useSelector((state) => state.ui)

  const fetchModulePolls = () => {
    dispatch(pollActions.getModulePolls({ module }))
  }

  useEffect(() => {
    if (open) {
      fetchModulePolls()
    }
  }, [open, module])
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={'lg'}
      fullWidth
      fullScreen={isMobile}
    >
      <Box p={2}>
        {step === 0 && (
          <PollList
            onSelectPoll={(currentPoll) => {
              setSelectedPoll(currentPoll)
              setStep(1)
            }}
          />
        )}
        {step === 1 && (
          <AnswerPoll
            poll={selectedPoll}
            onBack={() => {
              setStep(0)
              setSelectedPoll(null)
            }}
          />
        )}
      </Box>
    </Dialog>
  )
}
export default ModulePollsDialog
