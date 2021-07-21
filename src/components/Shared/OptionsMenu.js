import clsx from 'clsx'
import { ListItemIcon, makeStyles, Menu, MenuItem } from '@material-ui/core'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  itemRoot: {
    fontSize: 14
  },
  deleteRoot: {
    color: theme.palette.error.main
  },
  iconRoot: {
    minWidth: 0,
    paddingRight: 10
  },
  delete: {
    color: theme.palette.error.main
  }
}))

const OptionsMenu = ({ open, anchorEl, onClose, onEdit, onDelete }) => {
  const classes = useStyles()
  return (
    <Menu open={open} onClose={onClose} anchorEl={anchorEl} elevation={2}>
      {onEdit && (
        <MenuItem
          className={classes.itemRoot}
          onClick={() => {
            onClose()
            onEdit()
          }}
        >
          <ListItemIcon className={classes.iconRoot}>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Editar
        </MenuItem>
      )}
      {onDelete && (
        <MenuItem
          className={clsx(classes.itemRoot, classes.deleteRoot)}
          onClick={() => {
            onClose()
            onDelete()
          }}
        >
          <ListItemIcon className={classes.iconRoot}>
            <DeleteIcon className={classes.delete} fontSize="small" />
          </ListItemIcon>
          Eliminar
        </MenuItem>
      )}
    </Menu>
  )
}
export default OptionsMenu
