import { FiEdit2 as EditIcon } from 'react-icons/fi'
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import { formatCurrency, formatDate } from '../../../formatters'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.gray.gray100,
    borderRadius: theme.spacing(1),
    position: 'relative'
  },
  icon: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: theme.spacing(1),
    color: theme.palette.primary.main
  },
  date: {
    fontSize: 14
  }
}))

const SavingCard = ({ diagnostic, onEdit }) => {
  const classes = useStyles()
  return (
    <Box p={2} className={classes.root}>
      {onEdit && (
        <IconButton onClick={onEdit} className={classes.icon}>
          <EditIcon />
        </IconButton>
      )}
      <Box mb={1}>
        <Typography className={classes.date}>{`${formatDate(
          new Date(diagnostic.createdDate),
          {}
        )}`}</Typography>
      </Box>
      <Box>
        <Typography>{`RSH: ${diagnostic.rshId}`}</Typography>
        <Typography>{`Ahorro : ${formatCurrency(
          diagnostic.salary
        )}`}</Typography>
      </Box>
    </Box>
  )
}

export default SavingCard
