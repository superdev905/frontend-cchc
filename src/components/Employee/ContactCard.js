import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useMenu } from '../../hooks'
import { OptionsMenu } from '../Shared'
import { LabeledRow, Text } from '../UI'

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative'
  },
  btnMore: {
    position: 'absolute',
    top: 15,
    right: 15
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
}))

const ContactCard = ({ contact, loading }) => {
  const classes = useStyles()
  const { open, anchorEl, handleOpen, handleClose } = useMenu()
  return (
    <Grid item xs={12} md={6}>
      <Card className={classes.root}>
        <IconButton className={classes.btnMore} onClick={handleOpen}>
          <MoreVertIcon />
        </IconButton>
        <CardContent>
          <Box>
            <Typography className={classes.title}>
              Informacion de contacto #{contact?.id}
            </Typography>
            <LabeledRow label="Dirección">
              <Text loading={loading}>{contact?.address}</Text>
            </LabeledRow>
            <LabeledRow label="Número">
              <Text loading={loading}>{contact?.number}</Text>
            </LabeledRow>
            <LabeledRow label="Región">
              <Text loading={loading}>{contact?.number}</Text>
            </LabeledRow>
            <LabeledRow label="Comuna">
              <Text loading={loading}>{contact?.number}</Text>
            </LabeledRow>
            <LabeledRow label="Correo">
              <Text loading={loading}>{contact?.email}</Text>
            </LabeledRow>
            <LabeledRow label="Nombre de la villa o cojunto habitacional">
              <Text loading={loading}>{contact?.housing_group}</Text>
            </LabeledRow>
            <LabeledRow label="Departamento">
              <Text loading={loading}>{contact?.department}</Text>
            </LabeledRow>
            <LabeledRow label="Correo">
              <Text loading={loading}>{contact?.email}</Text>
            </LabeledRow>
            <LabeledRow label="Telefóno móvil">
              <Text loading={loading}>{contact?.mobile_phone}</Text>
            </LabeledRow>
            <LabeledRow label="Telefóno fijo">
              <Text loading={loading}>{contact?.landline_phone}</Text>
            </LabeledRow>
            <LabeledRow label="Otro telefóno">
              <Text loading={loading}>{contact?.other_phone}</Text>
            </LabeledRow>
          </Box>
        </CardContent>
      </Card>
      <OptionsMenu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </Grid>
  )
}

export default ContactCard
