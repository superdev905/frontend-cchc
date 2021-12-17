import { useEffect, useState } from 'react'
import { Box, Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import questionActions from '../../../state/actions/questions'
import { EmptyState } from '../../UI'
import QuestionCard from '../../WebConsult/QuestionCard'

const LastQuestions = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const { lastQuestions } = useSelector((state) => state.questions)
  const fetchList = () => {
    setLoading(true)
    dispatch(questionActions.getLastQuestions({ professionalId: user.id }))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <Box>
      <Box my={1}>
        <Grid container spacing={2}>
          {loading ? (
            <>
              <Grid item xs={12}>
                <QuestionCard.Loader />
              </Grid>
              <Grid item xs={12}>
                <QuestionCard.Loader />
              </Grid>
              <Grid item xs={12}>
                <QuestionCard.Loader />
              </Grid>
            </>
          ) : (
            <>
              {lastQuestions.length === 0 ? (
                <Grid item xs={12}>
                  <EmptyState message="No tienes preguntas asignadas" />
                </Grid>
              ) : (
                <>
                  {lastQuestions.map((item) => (
                    <Grid item xs={12} key={`question-${item.id}`}>
                      <QuestionCard
                        question={item}
                        onClick={() => {
                          history.push(`/question/list/${item.number}`)
                        }}
                      />
                    </Grid>
                  ))}
                </>
              )}
            </>
          )}
        </Grid>
      </Box>
    </Box>
  )
}
export default LastQuestions
