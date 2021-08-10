import { Box, makeStyles } from '@material-ui/core'
import TimePicker from 'rc-time-picker-date-fns'
import 'rc-time-picker-date-fns/assets/index.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& input': {
      padding: `20px ${theme.spacing(2)}px`,
      fontSize: 18,
      width: '100%',
      color: theme.palette.common.black
    }
  }
}))

const TimePickerCustom = ({ value, onChange }) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <TimePicker
        format={'hh:mm a'}
        defaultValue={new Date()}
        showSecond={false}
        value={value}
        onChange={onChange}
        use12Hours
      />
    </Box>
  )
}

export default TimePickerCustom
