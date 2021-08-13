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

const ActionGroup = ({
  onEdit,
  onDelete,
  disabledDelete,
  onView,
  moreOptions
}) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      {moreOptions.map((item, index) => (
        <IconButton
          disabled={item.disabled}
          key={`more-table-option-${index}`}
          onClick={item.onClick}
        >
          {item.icon}
        </IconButton>
      ))}
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
        <IconButton onClick={onDelete} disabled={disabledDelete}>
          <DeleteIcon className={classes.btnDelete} />
        </IconButton>
      )}
    </Box>
  )
}

ActionGroup.defaultProps = {
  moreOptions: [],
  disabledDelete: false
}

ActionGroup.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

export default ActionGroup
