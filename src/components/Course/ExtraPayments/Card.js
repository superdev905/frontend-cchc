import { FiTrash2 as DeleteIcon } from 'react-icons/fi'
import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { FileThumbnail } from '../../Shared'
import { formatDate, formatHours } from '../../../formatters'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    border: `1px solid ${theme.palette.common.black}`,
    marginBottom: 10
  },
  paper: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    position: 'relative'
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5
  },
  deleteIcon: {
    color: theme.palette.error.main
  },
  date: {
    fontSize: 15,
    marginBottom: 5
  },
  info: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  dateLoader: {
    marginBottom: 15,
    width: '30%'
  },
  thumbnailLoader: {
    height: 60,
    width: '100%',
    transform: 'none'
  }
}))

const Loader = () => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.paper}>
        <Skeleton className={classes.dateLoader}></Skeleton>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Skeleton width="30%"></Skeleton>
            <Skeleton className={classes.thumbnailLoader}></Skeleton>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box>
              <Skeleton width="20%"></Skeleton>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Skeleton className={classes.thumbnailLoader}></Skeleton>
              </Grid>
              <Grid item xs={12} md={6}>
                <Skeleton className={classes.thumbnailLoader}></Skeleton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

const ExtraPaymentCard = ({ payment, onView, onDelete, onDownload }) => {
  const classes = useStyles()
  return (
    <Grid item md={6} className={classes.root}>
      <Box className={classes.paper}>
        <Box marginBottom={3}>
          <Typography className={classes.date}>
            {`${formatDate(new Date(payment.date))}- ${formatHours(
              new Date(payment.date)
            )}`}
          </Typography>
        </Box>
        <IconButton className={classes.deleteButton} onClick={onDelete}>
          <DeleteIcon className={classes.deleteIcon} />
        </IconButton>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography className={classes.info}>
                  Item : {payment.item}
                </Typography>
                <Typography className={classes.info}>
                  {payment.amount}
                </Typography>
              </Box>
              <FileThumbnail
                fileName={payment.file.fileName}
                date={new Date(payment.file.uploadDate)}
                fileSize={payment.file.fileSize}
                onView={() => {
                  onView(payment.file)
                }}
                onDownload={() => {
                  onDownload(payment.file)
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  )
}

ExtraPaymentCard.Loader = Loader

export default ExtraPaymentCard
