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
  Close as CloseIcon,
  Fullscreen as FullscreenIcon
} from '@material-ui/icons'
import { formatDate, formatHours } from '../../formatters'
import { Button } from '../UI'
import { OptionsMenu } from '../Shared'
import { useMenu } from '../../hooks'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      minWidth: '500px'
    }
  }
}))

const EventPreview = ({
  open,
  onClose,
  anchorEl,
  event,
  onDelete,
  onEdit,
  onCancel
}) => {
  const classes = useStyles()
  const {
    open: openOptions,
    handleOpen,
    handleClose,
    anchorEl: anchorElOptions
  } = useMenu()
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
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => {
              onDelete(event.id)
              onClose()
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handleOpen}>
            <MoreIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={onClose}>
            <CloseIcon fontSize="small" />
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
            onClick={onCancel}
          >
            Cancelar evento
          </Button>
        </Box>
      </Box>
      <OptionsMenu
        open={openOptions}
        onClose={handleClose}
        anchorEl={anchorElOptions}
        customOptions={[
          {
            label: 'Ver página completa',
            icon: FullscreenIcon,
            onClick: () => {
              console.log('sss')
            }
          }
        ]}
      />
    </Menu>
  )
}
EventPreview.propTypes = {}

export default EventPreview
