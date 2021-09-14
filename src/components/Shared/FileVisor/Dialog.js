import PropTypes from 'prop-types'
import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import useStyles from './styles'

const FileDialog = ({ open, onClose, fileName, children, onDownload }) => {
  const classes = useStyles()
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={true}
      classes={{ paper: classes.modalRoot }}
    >
      <Box p={2} className={classes.bar}>
        <Typography>{fileName}</Typography>
        <Grid>
          <IconButton onClick={onDownload}>
            <DownloadIcon className={classes.icon} />
          </IconButton>
          <IconButton onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        </Grid>
      </Box>
      <DialogContent
        className={classes.content}
        classes={{ root: classes.contentPaper }}
      >
        <Box className={classes.body}>{children}</Box>
      </DialogContent>
    </Dialog>
  )
}
FileDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  fileName: PropTypes.string
}

export default FileDialog
