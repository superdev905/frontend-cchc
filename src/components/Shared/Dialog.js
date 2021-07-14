import PropTypes from 'prop-types'
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  makeStyles
} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  content: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  }
}))

const CustomDialog = ({
  open,
  children,
  onClose,
  fullWidth,
  maxWidth,
  fullScreen,
  ...props
}) => {
  const classes = useStyles()
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      fullScreen={fullScreen}
      {...props}
    >
      <DialogContent>
        <Box>
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box className={classes.content}>{children}</Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

CustomDialog.defaultProps = {
  fullWidth: false,
  fullScreen: false,
  maxWidth: 'md'
}

CustomDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool,
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.oneOf(['lg', 'md', 'xs', 'xl', 'sm']),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

export default CustomDialog
