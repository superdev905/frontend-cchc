import { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { useSuccess, useToggle } from '../../hooks'
import { ContactCard, ContactModal } from '../Contacts'
import { Button, EmptyState, Wrapper } from '../UI'
import { ConfirmDelete } from '../Shared'
import contactActions from '../../state/actions/contact'
import companyActions from '../../state/actions/companies'
import useStyles from './styles'

const Contacts = ({ ...props }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { idCompany } = props.match.params
  const { contacts, company } = useSelector((state) => state.companies)
  const [deleting, setDeleting] = useState(false)
  const { success, changeSuccess } = useSuccess()
  const [currentContact, setCurrentContact] = useState(null)
  const { open: openCreate, toggleOpen: toggleOpenCreate } = useToggle()
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const onCrateContact = (values) =>
    dispatch(
      contactActions.createContact({
        ...values,
        email: values.email.toLowerCase(),
        business_id: parseInt(idCompany, 10)
      })
    )

  const fetchContacts = () => {
    dispatch(companyActions.getContacts(idCompany))
  }

  const onEditContact = (values) =>
    dispatch(
      contactActions.updateContact(currentContact.id, {
        ...values,
        state: currentContact.state,
        email: values.email.toLowerCase(),
        business_id: parseInt(idCompany, 10)
      })
    )

  const handleContactDelete = (id) => {
    setDeleting(true)
    dispatch(contactActions.patchContact(id, { state: 'DELETED' }))
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        toggleOpenDelete()
        fetchContacts()
        enqueueSnackbar('El contacto fue eliminado', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setDeleting(false)
      })
  }

  useEffect(() => {
    fetchContacts()
  }, [])
  return (
    <Box>
      <Wrapper>
        <Box display="flex" justifyContent="space-between">
          <Typography className={classes.heading}>Contactos</Typography>
          <Button
            disabled={company?.state === 'DELETED'}
            onClick={toggleOpenCreate}
          >
            Crear nuevo
          </Button>
        </Box>
        <Box>
          {contacts.length === 0 ? (
            <EmptyState message="No hay contactos registrados" />
          ) : (
            <ContactCard.Container>
              {contacts.map((item) => (
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
          )}
        </Box>

        <ContactModal
          open={openCreate}
          onClose={toggleOpenCreate}
          submitFunction={onCrateContact}
          successFunc={fetchContacts}
          successMessage="Contacto creado con éxito"
        />
        {currentContact && openUpdate && (
          <ContactModal
            open={openUpdate}
            onClose={toggleOpenUpdate}
            type="UPDATE"
            data={currentContact}
            submitFunction={onEditContact}
            successFunc={fetchContacts}
            successMessage="Contacto actualizado con éxito"
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

export default withRouter(Contacts)
