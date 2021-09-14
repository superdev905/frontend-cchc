import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import {
  GetAppOutlined as DownloadIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon
} from '@material-ui/icons'
import PDFIcon from './pdf.png'
import PictureIcon from './picture.png'

const useStyles = makeStyles(() => ({
  center: {
    display: 'flex',
    alignItems: 'center'
  },
  fileName: {
    fontSize: 15
  },
  icon: {
    width: 45
  },
  root: {
    backgroundColor: '#f5f6f8'
  },
  paper: {
    backgroundColor: '#f5f6f8',
    display: 'flex',
    justifyContent: 'space-between'
  }
}))
const PDFCard = ({ fileName, onDelete, onView, onDownload }) => {
  const classes = useStyles()

  const getFileName = (url) => url.split('/').pop()

  const getIcon = (filename) => {
    const ext = filename.split('.').pop()
    if (ext === 'pdf') return PDFIcon
    return PictureIcon
  }

  return (
    <Box className={classes.root}>
      <Box p={2} className={classes.paper}>
        <Box className={classes.center}>
          <img
            alt="pdf-icon"
            src={getIcon(fileName)}
            className={classes.icon}
          />
          <Typography className={classes.fileName}>
            {getFileName(fileName)}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          {onView && (
            <IconButton onClick={onView}>
              <ViewIcon />
            </IconButton>
          )}
          {onDelete && (
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          )}
          {onDownload && (
            <IconButton onClick={onDownload}>
              <DownloadIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default PDFCard
