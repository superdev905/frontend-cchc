import { useEffect } from 'react'
import { Box, Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import socialCasesActions from '../../state/actions/socialCase'
import { SimpleCard } from '../UI'

const SocialCasesCards = () => {
  const dispatch = useDispatch()
  const { stats } = useSelector((state) => state.socialCase)

  useEffect(() => {
    dispatch(socialCasesActions.getStats())
  }, [])

  return (
    <Box mt={1} mb={2}>
      <Grid container spacing={2}>
        {stats.map((item, i) => (
          <Grid item xs={6} md={3} key={`stats-card-${i}`}>
            <SimpleCard label={item.label.toUpperCase()} data={item.value} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default SocialCasesCards
