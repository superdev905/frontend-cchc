import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { useSuccess, useToggle } from '../../hooks'
import { ContactCard, ContactModal } from '../Contacts'
import { Button, EmptyState, Wrapper } from '../UI'
import { ConfirmDelete } from '../Shared'
import contactActions from '../../state/actions/contact'

const Contacts = () => {
  const dispatch = useDispatch()
  const { company } = useSelector((state) => state.companies)
  const [deleting, setDeleting] = useState(false)
  const { success, changeSuccess } = useSuccess()
  const [currentContact, setCurrentContact] = useState(null)
  const { open: openCreate, toggleOpen: toggleOpenCreate } = useToggle()
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const handleContactDelete = (id) => {
    setDeleting(true)
    dispatch(contactActions.deleteContact(id))
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        toggleOpenDelete()
      })
      .catch(() => {
        setDeleting(false)
      })
  }
  return (
    <Box>
      <Wrapper>
        <Box display="flex" justifyContent="space-between">
          <Typography>Contactos</Typography>
          <Button onClick={toggleOpenCreate}>Crear nuevo</Button>
        </Box>
        <Box>
          {
            <ContactCard.Container>
              {company?.contacts.map((item) => (
                <ContactCard
                  key={`contact-card-${item.id}`}
                  contact={item}
                  onEdit={() => {
                    toggleOpenUpdate()
                    setCurrentContact(item)
                  }}
                  onDelete={() => {
                    toggleOpenDelete()
                    setCurrentContact(item)
                  }}
                />
              ))}
            </ContactCard.Container>
          }
          {company?.contacts.length === 0 && (
            <EmptyState message="No hay contactos registrados" />
          )}
        </Box>

        <ContactModal open={openCreate} onClose={toggleOpenCreate} />
        {currentContact && openUpdate && (
          <ContactModal
            open={openUpdate}
            onClose={toggleOpenUpdate}
            type="UPDATE"
            contact={currentContact}
          />
        )}
        {currentContact && openDelete && (
          <ConfirmDelete
            open={openDelete}
            onClose={toggleOpenDelete}
            message={
              <span>
                ¿Estás seguro de eliminar a{' '}
                <strong>{currentContact.full_name}</strong> como contacto?
              </span>
            }
            loading={deleting}
            success={success}
            onConfirm={() => handleContactDelete(currentContact.id)}
          />
        )}
      </Wrapper>
    </Box>
  )
}

Contacts.propTypes = {}

export default Contacts
