import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import es from 'date-fns/locale/es'
import { Box } from '@material-ui/core'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import assistanceActions from '../../state/actions/assistance'
import { Wrapper } from '../../components/UI'
import { useMenu, useToggle } from '../../hooks'
import { EventForm, EventPreview } from '../../components/Assistance'

import {
  CalendarToolbar,
  EventCard
} from '../../components/Assistance/Calendar'

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
  const [calendarDate, setCalendarDate] = useState(new Date())
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

  const onCancelEvent = () => {
    dispatch(
      assistanceActions.patchEvent(currentEvent.id, { status: 'CANCELADO' })
    ).then(() => {
      fetchEvents()
      handleClose()
    })
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
      assistanceActions.updateEvent(currentEvent.id, {
        ...values,
        created_by: currentEvent.created_by
      })
    )

  const onNavigate = (targetDate) => {
    setCalendarDate(targetDate)
  }

  useEffect(() => {
    setEvents(
      listEvents.map((item) => ({
        ...item,
        start: new Date(item.start_date),
        end: new Date(item.end_date)
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
            date={calendarDate}
            selectable
            defaultView="work_week"
            culture="es"
            localizer={localizer}
            events={events}
            views={['month', 'work_week', 'day']}
            startAccessor="start"
            endAccessor="end"
            onNavigate={onNavigate}
            onDoubleClickEvent={(e) => {
              setCurrentEvent(e)
              toggleOpenEdit()
            }}
            onSelectEvent={(event, e) => {
              setCurrentEvent(event)
              handleOpen(e)
            }}
            components={{
              event: EventCard,
              toolbar: CalendarToolbar
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
          onClose={() => {
            toggleOpenAdd()
            setCurrentSlot(null)
          }}
          submitFunction={onCreateEvent}
          successFunction={() => {
            fetchEvents()
            setCurrentSlot(null)
          }}
          changeDateTrigger={onNavigate}
        />
      )}
      {currentEvent && openEdit && (
        <EventForm
          type="UPDATE"
          event={currentEvent}
          open={openEdit}
          onClose={toggleOpenEdit}
          submitFunction={onUpdateEvent}
          successMessage={'Evento actualizado'}
          changeDateTrigger={onNavigate}
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
          onCancel={onCancelEvent}
        />
      )}
    </div>
  )
}

export default EventsCalendar
