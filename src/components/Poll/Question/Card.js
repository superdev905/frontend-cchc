import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
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

const QuestionCard = ({ question, index, editable }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { poll } = useSelector((state) => state.poll)
  const { user } = useSelector((state) => state.auth)
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { success, changeSuccess } = useSuccess()

  const getQuestionDetails = () => {
    dispatch(pollActions.getQuestionDetails(question.id, poll.id))
  }

  const updateQuestion = (values, options) =>
    dispatch(
      pollActions.updateQuestion(question.id, {
        ...values,
        poll_id: poll.id,
        created_by: user.id,
        options: options.id
      })
    )

  const onDelete = (id) => {
    dispatch(pollActions.deleteQuestion(id))
      .then(() => {
        changeSuccess(true, () => {
          toggleOpenDelete()
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Box className={classes.root}>
      <Box p={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
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
        <Box className={classes.questionType}>
          Tipo de respuesta <Chip color="primary" label={question.type_name} />
        </Box>
        <Box>
          {question.type === 'SIMPLE_SELECTION' && (
            <>
              <QuestionOption question="Si" disabled />
              <QuestionOption question="No" disabled />
            </>
          )}
          {question.type === 'MULTIPLE_SELECTION' && (
            <>
              {question.options.map((item) => (
                <QuestionOption
                  question={item.option_name}
                  disabled
                  questionType={'MULTIPLE_SELECTION'}
                />
              ))}
            </>
          )}
          {question.type === 'TEXT' && (
            <>
              <TextArea disabled />
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
            successFunction={getQuestionDetails}
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
                <strong>{question.question}</strong>{' '}
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
  editable: true
}

QuestionCard.propTypes = {
  question: PropTypes.object
}

export default QuestionCard
