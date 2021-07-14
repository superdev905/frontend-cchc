import PropTypes from 'prop-types'
import { Box, Dialog, DialogContent, Typography } from '@material-ui/core'
import { Button, SubmitButton } from '../UI'

const ConfirmDelete = ({
  open,
  onClose,
  message,
  onConfirm,
  success,
  loading
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogContent>
      <Box p={2}>
        <Typography variant="h6" align="center">
          {message}
        </Typography>
        <Box textAlign="center" marginTop="15px">
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <SubmitButton
            danger
            onClick={onConfirm}
            loading={loading}
            success={success}
          >
            Eliminar
          </SubmitButton>
        </Box>
      </Box>
    </DialogContent>
  </Dialog>
)

ConfirmDelete.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  onConfirm: PropTypes.func
}

export default ConfirmDelete
