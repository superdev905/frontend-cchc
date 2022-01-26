import { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import assistanceActions from '../../state/actions/assistance'
import { SimpleCard } from '../UI'

const Cards = ({ query }) => {
  const dispatch = useDispatch()
  const { calendarStats } = useSelector((state) => state.assistance)
  const fetchStats = () => {
    const formattedQuery = {
      startDate: new Date(query.start_date).toISOString(),
      endDate: new Date(query.end_date).toISOString()
    }
    if (query.users) {
      formattedQuery.users = query.users
    }
    dispatch(assistanceActions.getCalendarStats(formattedQuery))
  }

  useEffect(() => {
    fetchStats()
  }, [query])

  return (
    <Grid container spacing={1}>
      {calendarStats.map((item, index) => (
        <Grid item xs={6} md={4} lg={2} key={`calendar-card-${index}`}>
          <SimpleCard label={item.label} data={item.value} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Cards
