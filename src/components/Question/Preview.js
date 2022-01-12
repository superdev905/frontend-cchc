import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Grid,
  LinearProgress,
  makeStyles,
  Typography
} from '@material-ui/core'
import { addHours, differenceInHours } from 'date-fns'
import { formatDate, formatHours } from '../../formatters'
import questionsActions from '../../state/actions/questions'

const useStyles = makeStyles((theme) => ({
  targetDate: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: 17
  },
  date: {
    fontSize: 15,
    opacity: 0.8,
    marginBottom: 6
  },
  linearBar: ({ bg }) => ({
    backgroundColor: theme.palette.gray.gray200,
    height: '10px',
    borderRadius: 8,
    '& .MuiLinearProgress-bar': {
      backgroundColor: bg
    }
  })
}))

const PreviewQuestion = ({ question }) => {
  const dispatch = useDispatch()
  const { maxHours } = useSelector((state) => state.questions)
  const getValue = (hours) => 100 - (hours / maxHours) * 100
  const [targetDate] = useState(
    addHours(new Date(question.createdDate), maxHours)
  )
  const [diff] = useState(differenceInHours(targetDate, new Date()))
  const [percentage] = useState(getValue(diff))

  const getBgColor = (value) => {
    if (value <= 50) {
      return '#37a539'
    }
    if (value <= 70) {
      return '#FFB946'
    }
    return '#b00a1b'
  }
  const classes = useStyles({ bg: getBgColor(percentage) })

  useEffect(() => {
    if (!maxHours) {
      dispatch(questionsActions.getMaxHours())
    }
  }, [])

  return (
    <Box px={2} py={3}>
      <Typography className={classes.date}>{`${formatDate(
        new Date(question.createdDate)
      )}-${formatHours(new Date(question.createdDate))}`}</Typography>
      <Typography>
        Título: <strong>{question.title}</strong>
      </Typography>
      <Typography>Consulta: {question.question}</Typography>
      {question.status === 'ASIGNADA' && (
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>
                Ha transcurrido un{' '}
                {percentage <= 100
                  ? `${Math.round(percentage.toFixed(2))}%`
                  : '100%'}{' '}
                del Tiempo Disponible para poder Responder a esta pregunta
              </Typography>
              <Box my={1}>
                <LinearProgress
                  value={percentage > 100 ? 100 : percentage}
                  color="primary"
                  variant="determinate"
                  className={classes.linearBar}
                  classes={{ barColorPrimary: 'red' }}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              {percentage < 100 ? (
                <Box>
                  <Typography align="center">Responser antes de:</Typography>
                  <Box my={1} textAlign="center">
                    <Typography className={classes.targetDate}>{`${formatDate(
                      new Date(targetDate)
                    )}-${formatHours(new Date(targetDate))}`}</Typography>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Typography align="center">
                    Pregunta no Respondida a Tiempo
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export default PreviewQuestion
