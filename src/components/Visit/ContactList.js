import { Box, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSuccess, useToggle } from '../../hooks'
import constructionsActions from '../../state/actions/constructions'
import { ContactModal } from '../Contacts'
import { ConfirmDelete, DataTable } from '../Shared'
import { ActionsTable, Button, Wrapper } from '../UI'

const ContactList = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { visit } = useSelector((state) => state.assistance)
  const [currentContact, setCurrentContact] = useState(null)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [contactList, setContactList] = useState([])
  const { success, changeSuccess } = useSuccess()
  const { open, toggleOpen } = useToggle()
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  console.log(loading)

  useEffect(() => {
    if (visit)
      dispatch(
        constructionsActions.getContacts(visit.construction_id, false)
      ).then((list) => {
        setContactList(
          list.map((item) => ({ ...item, charge: item.charge_name }))
        )
      })
  }, [visit])

  const fetchContacts = () => {
    setLoading(true)
    dispatch(constructionsActions.getContacts(visit.construction_id))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const onCreateContact = (values) => {
    dispatch(
      constructionsActions.createContact({
        ...values,
        construction_id: parseInt(visit.construction_id, 10)
      })
    )
      .then(() => {
        setLoading(false)
        changeSuccess(true)
        toggleOpen()
        fetchContacts()
        enqueueSnackbar('Contaco creado correctamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const onEditContact = (values) => {
    dispatch(
      constructionsActions.updateContact(currentContact.id, {
        ...values,
        construction_id: parseInt(currentContact.id, 10)
      })
    )
  }

  const deleteContact = (id) => {
    dispatch(constructionsActions.patchContact(id, { state: 'DELETED' }))
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        toggleOpenDelete()
        fetchContacts()
        enqueueSnackbar('Contacto eliminado exitosamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setDeleting(false)
      })
  }

  return (
    <Wrapper>
      <Box display="flex" justifyContent="space-between">
        <Typography style={{ fontSize: 18, fontWeight: 'bold' }}>
          Contactos de obra
        </Typography>
        <Button onClick={toggleOpen}>Nuevo contacto</Button>
      </Box>
      <DataTable
        columns={[
          {
            name: 'Nombres',
            selector: (row) => row.full_name,
            sortable: true
          },
          {
            name: 'Cargo',
            selector: (row) => row.charge
          },
          {
            name: 'Correo',
            selector: (row) => row.email
          },
          {
            name: 'Móvil',
            selector: (row) => row.cell_phone
          },
          {
            name: 'Oficina',
            selector: (row) => row.office_phone
          },
          {
            name: 'Otro',
            selector: (row) => row.other_phone
          },
          {
            right: true,
            cell: (row) => (
              <ActionsTable
                onEdit={() => {
                  setCurrentContact(row)
                  toggleOpenUpdate()
                }}
                onDelete={() => {
                  setCurrentContact(row)
                  toggleOpenDelete()
                }}
              />
            )
          }
        ]}
        data={contactList}
      />

      <ContactModal
        open={open}
        onClose={toggleOpen}
        submitFunction={onCreateContact}
        successFunc={fetchContacts}
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
          success={success}
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

export default ContactList
