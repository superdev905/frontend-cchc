import { Box, InputAdornment, makeStyles, Menu } from '@material-ui/core'
import { useEffect, useState } from 'react'
import CalendarIcon from '@material-ui/icons/CalendarToday'
import { Calendar } from 'react-modern-calendar-datepicker'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import { useMenu } from '../../hooks'
import { TextField } from '../UI'

const ESLocale = {
  months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],

  weekDays: [
    {
      name: 'Lunes',
      short: 'L'
    },
    {
      name: 'Martes',
      short: 'M'
    },
    {
      name: 'Miercoles',
      short: 'M'
    },
    {
      name: 'Jueves',
      short: 'J'
    },
    {
      name: 'Viernes',
      short: 'V'
    },
    {
      name: 'Sábado',
      short: 'S',
      isWeekend: true
    },
    {
      name: 'Domingo',
      short: 'D',
      isWeekend: true
    }
  ],
  weekStartingIndex: 6,
  getToday(gregorainTodayObject) {
    return gregorainTodayObject
  },
  toNativeDate(date) {
    return new Date(date.year, date.month - 1, date.day)
  },

  getMonthLength(date) {
    return new Date(date.year, date.month, 0).getDate()
  },
  transformDigit(digit) {
    return digit
  },
  nextMonth: 'Next Month',
  previousMonth: 'Previous Month',
  openMonthSelector: 'Open Month Selector',
  openYearSelector: 'Open Year Selector',
  closeMonthSelector: 'Close Month Selector',
  closeYearSelector: 'Close Year Selector',
  defaultPlaceholder: 'Select...',
  from: 'desde',
  to: 'hasta',
  digitSeparator: ',',
  yearLetterSkip: -2,
  isRtl: false
}

const setCalendarFormat = (date) => {
  if (!date) return null
  const currentDate = new Date(date)
  return {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate()
  }
}

const useStyles = makeStyles((theme) => ({
  input: ({ disabled }) => ({
    pointerEvents: disabled ? 'none' : 'inherit',
    backgroundColor: disabled ? theme.palette.bg.main : 'transparent',
    '& input': {
      cursor: 'pointer'
    }
  })
}))

const CustomDatePicker = ({
  value,
  onChange,
  label,
  required,
  disabled,
  disabledFuture,
  ...props
}) => {
  const classes = useStyles({ disabled })
  const [today] = useState(new Date())
  const [maxDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate()
  })
  const [selectedDate, setSelectedDate] = useState(value || null)
  const [selectDay, setSelectDay] = useState(setCalendarFormat(value))
  const { open, anchorEl, handleOpen, handleClose } = useMenu()

  const handleSelected = (calendarDate) => {
    const nativeDate = new Date(
      calendarDate.year,
      calendarDate.month - 1,
      calendarDate.day
    )
    setSelectedDate(nativeDate)
    setSelectDay(calendarDate)
    handleClose()
  }
  useEffect(() => {
    if (value) {
      setSelectDay(setCalendarFormat(value))
      setSelectedDate(value)
    } else {
      setSelectDay(setCalendarFormat(null))
      setSelectedDate(null)
    }
  }, [value])

  useEffect(() => {
    if (selectedDate) {
      onChange(selectedDate)
    }
  }, [selectedDate])
  return (
    <Box>
      <TextField
        value={
          selectedDate ? new Date(selectedDate).toLocaleDateString('es-CL') : ''
        }
        required={required}
        label={label}
        onClick={handleOpen}
        inputProps={{ readOnly: true }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarIcon />
            </InputAdornment>
          )
        }}
        disabled={disabled}
        className={classes.input}
        {...props}
      />
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        <Calendar
          value={selectDay}
          onChange={handleSelected}
          shouldHighlightWeekends
          locale={ESLocale}
          maximumDate={disabledFuture ? maxDate : null}
        />
      </Menu>
    </Box>
  )
}

CustomDatePicker.defaultProps = {
  required: false,
  placeholder: 'Seleccione fecha',
  disabled: false,
  disabledFuture: true
}
export default CustomDatePicker
