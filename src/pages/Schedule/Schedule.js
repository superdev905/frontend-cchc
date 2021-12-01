import { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { HeadingWithButton } from '../../components/Shared'
import { Wrapper } from '../../components/UI'
import scheduleActions from '../../state/actions/schedule'
import { ScheduleDetails, ScheduleTabs } from '../../components/Schedule'

const Schedule = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { scheduleId } = useParams()
  const [loading, setLoading] = useState(false)
  const { scheduleDetails } = useSelector((state) => state.schedule)

  const fetchDetails = () => {
    setLoading(true)
    dispatch(scheduleActions.getSchedule(scheduleId)).then(() => {
      setLoading(false)
    })
  }
  useEffect(() => {
    fetchDetails()
  }, [])
  return (
    <Wrapper>
      <Box display="flex" alignItems="center">
        <HeadingWithButton
          title={`${scheduleDetails?.period} - ${scheduleDetails?.businessName}`}
          loading={loading}
          goBack={() => {
            history.goBack()
          }}
        />
      </Box>
      <Box p={2}>
        <ScheduleDetails />
      </Box>
      <Box>
        <ScheduleTabs />
      </Box>
    </Wrapper>
  )
}
export default Schedule
