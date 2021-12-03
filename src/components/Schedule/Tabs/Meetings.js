import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core'
import { useToggle } from '../../../hooks'
import { Button, EmptyState } from '../../UI'
import { MeetingCard, MeetingDialog } from '../Meetings'
import useStyles from './styles'
import scheduleActions from '../../../state/actions/schedule'

const Meetings = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { scheduleId } = useParams()
  const { meetings } = useSelector((state) => state.schedule)
  const [currentMeeting, setCurrentMeeting] = useState(null)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()

  const createMeeting = (values) =>
    dispatch(scheduleActions.createScheduleMeeting({ ...values, scheduleId }))

  const updateMeeting = (values) =>
    dispatch(
      scheduleActions.updateScheduleMeeting(currentMeeting.id, {
        ...currentMeeting,
        ...values
      })
    )

  const fetchMeetings = () => {
    dispatch(scheduleActions.getScheduleMeetings({ scheduleId }))
  }

  useEffect(() => {
    fetchMeetings()
  }, [])

  return (
    <Box>
      <Box mb={1} className={classes.headingWrapper}>
        <Typography className={classes.subHeading}>Reuniones</Typography>
        {meetings.length > 0 && (
          <Button onClick={() => toggleOpenAdd()}>Agregar</Button>
        )}
      </Box>

      {meetings.length === 0 ? (
        <Box>
          <EmptyState
            message="No registraron reuniones para esta programación"
            event={() => toggleOpenAdd()}
            actionMessage="Agregar reunión"
          />
        </Box>
      ) : (
        <Box mt={1}>
          {' '}
          <Grid container spacing={2}>
            {meetings.map((item) => (
              <Grid item xs={12} md={6} key={`meeting-card-${item.id}`}>
                <MeetingCard
                  meeting={item}
                  onEdit={() => {
                    setCurrentMeeting(item)
                    toggleOpenUpdate()
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Box>
        {openAdd && (
          <MeetingDialog
            open={openAdd}
            onClose={toggleOpenAdd}
            submitFunction={createMeeting}
            successMessage={'Reunión creada'}
          />
        )}
        {openUpdate && (
          <MeetingDialog
            type="UPDATE"
            data={currentMeeting}
            open={openUpdate}
            onClose={toggleOpenUpdate}
            submitFunction={updateMeeting}
            successMessage={'Reunión actualizada'}
          />
        )}
      </Box>
    </Box>
  )
}
export default Meetings
