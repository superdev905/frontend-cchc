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

const ContactCard = ({ contact, loading, onEdit, onDelete }) => {
  const classes = useStyles()

  return (
    <Grid item xs={12} md={6}>
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
            Informacion de contacto #{contact?.id}
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
    </Grid>
  )
}

export default ContactCard
