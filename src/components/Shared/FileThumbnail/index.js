import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'
import {
  FiDownloadCloud as DownloadIcon,
  FiEye as ViewIcon
} from 'react-icons/fi'
import { formatDate } from '../../../formatters'
import PDFIcon from './pdf.png'
import PictureIcon from './picture.png'

const useStyles = makeStyles((theme) => ({
  center: {
    display: 'flex',
    alignItems: 'center'
  },
  fileName: {
    fontSize: 16
  },
  info: {
    fontSize: 13
  },
  icon: {
    width: 35
  },
  paper: ({ bgWhite }) => ({
    backgroundColor: bgWhite ? theme.palette.common.white : '#f5f6f8',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 5
  })
}))
const PDFCard = ({
  fileName,
  date,
  fileSize,
  onDelete,
  onView,
  onDownload,
  bgWhite
}) => {
  const classes = useStyles({ bgWhite })

  const getFileName = (url) => url.split('/').pop()

  const getIcon = (filename) => {
    const ext = filename.split('.').pop()
    if (ext === 'pdf') return PDFIcon
    return PictureIcon
  }

  return (
    <Box>
      <Box p={2} className={classes.paper}>
        <Box className={classes.center}>
          <img
            alt="pdf-icon"
            src={getIcon(fileName)}
            className={classes.icon}
          />
          <Box marginLeft="10px">
            <Typography className={classes.fileName}>
              {getFileName(fileName)}
            </Typography>

            <Typography className={classes.info}>
              {`${date && formatDate(date)} - ${fileSize || ''}`}
            </Typography>
          </Box>
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

PDFCard.defaultProps = {
  bgWhite: false
}

export default PDFCard
