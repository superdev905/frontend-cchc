import {
  Box,
  Grid,
  Typography,
  makeStyles,
  IconButton,
  Card,
  CardContent,
  Menu,
  MenuItem
} from '@material-ui/core'
import {
  MoreHoriz as MoreIcon,
  CalendarToday as CalendarIcon
} from '@material-ui/icons'
import { useMenu } from '../../hooks'

const Container = ({ children }) => (
  <Grid container spacing={2}>
    {children}
  </Grid>
)

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    borderRadius: 5
  },
  btnWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    '& button': {
      padding: 3
    }
  }
}))

const ContactCard = ({ contact, onEdit, onDelete }) => {
  const classes = useStyles()
  const { open, anchorEl, handleOpen, handleClose } = useMenu()
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardContent>
          <Box className={classes.root}>
            <Box className={classes.btnWrapper}>
              <IconButton onClick={handleOpen}>
                <MoreIcon />
              </IconButton>
            </Box>
            <Typography style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {contact.full_name}
            </Typography>
            <Typography style={{ fontSize: '14px' }}>
              <CalendarIcon style={{ fontSize: '14px', marginRight: '8px' }} />
              {new Date(contact.created_at).toLocaleDateString('es-CL', {
                dateStyle: 'long'
              })}
            </Typography>
            <Box marginTop="10px">
              <Typography>Correo: {contact.email}</Typography>
              <Typography>Cargo: {contact.charge}</Typography>
              <Typography>Télefono: {contact.cell_phone}</Typography>
              <Typography>Télefono Oficina: {contact.office_phone}</Typography>
              <Typography>Otro Télefono: {contact.other_phone}</Typography>
            </Box>
          </Box>
        </CardContent>
        <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
          <MenuItem
            onClick={() => {
              handleClose()
              onEdit()
            }}
          >
            Editar
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose()
              onDelete()
            }}
          >
            Eliminar
          </MenuItem>
        </Menu>
      </Card>
    </Grid>
  )
}

ContactCard.Container = Container

export default ContactCard
