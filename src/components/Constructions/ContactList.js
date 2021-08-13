import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import constructionsActions from '../../state/actions/constructions'
import { Button, EmptyState, Wrapper } from '../UI'
import { ContactCard, ContactModal } from '../Contacts'
import { useToggle } from '../../hooks'
import { ConfirmDelete } from '../Shared'

const ContactList = ({ ...props }) => {
  const dispatch = useDispatch()
  const { idConstruction } = props.match.params
  const [currentContact, setCurrentContact] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const { contacts, construction } = useSelector((state) => state.constructions)
  const { open, toggleOpen } = useToggle()
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const fetchContacts = () => {
    dispatch(constructionsActions.getContacts(idConstruction))
  }

  const onCreateContact = (values) =>
    dispatch(
      constructionsActions.createContact({
        ...values,
        construction_id: parseInt(idConstruction, 10)
      })
    )

  const onEditContact = (values) =>
    dispatch(
      constructionsActions.updateContact(currentContact.id, {
        ...values,
        state: currentContact.state,
        construction_id: parseInt(idConstruction, 10)
      })
    )

  const deleteContact = (id) => {
    setDeleting(true)
    dispatch(constructionsActions.patchContact(id, { state: 'DELETED' }))
      .then(() => {
        setDeleting(false)
        toggleOpenDelete()
        fetchContacts()
      })
      .catch(() => {
        setDeleting(false)
      })
  }

  useEffect(() => {
    fetchContacts()
  }, [])
  return (
    <Wrapper>
      <Box display="flex" justifyContent="space-between">
        <Typography style={{ fontSize: 18, fontWeight: 'bold' }}>
          Contactos de obra
        </Typography>
        <Button
          disabled={construction?.status === 'NO_VIGENTE'}
          onClick={toggleOpen}
        >
          Nuevo contacto
        </Button>
      </Box>

      {contacts.length === 0 ? (
        <EmptyState message="Esta obra no tiene contactos" />
      ) : (
        <ContactCard.Container>
          {contacts
            .map((item) => ({ ...item, charge: item.charge.name }))
            .map((item) => (
              <ContactCard
                key={`contact-i-${item.id}`}
                contact={item}
                onDelete={() => {
                  toggleOpenDelete()
                  setCurrentContact(item)
                }}
                onEdit={() => {
                  toggleOpenUpdate()
                  setCurrentContact(item)
                }}
              />
            ))}
        </ContactCard.Container>
      )}

      <ContactModal
        open={open}
        onClose={toggleOpen}
        submitFunction={onCreateContact}
        successFunc={fetchContacts}
        successMessage="Contacto de obra creado con éxito"
      />
      {currentContact && openUpdate && (
        <ContactModal
          data={currentContact}
          type="UPDATE"
          open={openUpdate}
          onClose={toggleOpenUpdate}
          submitFunction={onEditContact}
          successFunc={fetchContacts}
          successMessage="Contacto de obra actualizado con éxito"
        />
      )}
      {currentContact && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          message={
            <span>
              ¿Estás seguro de eliminar a{' '}
              <strong>{currentContact.full_name}</strong>?
            </span>
          }
          loading={deleting}
          onConfirm={() => deleteContact(currentContact.id)}
        />
      )}
    </Wrapper>
  )
}

export default withRouter(ContactList)
