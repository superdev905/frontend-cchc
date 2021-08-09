import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import es from 'date-fns/locale/es'
import { Box, Typography } from '@material-ui/core'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import assistanceActions from '../../state/actions/assistance'
import { Wrapper } from '../../components/UI'
import { useMenu, useToggle } from '../../hooks'
import { EventForm, EventPreview } from '../../components/Assistance'

import CustomToolbar from '../../components/Assistance/Calendar/CustomToolbar'

const EventCard = ({ event }) => (
  <Box>
    <Typography>{event.title}</Typography>
    <Typography>{event.status}</Typography>
  </Box>
)

const locales = {
  es
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const EventsCalendar = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { open: openPreview, handleClose, handleOpen, anchorEl } = useMenu()
  const { listEvents } = useSelector((state) => state.assistance)
  const [events, setEvents] = useState([])
  const [currentSlot, setCurrentSlot] = useState(null)
  const [currentEvent, setCurrentEvent] = useState(null)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()

  const fetchEvents = () => {
    dispatch(assistanceActions.getEvents())
  }

  const onCreateEvent = (values) =>
    dispatch(assistanceActions.createEvent(values))

  const onDeleteEvent = (id) => {
    dispatch(assistanceActions.deleteEvent(id))
      .then(() => {
        enqueueSnackbar('Evento eliminado', { variant: 'success' })
        fetchEvents()
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const onUpdateEvent = (values) =>
    dispatch(
      assistanceActions.updateEvent({
        ...values,
        created_by: currentEvent.created_by
      })
    )

  useEffect(() => {
    setEvents(
      listEvents.map((item) => ({
        ...item,
        start: new Date(item.start_date),
        end: new Date(item.end_date),
        title: `Evento ${item.id}`
      }))
    )
  }, [listEvents])

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div>
      <Wrapper>
        <Box height="600px">
          <Calendar
            selectable
            defaultView="work_week"
            culture="es"
            localizer={localizer}
            events={events}
            views={['month', 'work_week', 'day']}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={(event, e) => {
              setCurrentEvent(event)
              handleOpen(e)
            }}
            components={{
              event: EventCard,
              toolbar: CustomToolbar
            }}
            onSelectSlot={(e) => {
              toggleOpenAdd()
              setCurrentSlot(e)
            }}
          />
        </Box>
      </Wrapper>
      {currentSlot && openAdd && (
        <EventForm
          data={currentSlot}
          open={openAdd}
          onClose={toggleOpenAdd}
          submitFunction={onCreateEvent}
        />
      )}
      {currentEvent && openEdit && (
        <EventForm
          type="UPDATE"
          event={currentEvent}
          open={openEdit}
          onClose={toggleOpenEdit}
          submitFunction={onUpdateEvent}
        />
      )}
      {currentEvent && openPreview && (
        <EventPreview
          anchorEl={anchorEl}
          event={currentEvent}
          open={openPreview}
          onClose={handleClose}
          onDelete={onDeleteEvent}
          onEdit={() => {
            handleClose()
            setCurrentEvent(currentEvent)
            toggleOpenEdit()
          }}
        />
      )}
    </div>
  )
}

export default EventsCalendar
