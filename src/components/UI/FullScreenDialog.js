import PropTypes from 'prop-types'
import { Box, Dialog, DialogContent, IconButton } from '@material-ui/core'
import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon
} from '@material-ui/icons'

const FullScreenDialog = ({ open, children, onClose, onBack }) => (
  <Dialog open={open} onClose={onClose} fullScreen={true} maxWidth={false}>
    <DialogContent>
      <Box display="flex" justifyContent="space-between" justifyItems="center">
        <IconButton onClick={onBack}>
          <ArrowBackIcon></ArrowBackIcon>
        </IconButton>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box>{children}</Box>
    </DialogContent>
  </Dialog>
)

FullScreenDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default FullScreenDialog
