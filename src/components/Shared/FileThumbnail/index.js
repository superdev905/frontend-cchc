import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'
import {
  FiDownloadCloud as DownloadIcon,
  FiEye as ViewIcon
} from 'react-icons/fi'
import { RiEdit2Fill } from 'react-icons/ri'
import { formatDate } from '../../../formatters'
import PDFIcon from './pdf.png'
import PictureIcon from './picture.png'
import Loader from './Loader'

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
  label: {
    fontSize: 12,
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    opacity: 0.9,
    textTransform: 'uppercase'
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
  label,
  onDelete,
  onView,
  onDownload,
  onEdit,
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
            {label && (
              <Typography className={classes.label}>{label}</Typography>
            )}
            <Typography className={classes.fileName}>
              {getFileName(fileName)}
            </Typography>

            <Typography className={classes.info}>
              {date &&
                fileSize &&
                `${date && formatDate(date)} - ${fileSize || ''}`}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          {onView && (
            <IconButton onClick={onView}>
              <ViewIcon />
            </IconButton>
          )}
          {onEdit && (
            <IconButton onClick={onEdit}>
              <RiEdit2Fill />
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

PDFCard.Loader = Loader

export default PDFCard
