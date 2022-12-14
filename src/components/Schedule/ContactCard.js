import { FiEdit as EditIcon } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { Avatar, Box, Grid, IconButton, makeStyles } from '@material-ui/core'
import contactActions from '../../state/actions/contact'
import { useToggle } from '../../hooks'
import { ContactModal } from '../Contacts'
import { EmptyState, LabeledRow } from '../UI'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F6F4FF',
    borderRadius: theme.spacing(1),
    position: 'relative'
  },
  actions: {
    position: 'absolute',
    top: 5,
    right: 5,
    '& button': {
      color: theme.palette.primary.main
    }
  },
  avatar: {
    height: 100,
    width: 100,
    backgroundColor: '#DAD3FE',
    color: '#6353BA',
    fontSize: 40,
    fontWeight: 'bold'
  }
}))

const ContactCard = ({
  contact,
  onEdit,
  emptyMessage,
  businessId,
  onSuccessFunction
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { open, toggleOpen } = useToggle()
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()

  const updateContact = (values) =>
    dispatch(
      contactActions.updateContact(contact.id, {
        ...values,
        state: contact.state,
        email: values.email.toLowerCase(),
        business_id: parseInt(contact.business_id, 10)
      })
    )

  const createContact = (values) =>
    dispatch(
      contactActions.createContact({
        ...values,
        email: values.email.toUpperCase(),
        business_id: parseInt(businessId, 10)
      })
    )

  return (
    <Box p={2} className={classes.root}>
      {!contact ? (
        <>
          <EmptyState
            message={emptyMessage}
            actionMessage="Crear contacto"
            event={toggleOpenAdd}
          />
          {openAdd && (
            <ContactModal
              open={openAdd}
              includeInterlocutor
              submitFunction={createContact}
              successFunc={(res) => {
                if (onSuccessFunction) {
                  onSuccessFunction(res)
                }
              }}
              onClose={toggleOpenAdd}
              interlocutorAsDefault
              successMessage="Interlocutor creado"
            />
          )}
        </>
      ) : (
        <>
          <Box className={classes.actions}>
            {onEdit && (
              <IconButton onClick={toggleOpen}>
                <EditIcon />
              </IconButton>
            )}
          </Box>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={3}>
              <Box display="flex" justifyContent="center">
                <Avatar className={classes.avatar}>
                  {contact.full_name.charAt(0).toUpperCase()}
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <LabeledRow label="Nombres">{contact.full_name}</LabeledRow>
              <LabeledRow label="Correo">{contact.email}</LabeledRow>
              <LabeledRow label="Cargo">{contact.charge_name}</LabeledRow>
              <LabeledRow label="Telefono">
                {contact.cell_phone || '---'}
              </LabeledRow>
              <LabeledRow label="T??lefono Oficina">
                {contact.office_phone || '---'}
              </LabeledRow>
              <LabeledRow label="Otro T??lefono">
                {contact.other_phone || '---'}
              </LabeledRow>
            </Grid>
          </Grid>

          {open && (
            <ContactModal
              type={'UPDATE'}
              open={open}
              data={contact}
              includeInterlocutor
              submitFunction={updateContact}
              onClose={toggleOpen}
              successMessage="Interlocutor actualizado"
              successFunc={(updatedContact) => {
                if (onSuccessFunction) {
                  onSuccessFunction(updatedContact)
                }
              }}
            />
          )}
        </>
      )}
    </Box>
  )
}
export default ContactCard
