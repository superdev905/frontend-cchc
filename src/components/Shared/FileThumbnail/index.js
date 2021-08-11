import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
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
  }
}))
const PDFCard = ({ fileName, onDelete, onView, onDownload }) => {
  const classes = useStyles()

  const getIcon = (filename) => {
    const ext = filename.split('.').pop()
    if (ext === 'pdf') return PDFIcon
    return PictureIcon
  }

  return (
    <Box p={2} style={{ backgroundColor: '#f5f6f8' }}>
      <Grid container>
        <Grid item xs={2}>
          <img
            alt="pdf-icon"
            src={getIcon(fileName)}
            style={{ width: '50px' }}
          />
        </Grid>
        <Grid item xs={8} className={classes.center}>
          <Box p={2} className={classes.center}>
            <Typography className={classes.fileName}>{fileName}</Typography>
          </Box>
        </Grid>
        <Grid item xs={2} className={classes.center}>
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
        </Grid>
      </Grid>
    </Box>
  )
}

PDFCard.propTypes = {}

export default PDFCard
