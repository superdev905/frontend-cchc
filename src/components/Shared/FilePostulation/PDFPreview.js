import { Box, IconButton, Typography } from '@material-ui/core'
import {
  Delete as DeleteIcon,
  Visibility as ViewIcon
} from '@material-ui/icons'
import useStyles from './styles'
import pdfIcon from '../FileThumbnail/pdf.png'

const FilePostulation = ({ onRemove, onView, bgWhite, fileName, fileSize }) => {
  const classes = useStyles({ bgWhite })

  return (
    <Box>
      <Box className={classes.previewWrapper} p={2}>
        <Box className={classes.actions}>
          <IconButton color="primary" onClick={onView}>
            <ViewIcon />
          </IconButton>
          <IconButton onClick={onRemove}>
            <DeleteIcon className={classes.removeIcon} />
          </IconButton>
        </Box>
        <Box mt={2}>
          <Box textAlign="center">
            <img src={pdfIcon} className={classes.pdfIcon} />
            <Typography align="center"> {fileName}</Typography>
          </Box>
          <Typography className={classes.fileSize}>{fileSize}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default FilePostulation
