import { Box, Typography } from '@material-ui/core'
import { Dialog } from '../Shared'

const EventForm = ({ open, onClose, data }) => (
  <Dialog open={open} onClose={onClose}>
    <Typography>Nuevo evento</Typography>
    <Box>{JSON.stringify(data)}</Box>
  </Dialog>
)

export default EventForm
