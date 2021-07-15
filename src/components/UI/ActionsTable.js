import PropTypes from 'prop-types'
import { Box, IconButton, makeStyles } from '@material-ui/core'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon
} from '@material-ui/icons/'

const useStyles = makeStyles((theme) => ({
  root: {
    '& button': {
      padding: 10
    }
  },
  btnPrimary: {
    color: theme.palette.primary.main
  },
  btnDelete: {
    color: theme.palette.error.main
  }
}))

const ActionGroup = ({ onEdit, onDelete, onView }) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      {onEdit && (
        <IconButton onClick={onEdit}>
          <EditIcon className={classes.btnPrimary} />
        </IconButton>
      )}
      {onView && (
        <IconButton onClick={onView}>
          <ViewIcon className={classes.btnPrimary} />
        </IconButton>
      )}
      {onDelete && (
        <IconButton onClick={onDelete}>
          <DeleteIcon className={classes.btnDelete} />
        </IconButton>
      )}
    </Box>
  )
}

ActionGroup.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

export default ActionGroup
