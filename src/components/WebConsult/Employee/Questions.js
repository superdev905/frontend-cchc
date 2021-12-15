import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import QuestionCard from '../QuestionCard'
import useStyles from './styles'
import questionEmployeeActions from '../../../state/actions/questionEmployee'

const Questions = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { employeeId, questions } = useSelector(
    (state) => state.questionEmployee
  )
  const [query] = useState({ employeeId })

  const fetchQuestions = () => {
    dispatch(questionEmployeeActions.getQuestions(query))
  }

  useEffect(() => {
    if (employeeId) {
      fetchQuestions()
    }
  }, [employeeId])
  return (
    <Box>
      <Box mb={1}>
        <Typography className={classes.title}>Mis Preguntas</Typography>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {questions.map((item) => (
            <Grid item xs={12} key={`card-item-${item.id}`}>
              <QuestionCard question={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Questions
