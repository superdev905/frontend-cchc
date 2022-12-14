import { FiCheck as IconCheck, FiTrash2 as IconDelete } from 'react-icons/fi'
import {
  Avatar,
  Box,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import { Button } from '../UI'

const useStyles = makeStyles((theme) => ({
  root: ({ selectable }) => ({
    position: 'relative',
    marginBottom: theme.spacing(2),
    borderRadius: 5,
    border: `1px solid ${theme.palette.gray.gray600}`,
    cursor: selectable ? 'pointer' : 'inherit',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }),
  button: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  deleteIcon: {
    color: theme.palette.error.main
  }
}))

const ContactRow = ({ option, onClick, selectable, onDelete }) => {
  const classes = useStyles({ selectable })
  return (
    <Box p={1} className={classes.root} onClick={onClick}>
      <Box display="flex" alignItems="center">
        <Avatar style={{ backgroundColor: option.avatarBg }}>
          {option.full_name.charAt(0)}
        </Avatar>
        <Box pl={1}>
          <Typography
            style={{
              fontWeight: 'bold'
            }}
          >{`${option.full_name}`}</Typography>
          <Typography style={{ fontSize: 14 }}>{`Cargo: ${
            option.charge_name || 'Sin Cargo'
          }`}</Typography>
        </Box>
      </Box>
      {selectable ? (
        <Button size="small" startIcon={<IconCheck />}>
          Seleccionar
        </Button>
      ) : (
        <IconButton onClick={onDelete}>
          <IconDelete className={classes.deleteIcon} />
        </IconButton>
      )}
    </Box>
  )
}

export default ContactRow
