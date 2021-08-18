import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import { endOfMonth, endOfWeek, startOfMonth } from 'date-fns'
import getDay from 'date-fns/getDay'
import es from 'date-fns/locale/es'
import { Box } from '@material-ui/core'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import assistanceActions from '../../state/actions/assistance'
import { Wrapper } from '../../components/UI'
import { useMenu, useSuccess, useToggle } from '../../hooks'
import { EventForm, EventPreview } from '../../components/Assistance'
import {
  CalendarToolbar,
  EventCard
} from '../../components/Assistance/Calendar'
import { ConfirmDelete } from '../../components/Shared'

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

const getBgColor = (event) => {
  if (event.status === 'PROGRAMADA')
    return { backgroundColor: '#aed5ff', border: `3px solid #076af9` }
  if (event.status === 'REPROGRAMADA')
    return { backgroundColor: '#d9d3fc', border: `3px solid #7F6BD4` }
  return { backgroundColor: '#FFEBF6', border: `3px solid #ED61B0` }
}

const EventsCalendar = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [currentDate] = useState(new Date())
  const [calendarDate, setCalendarDate] = useState(currentDate)
  const [loading, setLoading] = useState(false)
  const [rescheduleStatus, setRescheduleStatus] = useState(false)
  const [calendarView, setCalendarView] = useState('work_week')
  const [filters, setFilters] = useState({
    start_date: startOfWeek(currentDate),
    end_date: endOfWeek(currentDate)
  })
  const { open: openPreview, handleClose, handleOpen, anchorEl } = useMenu()
  const { calendarEvents } = useSelector((state) => state.assistance)
  const { user } = useSelector((state) => state.auth)
  const [events, setEvents] = useState([])
  const [currentSlot, setCurrentSlot] = useState(null)
  const [currentEvent, setCurrentEvent] = useState(null)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openConfirmDelete, toggleOpen: toggleOpenConfirmDelete } =
    useToggle()
  const { open: openCancel, toggleOpen: toggleOpenCancel } = useToggle()
  const { open: openFinish, toggleOpen: toggleOpenFinish } = useToggle()
  const { success, changeSuccess } = useSuccess()

  const fetchEvents = (query) => {
    dispatch(
      assistanceActions.getCalendarEvents({
        ...query,
        start_date: query.start_date
          ? new Date(query.start_date).toISOString()
          : null,
        end_date: query.end_date
          ? new Date(query.end_date).toISOString()
          : null,
        user_id: user?.id || null
      })
    )
  }

  const onCancelEvent = () => {
    setLoading(true)
    dispatch(
      assistanceActions.patchEvent(currentEvent.id, { status: 'CANCELADA' })
    )
      .then(() => {
        setLoading(false)
        fetchEvents(filters)
        changeSuccess(true, () => {
          enqueueSnackbar('Evento cancelado', { variant: 'success' })
          handleClose()
          toggleOpenCancel()
        })
      })
      .catch((err) => {
        setLoading(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const onFinishedEvent = () => {
    setLoading(true)
    dispatch(
      assistanceActions.patchEvent(currentEvent.id, { status: 'TERMINADA' })
    )
      .then(() => {
        setLoading(false)
        fetchEvents(filters)
        changeSuccess(true, () => {
          enqueueSnackbar('Evento terminado', { variant: 'success' })
          handleClose()
          toggleOpenFinish()
        })
      })
      .catch((err) => {
        setLoading(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const onCreateEvent = (values) =>
    dispatch(assistanceActions.createEvent(values))

  const onDeleteEvent = (id) => {
    setLoading(true)
    dispatch(assistanceActions.deleteEvent(id))
      .then(() => {
        setLoading(false)
        fetchEvents(filters)
        changeSuccess(true, () => {
          enqueueSnackbar('Evento eliminado', { variant: 'success' })
          toggleOpenConfirmDelete()
        })
      })
      .catch((err) => {
        setLoading(false)
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
      calendarEvents.map((item) => ({
        ...item,
        start: new Date(item.start_date),
        end: new Date(item.end_date)
      }))
    )
  }, [calendarEvents])

  useEffect(() => {
    if (calendarView === 'month') {
      setFilters({
        ...filters,
        start_date: startOfMonth(calendarDate),
        end_date: endOfMonth(calendarDate)
      })
    }
    if (calendarView === 'work_week' || calendarView === 'day') {
      setFilters({
        ...filters,
        start_date: startOfWeek(calendarDate),
        end_date: endOfWeek(calendarDate)
      })
    }
  }, [calendarView, calendarDate])

  useEffect(() => {
    fetchEvents(filters)
  }, [filters])

  return (
    <div>
      <Wrapper>
        <Box height="600px">
          <Calendar
            date={calendarDate}
            selectable
            view={calendarView}
            defaultView="work_week"
            culture="es"
            localizer={localizer}
            events={events}
            views={['month', 'work_week', 'day']}
            startAccessor="start"
            endAccessor="end"
            onView={(newView) => {
              setCalendarView(newView)
            }}
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
              if (calendarView !== 'month') {
                toggleOpenAdd()
                setCurrentSlot(e)
              }
            }}
            eventPropGetter={(event) => {
              const { backgroundColor, border } = getBgColor(event)

              return { style: { backgroundColor, color: '#000000', border } }
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
            fetchEvents(filters)
            setCurrentSlot(null)
          }}
          changeDateTrigger={onNavigate}
        />
      )}
      {currentEvent && openPreview && (
        <EventPreview
          anchorEl={anchorEl}
          event={currentEvent}
          open={openPreview}
          onClose={handleClose}
          onDelete={() => {
            toggleOpenConfirmDelete()
          }}
          onEdit={() => {
            handleClose()
            setCurrentEvent(currentEvent)
            toggleOpenEdit()
          }}
          onReschedule={() => {
            setRescheduleStatus(true)
            handleClose()
            toggleOpenEdit()
          }}
          onCancel={() => {
            handleClose()
            setCurrentEvent(currentEvent)
            toggleOpenCancel()
          }}
          onFinished={() => {
            handleClose()
            setCurrentEvent(currentEvent)
            toggleOpenFinish()
          }}
        />
      )}
      {currentEvent && openEdit && (
        <EventForm
          type="UPDATE"
          event={currentEvent}
          open={openEdit}
          onClose={toggleOpenEdit}
          submitFunction={onUpdateEvent}
          successFunction={() => {
            fetchEvents(filters)
            setRescheduleStatus(false)
          }}
          successMessage={'Evento actualizado'}
          changeDateTrigger={onNavigate}
          reschedule={rescheduleStatus}
        />
      )}

      {currentEvent && openConfirmDelete && (
        <ConfirmDelete
          open={openConfirmDelete}
          onClose={toggleOpenConfirmDelete}
          loading={loading}
          success={success}
          onConfirm={() => onDeleteEvent(currentEvent.id)}
          message={
            <span>
              ¿Estás seguro de eliminar este evento:
              <strong>{currentEvent.title}</strong>?
            </span>
          }
        />
      )}
      {currentEvent && openCancel && (
        <ConfirmDelete
          event="CANCEL"
          confirmText="Aceptar"
          open={openCancel}
          success={success}
          onClose={toggleOpenCancel}
          loading={loading}
          onConfirm={() => onCancelEvent()}
          message={
            <span>
              ¿Estás seguro de cancelar este evento:
              <strong>{currentEvent.title}</strong>?
            </span>
          }
        />
      )}

      {currentEvent && openFinish && (
        <ConfirmDelete
          event="FINISH"
          confirmText="Aceptar"
          open={openFinish}
          success={success}
          onClose={toggleOpenFinish}
          loading={loading}
          onConfirm={() => onFinishedEvent()}
          message={
            <span>
              ¿Estás seguro de terminar este evento:
              <strong>{currentEvent.title}</strong>?
            </span>
          }
        />
      )}
    </div>
  )
}

export default memo(EventsCalendar)
