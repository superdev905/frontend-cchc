import { useState } from 'react'
import { addHours, addMinutes } from 'date-fns'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import es from 'date-fns/locale/es'
import { Box } from '@material-ui/core'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Wrapper } from '../../components/UI'

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
  const [currentDate] = useState(new Date())
  const [events, setEvents] = useState([
    {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(),
      end: new Date()
    },
    {
      id: 5,
      title: 'Conference',
      start: new Date(addMinutes(currentDate, 30)),
      end: new Date(addHours(currentDate, 3)),
      desc: 'Big conference for important people'
    }
  ])

  const handleSelectSlot = (e) => {
    console.log(e)
    const temp = [...events]
    temp.push({ ...e, title: 'Example' })
    setEvents(temp)
  }
  return (
    <div>
      <Wrapper>
        <Box height="500px">
          <Calendar
            selectable
            localizer={localizer}
            events={events}
            views={['month', 'work_week', 'day', 'agenda']}
            startAccessor="start"
            endAccessor="end"
            onSelectSlot={handleSelectSlot}
          />
        </Box>
      </Wrapper>
    </div>
  )
}

export default EventsCalendar
