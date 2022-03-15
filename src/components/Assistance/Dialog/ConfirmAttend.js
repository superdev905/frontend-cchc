import { Box, Dialog, DialogContent, Typography } from '@material-ui/core'

const ConfirmAttend = ({ open, onClose, message, maxWidth, fullWidth }) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth={maxWidth}
    fullWidth={fullWidth}
  >
    <DialogContent>
      <Box p={2}>
        <Typography variant="h6" align="center">
          {message}
        </Typography>
      </Box>
    </DialogContent>
  </Dialog>
)

export default ConfirmAttend
