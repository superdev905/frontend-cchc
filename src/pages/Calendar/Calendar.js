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
  return (
    <div>
      <Wrapper>
        <Box height="500px">
          <Calendar
            localizer={localizer}
            events={[
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
            ]}
            views={['month', 'work_week', 'day', 'agenda']}
            startAccessor="start"
            endAccessor="end"
          />
        </Box>
      </Wrapper>
    </div>
  )
}

export default EventsCalendar
