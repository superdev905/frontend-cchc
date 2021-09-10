import { memo, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { endOfWeek, startOfWeek } from 'date-fns'
import { Box, Typography } from '@material-ui/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import assistanceActions from '../../state/actions/assistance'
import { Wrapper } from '../../components/UI'
import { useMenu, useSuccess, useToggle } from '../../hooks'
import { EventForm, EventPreview } from '../../components/Assistance'
import { ConfirmDelete } from '../../components/Shared'
import useStyles from './styles'
import './custom.css'
import { formatHours } from '../../formatters'

const EventsCalendar = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const calendarApi = useRef()
  const [currentDate] = useState(new Date())
  const [calendarDate, setCalendarDate] = useState(currentDate)
  const [loading, setLoading] = useState(false)
  const [rescheduleStatus, setRescheduleStatus] = useState(false)
  const [rangeDate, setRangeDate] = useState({ start: null, end: null })
  const [currentView, setCurrentView] = useState('timeGridWeek')
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
  const { open: openStart, toggleOpen: toggleOpenStart } = useToggle()
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
      assistanceActions.patchEvent(currentEvent.visitId, {
        status: 'CANCELADA'
      })
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
      assistanceActions.patchEvent(currentEvent.visitId, {
        status: 'TERMINADA'
      })
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

  const onStartEvent = () => {
    setLoading(true)
    dispatch(
      assistanceActions.patchEvent(currentEvent.visitId, { status: 'INICIADA' })
    )
      .then(() => {
        setLoading(false)
        fetchEvents(filters)
        changeSuccess(true, () => {
          enqueueSnackbar('Evento actualizado a iniciado', {
            variant: 'success'
          })
          handleClose()
          toggleOpenStart()
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
      assistanceActions.updateEvent(currentEvent.visitId, {
        ...values,
        created_by: currentEvent.created_by
      })
    )

  const onNavigate = (targetDate) => {
    setCalendarDate(targetDate)
  }

  const getBgColor = (eventStatus) => {
    if (eventStatus === 'PROGRAMADA' || eventStatus === 'REPROGRAMADA')
      return '#aed5ff'
    if (eventStatus === 'TERMINADA') return '#81d88d'
    if (eventStatus === 'INICIADA' || eventStatus === 'PAUSA') return '#f6e68f'
    return '#FFEBF6'
  }
  const getCardClass = (eventStatus) => {
    if (eventStatus === 'PROGRAMADA' || eventStatus === 'REPROGRAMADA')
      return classes.blue
    if (eventStatus === 'TERMINADA') return classes.green
    if (eventStatus === 'INICIADA' || eventStatus === 'PAUSA')
      return classes.yellow
    return classes.red
  }

  const renderCard = ({ event }) => {
    const { status, start_date, end_date } = event.extendedProps
    return (
      <Box className={clsx(classes.eventCard, getCardClass(status))}>
        <Typography className={classes.hours}>
          {`${formatHours(start_date)}-${formatHours(end_date)}`}
        </Typography>
        <Typography className={classes.title}>{event.title}</Typography>
        <Typography className={classes.status}>{status}</Typography>
      </Box>
    )
  }

  const handleSelectSlot = (e) => {
    if (new Date(e.start) >= currentDate) {
      toggleOpenAdd()
      setCurrentSlot(e)
    } else {
      enqueueSnackbar(
        'No puedes visitas o tareas programar para fechas pasadas',
        {
          variant: 'info',
          autoHideDuration: 1000,
          preventDuplicate: false
        }
      )
    }
  }

  useEffect(() => {
    setEvents(
      calendarEvents.map((item) => ({
        ...item,
        visitId: item.id,
        date: new Date(item.date),
        start: new Date(item.start_date),
        end: new Date(item.end_date),
        backgroundColor: getBgColor(item.status)
      }))
    )
  }, [calendarEvents])

  useEffect(() => {
    if (calendarApi.current) {
      console.log(calendarApi.current)
    }
    if (rangeDate.start && rangeDate.end) {
      console.log(rangeDate)
      setFilters({ start_date: rangeDate.start, end_date: rangeDate.end })
    }
  }, [calendarApi, rangeDate])

  useEffect(() => {
    fetchEvents(filters)
  }, [filters])

  return (
    <div>
      <Wrapper>
        <Box miHeight="600px">
          <FullCalendar
            ref={calendarApi}
            height="700px"
            now={calendarDate}
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            headerToolbar={{
              left: 'prev,today,next',
              center: 'title',
              right: 'timeGridDay,timeGridWeek,dayGridMonth'
            }}
            buttonText={{
              today: 'HOY',
              month: 'MES',
              week: 'SEMANA',
              day: 'DIA'
            }}
            locale="es"
            displayEventTime={true}
            initialView={currentView}
            nowIndicator={true}
            events={events}
            select={handleSelectSlot}
            datesSet={(e) => {
              console.log(e)
              setCurrentView(e.view.type)
              setRangeDate({ start: e.start, end: e.end })
            }}
            allDayContent={false}
            allDaySlot={false}
            editable={true}
            selectable={true}
            eventContent={
              currentView !== 'dayGridMonth' ? renderCard : () => {}
            }
            eventClick={(event) => {
              setCurrentEvent({
                ...event.event.extendedProps,
                date: event.event.extendedProps.start_date,
                title: event.event.title
              })
              handleOpen({ currentTarget: event.el })
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
          onStart={() => {
            handleClose()
            setCurrentEvent(currentEvent)
            toggleOpenStart()
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
          onConfirm={() => onDeleteEvent(currentEvent.visitId)}
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
              ¿Estás seguro de completar este evento:
              <strong>{` ${currentEvent.title}`}</strong>?
            </span>
          }
        />
      )}
      {currentEvent && openStart && (
        <ConfirmDelete
          event="START"
          confirmText="Aceptar"
          open={openStart}
          success={success}
          onClose={toggleOpenFinish}
          loading={loading}
          onConfirm={() => onStartEvent()}
          message={
            <span>
              ¿Estás seguro de iniciar este evento:
              <strong>{` ${currentEvent.title}`}</strong>?
            </span>
          }
        />
      )}
    </div>
  )
}

export default memo(EventsCalendar)
