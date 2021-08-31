import {
  Box,
  Checkbox,
  IconButton,
  InputBase,
  makeStyles,
  Radio,
  Typography
} from '@material-ui/core'
import { DeleteOutline as DeleteIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    marginBottom: 9,
    borderRadius: 5
  },
  row: {
    padding: '2px 15px'
  },
  actions: {
    '& button': {
      margin: 0,
      padding: 5
    }
  },
  input: {
    '& input': {
      padding: 0
    }
  }
}))

const QuestionOption = ({ questionType, question, selected, disabled }) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.row}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            {questionType === 'MULTIPLE_SELECTION' ? (
              <>
                <Checkbox
                  color="primary"
                  checked={selected}
                  disabled={disabled}
                />
                <InputBase className={classes.input} value={question} />
              </>
            ) : (
              <Box display="flex" alignItems="center">
                <Radio color="primary" checked={selected} disabled={disabled} />
                <Typography>{question}</Typography>
              </Box>
            )}
          </Box>
          {questionType === 'MULTIPLE_SELECTION' && (
            <Box className={classes.actions}>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

QuestionOption.propTypes = {}

export default QuestionOption
