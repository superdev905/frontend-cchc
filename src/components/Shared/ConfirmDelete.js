import PropTypes from 'prop-types'
import { Box, Dialog, DialogContent, Typography } from '@material-ui/core'
import { Button, SubmitButton } from '../UI'

const ConfirmDelete = ({
  event,
  confirmText,
  open,
  onClose,
  message,
  onConfirm,
  success,
  loading,
  maxWidth,
  fullWidth,
  disabled,
  noCloseButton
}) => (
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
        <Box textAlign="center" marginTop="15px">
          {noCloseButton ? (
            ''
          ) : (
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
          )}
          <SubmitButton
            danger={event === 'DELETE'}
            onClick={onConfirm}
            loading={loading}
            success={success}
            disabled={disabled}
          >
            {confirmText}
          </SubmitButton>
        </Box>
      </Box>
    </DialogContent>
  </Dialog>
)

ConfirmDelete.defaultProps = {
  event: 'DELETE',
  confirmText: 'Eliminar',
  fullWidth: false,
  maxWidth: 'md'
}

ConfirmDelete.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  maxWidth: PropTypes.oneOf(['lg', 'md', 'xs', 'xl', 'sm']),
  fullWidth: PropTypes.bool,
  onConfirm: PropTypes.func
}

export default ConfirmDelete
