import { FiCheck as IconCheck, FiTrash2 as IconDelete } from 'react-icons/fi'
import {
  Avatar,
  Box,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import { Button } from '../../UI'

const useStyles = makeStyles((theme) => ({
  root: ({ selectable, option }) => ({
    position: 'relative',
    marginBottom: theme.spacing(2),
    borderRadius: 5,
    border: `1px solid ${theme.palette.gray.gray600}`,
    cursor: selectable && !option.isAdded ? 'pointer' : 'inherit',
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

const EmployeeRow = ({
  option,
  onClick,
  selectable,
  onDelete,
  customComponent
}) => {
  const classes = useStyles({ selectable, option })
  return (
    <Box
      p={1}
      className={classes.root}
      onClick={!option?.isAdded ? onClick : null}
    >
      <Box display="flex" alignItems="center">
        <Avatar style={{ backgroundColor: option.avatarBg }}>
          {option.names.charAt(0)}
        </Avatar>
        <Box pl={1}>
          <Typography
            style={{
              fontWeight: 'bold'
            }}
          >{`${option.names} ${
            option?.paternal_surname || option?.paternalSurname || ''
          } ${
            option.maternal_surname || option.maternalSurname || ''
          }`}</Typography>
          <Typography style={{ fontSize: 14 }}>{`Rut: ${
            option.run || 'Sin rut'
          }`}</Typography>
        </Box>
      </Box>
      {selectable ? (
        <Button
          size="small"
          startIcon={<IconCheck />}
          disabled={option.isAdded}
        >
          Seleccionar
        </Button>
      ) : (
        <>
          {onDelete && (
            <IconButton onClick={onDelete}>
              <IconDelete className={classes.deleteIcon} />
            </IconButton>
          )}
          {customComponent}
        </>
      )}
    </Box>
  )
}

export default EmployeeRow
