import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { Box, IconButton, Typography } from '@material-ui/core'
import BackIcon from '@material-ui/icons/ArrowBack'
import pollActions from '../../../state/actions/poll'
import { useToggle } from '../../../hooks'
import { QuestionCard } from '../../Poll/Question'
import useStyles from './styles'
import { Button } from '../../UI'
import { formatDate } from '../../../formatters'
import { ConfirmDelete } from '../../Shared'

const Questions = ({ poll, onBack, onNext }) => {
  const classes = useStyles()
  const { open, toggleOpen } = useToggle()
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const [questions, setQuestions] = useState([])
  const { user } = useSelector((state) => state.auth)
  const { moduleResponse } = useSelector((state) => state.poll)

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
    ).then((response) => {
      onNext()
      dispatch(
        pollActions.updateModuleStatus({
          ...moduleResponse,
          pollStatus: moduleResponse.pollStatus.map((item) =>
            item.id === poll.id
              ? { ...item, isAnswered: true, responseId: response.id }
              : item
          )
        })
      )
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

export default Questions
