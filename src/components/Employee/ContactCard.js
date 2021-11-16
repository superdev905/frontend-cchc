import clsx from 'clsx'
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import { LabeledRow, Text } from '../UI'
import { SantiagoDefaultLocation } from '../../config'
import { Map } from '../Shared'

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative'
  },
  btnMore: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
}))

const ContactCard = ({ contact, loading, onEdit, onDelete, index }) => {
  const classes = useStyles()

  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={12} lg={7}>
          <Card
            className={clsx(
              classes.root,
              contact.state === 'DELETED' && classes.deleted
            )}
          >
            <Box
              p={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography className={classes.title}>
                Informacion de contacto #{index}
              </Typography>
              <Box>
                <IconButton onClick={onEdit}>
                  <Edit />
                </IconButton>
                <IconButton onClick={onDelete}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
            <CardContent>
              <Box>
                <LabeledRow label="Dirección">
                  <Text loading={loading}>{contact?.address}</Text>
                </LabeledRow>
                <LabeledRow label="Número">
                  <Text loading={loading}>{contact?.number}</Text>
                </LabeledRow>
                <LabeledRow label="Región">
                  <Text loading={loading}>{contact?.region?.name}</Text>
                </LabeledRow>
                <LabeledRow label="Comuna">
                  <Text loading={loading}>{contact?.commune?.name}</Text>
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
                <LabeledRow label="Dueño de contacto">
                  <Text loading={loading}>{contact?.phone_owner}</Text>
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
        </Grid>
        <Grid item xs={12} lg={5}>
          <Map
            height="100%"
            width="100%"
            latitude={
              contact ? contact.latitude : SantiagoDefaultLocation.latitude
            }
            longitude={
              contact ? contact.longitude : SantiagoDefaultLocation.longitude
            }
            showMarkers={Boolean(contact.latitude && contact.longitude)}
            markers={[
              {
                address: contact.address,
                latitude: contact.latitude,
                longitude: contact.longitude
              }
            ]}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ContactCard
