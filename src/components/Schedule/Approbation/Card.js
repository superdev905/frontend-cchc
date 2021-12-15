import { FiEdit as EditIcon } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import files from '../../../state/actions/files'
import { formatDate } from '../../../formatters'
import { useToggle } from '../../../hooks'
import { FileThumbnail } from '../../Shared'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.gray.gray100,
    position: 'relative'
  },
  date: {
    fontSize: 15,
    opacity: 0.8
  },
  iconButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
    padding: theme.spacing(1),
    color: theme.palette.primary.main
  },
  label: {
    fontSize: 14
  },
  info: {
    fontWeight: 'bold'
  },
  status: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    backgroundColor: theme.palette.common.white,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18
  }
}))

const Card = ({ data, onEdit }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  return (
    <Box className={classes.root} p={2}>
      <Box>
        {onEdit && (
          <IconButton onClick={onEdit} className={classes.iconButton}>
            <EditIcon />
          </IconButton>
        )}
        <Box mb={1}>
          <Typography className={classes.date}>
            {`${formatDate(new Date(data.date))}`}
          </Typography>
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={9}>
              <Box>
                <Typography className={classes.label}>Modalidad</Typography>
                <Typography className={classes.info}>
                  {data.modality}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box>
                <Typography align="center" className={classes.label}>
                  Estado
                </Typography>

                <Typography component="div" className={classes.status}>
                  {data.status}
                </Typography>
              </Box>
            </Grid>
            <Box>
              <Typography className={classes.label}>Observaciones</Typography>
              <Typography className={classes.info}>
                {data.observation}
              </Typography>
            </Box>
          </Grid>
          <Box>
            {data?.attachment && (
              <FileThumbnail
                ileName={data.attachment.fileName}
                date={data.attachment.uploadDate}
                fileSize={data.attachment.fileSize}
                label={data.attachment.module}
                onView={() => {
                  toggleOpenVisor()
                }}
                onDownload={() => {
                  dispatch(
                    files.downloadFile(
                      data.attachment.fileUrl,
                      data.attachment.fileName
                    )
                  )
                }}
              />
            )}
          </Box>
        </Box>
        {data?.attachment && openVisor && (
          <FileVisor
            open={openVisor}
            onClose={toggleOpenVisor}
            filename={data.attachment.fileName}
            src={data.attachment.fileUrl}
          />
        )}
      </Box>
    </Box>
  )
}

export default Card
