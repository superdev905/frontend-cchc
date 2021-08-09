import {
  Box,
  Divider,
  IconButton,
  makeStyles,
  Menu,
  Typography
} from '@material-ui/core'
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreHoriz as MoreIcon,
  Close as CloseIcon
} from '@material-ui/icons'
import { formatDate, formatHours } from '../../formatters'
import { Button } from '../UI'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      minWidth: '500px'
    }
  }
}))

const EventPreview = ({ open, onClose, anchorEl, event, onDelete, onEdit }) => {
  const classes = useStyles()
  return (
    <Menu
      classes={{ paper: classes.root }}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
    >
      <Box p={1}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onEdit}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              onDelete(event.id)
              onClose()
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton>
            <MoreIcon />
          </IconButton>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box p={2}>
          <Typography style={{ fontSize: '20px' }}>{event.title}</Typography>
          <Typography>
            {`${formatDate(event.date)}, ${formatHours(
              event.start_date
            )} - ${formatHours(event.end_date)}`}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="flex-end">
          <Button
            size="small"
            variant="outlined"
            disabled={event.status === 'CANCELADO'}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Menu>
  )
}
EventPreview.propTypes = {}

export default EventPreview
