import { Box, Chip, makeStyles, Typography } from '@material-ui/core'
import { formatDate, formatHours } from '../../formatters'

const useStyles = makeStyles((theme) => ({
  root: {
    border: `2px solid ${theme.palette.gray.gray300}`,
    borderRadius: theme.spacing(1),
    cursor: 'pointer'
  },
  numberWrapper: {
    width: 120,
    borderRadius: 3,
    border: '1px solid ',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  chip: {
    fontSize: 15,
    marginRight: 5
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold'
  }
}))

const QuestionCard = ({ question }) => {
  const classes = useStyles()

  return (
    <Box p={2} className={classes.root}>
      <Box className={classes.numberWrapper}>{`N° ${question.number}`}</Box>
      <Box mt={1}>
        <Typography style={{ fontSize: 14 }}>
          {`${formatDate(new Date(question.createdDate))} - ${formatHours(
            new Date(question.createdDate)
          )}`}
        </Typography>
        <Box my={1}>
          <Typography className={classes.title}>{question.title}</Typography>
          <Typography>{question.question}</Typography>
        </Box>
        <Box display="flex">
          <Chip
            className={classes.chip}
            variant="oulined"
            label={`Estado: ${question.status}`}
            size="medium"
          />
          <Chip
            className={classes.chip}
            variant="oulined"
            label={`Area: ${question.areaName}`}
            size="medium"
          />
        </Box>
      </Box>
    </Box>
  )
}

export default QuestionCard
