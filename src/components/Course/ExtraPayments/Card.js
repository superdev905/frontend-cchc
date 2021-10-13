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
import { formatDate, formatCurrency } from '../../../formatters'

const Container = ({ children }) => (
  <Grid container spacing={2}>
    {children}
  </Grid>
)

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    border: `1px solid ${theme.palette.common.black}`,
    marginBottom: 10,
    height: 200,
    flexDirection: 'column',
    justifyContent: 'flex-end',
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
  },
  itemLoader: {
    marginBottom: 10,
    width: '40%'
  }
}))

const Loader = ({ size = 6 }) => {
  const classes = useStyles()
  return (
    <Grid item xs={12} md={size} lg={size}>
      <Box className={classes.root} p={2}>
        <Skeleton className={classes.dateLoader} />
        <Skeleton className={classes.itemLoader} />
        <Skeleton className={classes.thumbnailLoader} />
      </Box>
    </Grid>
  )
}

const ExtraPaymentCard = ({ payment, onView, onDelete, onDownload, size }) => {
  const classes = useStyles()
  return (
    <Grid item xs={12} md={size} lg={size}>
      <Box p={2} className={classes.root}>
        <Box marginBottom={3}>
          <Typography className={classes.date}>
            {formatDate(new Date(payment.date))}
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
                  {formatCurrency(payment.amount)}
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

ExtraPaymentCard.defaultProps = {
  size: 6
}

ExtraPaymentCard.Container = Container
ExtraPaymentCard.Loader = Loader

export default ExtraPaymentCard
