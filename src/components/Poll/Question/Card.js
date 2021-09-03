import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import {
  Box,
  Chip,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import {
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon
} from '@material-ui/icons'
import { useToggle, useSuccess } from '../../../hooks'
import QuestionOption from './QuestionOption'
import { TextArea } from '../../UI'
import { ConfirmDelete } from '../../Shared'
import QuestionModal from './Modal'
import pollActions from '../../../state/actions/poll'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F6F6F6',
    borderRadius: 5,
    marginBottom: 20
  },
  buttons: {
    '& button': {
      margin: 0,
      padding: 5
    }
  },
  centerVertical: {
    display: 'flex',
    alignItems: 'center'
  },
  order: {
    width: 35,
    height: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 5,
    color: theme.palette.common.white,
    marginRight: 10
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  questionType: {
    margin: '10px'
  }
}))

const QuestionCard = ({
  question,
  index,
  editable,
  answer,
  onAnswer,
  textResponse,
  simpleResponse,
  selectedOptions,
  successFunction
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { idPoll } = useParams()
  const { user } = useSelector((state) => state.auth)
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { success, changeSuccess } = useSuccess()

  const updateQuestion = (values) =>
    dispatch(
      pollActions.updateQuestion(question.id, {
        ...values,
        poll_id: idPoll,
        created_by: user.id
      })
    )

  const onDelete = (id) => {
    dispatch(pollActions.deleteQuestion(id))
      .then(() => {
        changeSuccess(true, () => {
          toggleOpenDelete()
          successFunction()
        })
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  return (
    <Box className={classes.root}>
      <Box p={1}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="15px"
        >
          <Box className={classes.centerVertical}>
            <Box className={classes.order}>{index}</Box>
            <Typography className={classes.question}>
              {question.question}
            </Typography>
          </Box>
          {editable && (
            <Box className={classes.buttons}>
              <IconButton onClick={toggleOpenEdit}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={toggleOpenDelete}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        {!answer && (
          <Box className={classes.questionType}>
            Tipo de respuesta{' '}
            <Chip color="primary" label={question.type_name} />
          </Box>
        )}
        <Box>
          {question.type === 'SIMPLE_SELECTION' && (
            <>
              <QuestionOption
                selected={simpleResponse === 'Si'}
                value="Si"
                disabled={!answer}
                onAnswer={(e) => {
                  onAnswer(e, question)
                }}
              />
              <QuestionOption
                selected={simpleResponse === 'No'}
                value="No"
                disabled={!answer}
                onAnswer={(e) => {
                  onAnswer(e, question)
                }}
              />
            </>
          )}
          {question.type === 'MULTIPLE_SELECTION' && (
            <>
              {question.options.map((item) => (
                <QuestionOption
                  value={item.option_name}
                  disabled={!answer}
                  questionType={'MULTIPLE_SELECTION'}
                  editable={answer}
                  selected={selectedOptions.includes(item.id)}
                  onAnswer={(e) => {
                    onAnswer(e, question, item)
                  }}
                />
              ))}
            </>
          )}
          {question.type === 'TEXT' && (
            <>
              <TextArea
                value={textResponse}
                disabled={!answer}
                onChange={(e) => onAnswer(e, question)}
              />
            </>
          )}
        </Box>
        {question && openEdit && (
          <QuestionModal
            type="UPDATE"
            open={openEdit}
            successMessage="Pregunta actualizada"
            onClose={toggleOpenEdit}
            data={question}
            submitFunction={updateQuestion}
            successFunction={successFunction}
          />
        )}

        {question && openDelete && (
          <ConfirmDelete
            open={openDelete}
            onClose={toggleOpenDelete}
            success={success}
            message={
              <span>
                ¿Estás seguro de eliminar esta pregunta:{' '}
                <strong>{question.question}</strong>?{' '}
              </span>
            }
            onConfirm={() => onDelete(question.id)}
          />
        )}
      </Box>
    </Box>
  )
}

QuestionCard.defaultProps = {
  question: {
    type: 'MULTIPLE_SELECTION'
  },
  editable: true,
  answer: false
}

QuestionCard.propTypes = {
  question: PropTypes.object
}

export default QuestionCard
