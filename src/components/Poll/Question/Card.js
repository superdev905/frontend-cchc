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
import QuestionOption from './QuestionOption'
import { TextArea } from '../../UI'

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

const QuestionCard = ({ question, index }) => {
  const classes = useStyles()
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
          <Box className={classes.buttons}>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Box>
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
          {question.type === 'TEXT' && (
            <>
              <TextArea disabled />
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}

QuestionCard.defaultProps = {
  question: {
    type: 'MULTIPLE_SELECTION'
  }
}

QuestionCard.propTypes = {
  question: PropTypes.object
}

export default QuestionCard
