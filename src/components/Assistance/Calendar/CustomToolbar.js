import { Box, IconButton, Typography, Button } from '@material-ui/core'
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as NextIcon
} from '@material-ui/icons'
import Toolbar from 'react-big-calendar/lib/Toolbar'

export default class CalendarToolbar extends Toolbar {
  render() {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="15px"
        marginTop="15px"
      >
        <Box>
          <IconButton onClick={() => this.navigate('PREV')}>
            <ArrowBackIcon />
          </IconButton>
          <Button onClick={() => this.navigate('TODAY')}>Hoy</Button>

          <IconButton onClick={() => this.navigate('NEXT')}>
            <NextIcon />
          </IconButton>
        </Box>
        <Box>
          <Typography style={{ fontSize: '18px', textTransform: 'capitalize' }}>
            {this.props.label}
          </Typography>
        </Box>
        <Box>
          <Button
            variant={`${this.props.view === 'day' ? 'contained' : 'outlined'}`}
            color={`${this.props.view === 'day' ? 'primary' : ''}`}
            onClick={this.view.bind(null, 'day')}
          >
            Día
          </Button>
          <Button
            variant={`${this.props.view === 'week' ? 'contained' : 'outlined'}`}
            onClick={this.view.bind(null, 'week')}
            color={`${this.props.view === 'week' ? 'primary' : ''}`}
          >
            Semana
          </Button>
          <Button
            variant={`${
              this.props.view === 'month' ? 'contained' : 'outlined'
            }`}
            onClick={this.view.bind(null, 'month')}
            color={`${this.props.view === 'month' ? 'primary' : ''}`}
          >
            Mes
          </Button>
        </Box>
      </Box>
    )
  }
}
