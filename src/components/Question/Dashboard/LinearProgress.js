import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addHours, differenceInHours } from 'date-fns'
import { LinearProgress as Progress, makeStyles } from '@material-ui/core'
import questionsActions from '../../../state/actions/questions'

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

const LinearProgress = ({ question }) => {
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

  useEffect(() => {
    if (!maxHours) {
      dispatch(questionsActions.getMaxHours())
    }
  }, [])

  const classes = useStyles({ bg: getBgColor(percentage) })
  return (
    <>
      <Progress
        value={percentage > 100 ? 100 : percentage}
        color="primary"
        variant="determinate"
        className={classes.linearBar}
        classes={{ barColorPrimary: 'red' }}
      />
    </>
  )
}

export default LinearProgress
