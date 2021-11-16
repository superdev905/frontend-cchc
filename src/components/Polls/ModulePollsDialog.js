import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import BackIcon from '@material-ui/icons/ArrowBack'
import pollActions from '../../state/actions/poll'
import { ConfirmDelete, Dialog } from '../Shared'
import PollCard from './Card'
import { formatDate } from '../../formatters'
import { QuestionCard } from '../Poll/Question'
import { Button, EmptyState } from '../UI'
import { useToggle } from '../../hooks'

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
}))

const PollList = ({ loading, onSelectPoll }) => {
  const [response, setResponse] = useState([])

  const { modulePollList } = useSelector((state) => state.poll)

  useEffect(() => {
    const temp = modulePollList.map((item) => ({
      ...item,
      options: item.question
    }))
    setResponse(temp)
  }, [modulePollList])

  return (
    <Box>
      <Typography
        style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}
        align="center"
      >
        Encuestas disponibles
      </Typography>
      <Box>
        {loading ? (
          <>
            <PollCard loader />
            <PollCard loader />
          </>
        ) : (
          <>
            {response.length === 0 ? (
              <EmptyState message="No hay encuestas para este módulo" />
            ) : (
              response.map((item) => (
                <PollCard
                  poll={item}
                  showAnswers={false}
                  onClick={(currentPoll) => {
                    if (!item.is_answered) {
                      onSelectPoll(currentPoll)
                    }
                  }}
                />
              ))
            )}
          </>
        )}
      </Box>
    </Box>
  )
}

const SuccessMessage = () => (
  <Box>
    <Typography align="center" variant="h6">
      !Tu respuesta fue enviada!
    </Typography>
  </Box>
)

const AnswerPoll = ({ poll, onBack, onNext }) => {
  const classes = useStyles()
  const { open, toggleOpen } = useToggle()
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const [questions, setQuestions] = useState([])
  const { user } = useSelector((state) => state.auth)

  const getQuestions = (idPoll) => {
    dispatch(pollActions.getQuestions({ poll_id: idPoll })).then((result) => {
      setQuestions(
        result.map((item) => ({
          ...item,
          response_text: '',
          response_yn: '',
          selected_options: []
        }))
      )
    })
  }

  const handleTextResponse = (e, question, option) => {
    let temp = null
    if (question.type === 'TEXT') {
      temp = questions.map((item) =>
        item.id === question.id
          ? { ...item, response_text: e.target.value }
          : item
      )
    } else if (question.type === 'SIMPLE_SELECTION') {
      temp = questions.map((item) =>
        item.id === question.id
          ? { ...item, response_yn: e.target.value }
          : item
      )
    } else {
      temp = questions.map((item) => {
        let updatedItem = null
        if (item.id === question.id) {
          const items = item.selected_options
          let newOptions = []
          if (items.includes(option.id)) {
            newOptions = item.selected_options.filter((id) => id !== option.id)
          } else {
            const tempOptions = [...item.selected_options]
            tempOptions.push(option.id)
            newOptions = tempOptions
          }

          updatedItem = { ...item, selected_options: newOptions }
        } else {
          updatedItem = item
        }

        return updatedItem
      })
    }
    setQuestions(temp)
  }

  const handleSubmitPoll = (result) => {
    const formattedResult = result.map((item) => {
      let response = null
      if (item.question_type.key === 'TEXT') {
        response = {
          response_text: item.response_text
        }
      } else if (item.question_type.key === 'SIMPLE_SELECTION') {
        response = {
          response_yn: item.response_yn === 'No'
        }
      } else {
        response = {
          selected_options: item.selected_options.map((id) => id).join(',')
        }
      }

      response = {
        ...response,
        question_id: item.id,
        question_type: item.question_type.key
      }
      return response
    })

    dispatch(
      pollActions.answerPoll({
        poll_id: poll.id,
        user_id: user.id,
        user_fullname: `${user.names} ${user.paternal_surname} ${user.maternal_surname}`,
        user_charge: 'Sin cargo',
        response_date: new Date().toISOString(),
        responses: formattedResult
      })
    ).then(() => {
      onNext()
      enqueueSnackbar('Respuesta enviada', { variant: 'success' })
    })
  }

  useEffect(() => {
    getQuestions(poll.id)
  }, [poll])

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
        {questions.map((item, index) => (
          <QuestionCard
            answer
            editable={false}
            index={index + 1}
            question={{
              ...item,
              type_name: item.question_type.display_name,
              type: item.question_type.key
            }}
            onAnswer={handleTextResponse}
            textResponse={item.response_text}
            simpleResponse={item.response_yn}
            selectedOptions={item.selected_options}
          />
        ))}
      </Box>
      <Box marginTop="15px" textAlign="center">
        <Button onClick={onBack} variant="outlined">
          Cancelar
        </Button>
        <Button disabled={poll.questions.length === 0} onClick={toggleOpen}>
          Enviar respuestas
        </Button>
      </Box>
      <ConfirmDelete
        event="CONFIRM"
        confirmText="Enviar"
        message={
          <Typography variant="h6">
            ¿Estás seguro de enviar las respuestas?
          </Typography>
        }
        open={open}
        onClose={toggleOpen}
        onConfirm={() => handleSubmitPoll(questions)}
      />
    </Box>
  )
}

const ModulePollsDialog = ({ open, onClose, module }) => {
  const dispatch = useDispatch()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [selectedPoll, setSelectedPoll] = useState(null)
  const { isMobile } = useSelector((state) => state.ui)
  const { user } = useSelector((state) => state.auth)

  const fetchModulePolls = () => {
    setLoading(true)
    dispatch(pollActions.getModulePolls({ module, user_id: user.id })).then(
      () => {
        setLoading(false)
      }
    )
  }

  useEffect(() => {
    if (open) {
      setStep(0)
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
          <Box>
            <PollList
              loading={loading}
              onSelectPoll={(currentPoll) => {
                setSelectedPoll(currentPoll)
                setStep(1)
              }}
            />
          </Box>
        )}
        {step === 1 && (
          <AnswerPoll
            poll={selectedPoll}
            onNext={() => {
              setStep(2)
              onClose()
            }}
            onBack={() => {
              setStep(0)
              setSelectedPoll(null)
            }}
          />
        )}
        {step === 2 && <SuccessMessage />}
      </Box>
    </Dialog>
  )
}
export default ModulePollsDialog
