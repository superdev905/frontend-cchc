import {
  Box,
  Grid,
  Typography,
  makeStyles,
  IconButton,
  Card,
  CardContent,
  Chip
} from '@material-ui/core'
import {
  MoreHoriz as MoreIcon,
  CalendarToday as CalendarIcon
} from '@material-ui/icons'
import { capitalize } from 'lodash'
import { useMenu } from '../../hooks'
import { OptionsMenu } from '../Shared'

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

            <Typography
              style={{
                textTransform: 'uppercase',
                fontSize: '18px',
                fontWeight: 'bold'
              }}
            >
              {contact.full_name}
            </Typography>
            <Typography
              style={{
                fontSize: '14px'
              }}
            >
              <CalendarIcon style={{ fontSize: '14px', marginRight: '8px' }} />
              {new Date(contact.created_at).toLocaleDateString('es-CL', {
                dateStyle: 'long'
              })}
            </Typography>
            <Box marginTop="10px" style={{ textTransform: 'uppercase' }}>
              {contact?.is_interlocutor && (
                <Chip color="primary" label="Interlocutor válido" />
              )}
              <Typography>Correo: {contact.email}</Typography>
              <Typography>
                Cargo: {capitalize(contact?.charge_name) || ''}
              </Typography>
              <Typography>Télefono: {contact.cell_phone || '---'}</Typography>
              <Typography>
                Télefono Oficina: {contact.office_phone || '---'}
              </Typography>
              <Typography>
                Otro Télefono: {contact.other_phone || '---'}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <OptionsMenu
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Card>
    </Grid>
  )
}

ContactCard.Container = Container

export default ContactCard
