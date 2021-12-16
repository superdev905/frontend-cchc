import { Box, Chip, makeStyles, Typography } from '@material-ui/core'
import AnswerForm from './AnswerForm'

const useStyles = makeStyles(() => ({
  chip: {
    fontSize: 15,
    marginRight: 5
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold'
  }
}))

const Details = ({ question }) => {
  const classes = useStyles()
  return (
    <Box>
      <Typography className={classes.title}>{question?.title}</Typography>
      <Typography>{question?.question}</Typography>
      <Box my={2}>
        <Chip
          className={classes.chip}
          variant="oulined"
          label={`Estado: ${question?.status}`}
          size="medium"
        />
        <Chip
          className={classes.chip}
          variant="oulined"
          label={`Area: ${question?.areaName}`}
          size="medium"
        />
      </Box>
      <Box>
        <AnswerForm />
      </Box>
    </Box>
  )
}

export default Details
