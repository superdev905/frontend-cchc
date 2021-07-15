import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import constructionsActions from '../../state/actions/constructions'
import { Button, Wrapper } from '../UI'
import { ContactCard } from '../Contacts'
import ContactModal from './ContactModal'
import { useToggle } from '../../hooks'
import { ConfirmDelete } from '../Shared'

const ContactList = ({ ...props }) => {
  const dispatch = useDispatch()
  const { idConstruction } = props.match.params
  const [currentContact, setCurrentContact] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const { contacts } = useSelector((state) => state.constructions)
  const { open, toggleOpen } = useToggle()
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const fetchContacts = () => {
    dispatch(constructionsActions.getContacts(idConstruction))
  }

  const deleteContact = (id) => {
    setDeleting(true)
    dispatch(constructionsActions.deleteContact(id))
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
        <Typography>Contactos de obra</Typography>
        <Button onClick={toggleOpen}>Nuevo contacto</Button>
      </Box>

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
      <ContactModal
        open={open}
        onClose={toggleOpen}
        idConstruction={idConstruction}
        successFunc={fetchContacts}
      />
      {currentContact && openUpdate && (
        <ContactModal
          contact={currentContact}
          type="UPDATE"
          open={openUpdate}
          onClose={toggleOpenUpdate}
          idConstruction={idConstruction}
          successFunc={fetchContacts}
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
