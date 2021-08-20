import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSuccess, useToggle } from '../../hooks'
import { Button, EmptyState, Wrapper } from '../UI'
import ContactForm from './ContactForm'
import ContactCard from './ContactCard'
import employeesActions from '../../state/actions/employees'
import { ConfirmDelete } from '../Shared'

const InfoContact = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [contacts, setContacts] = useState([])
  const { success, changeSuccess } = useSuccess()
  const [currentContact, setCurrentContact] = useState(null)
  const { employee } = useSelector((state) => state.employees)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const createContact = (values) =>
    dispatch(
      employeesActions.createEmployeeContact({
        ...values,
        employee_run: employee.run,
        is_main: true
      })
    )
  const updateContact = (values) =>
    dispatch(
      employeesActions.updateEmployeeContact(currentContact.id, {
        ...currentContact,
        ...values,
        employee_run: employee.run,
        is_main: true
      })
    )

  const fetchContacts = (run) => {
    setLoading(true)
    dispatch(employeesActions.getEmployeeContact({ employee_run: run }))
      .then((list) => {
        setLoading(false)
        setContacts(list)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  const blockContact = () => {
    setDeleting(true)
    dispatch(
      employeesActions.patchEmployeeContact(currentContact.id, {
        state: 'DELETED'
      })
    )
      .then(() => {
        enqueueSnackbar('Contacto eliminado', { variant: 'success' })
        setDeleting(false)
        changeSuccess(true, () => {
          toggleOpenDelete()
          fetchContacts(employee.run)
        })
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'success' })
        setDeleting(false)
        toggleOpenDelete()
      })
  }

  useEffect(() => {
    if (employee) {
      fetchContacts(employee.run)
    }
  }, [employee])

  return (
    <Wrapper>
      <Grid>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
            Información de contacto
          </Typography>
          <Button onClick={toggleOpenAdd}> Registrar contacto</Button>
        </Box>
        <Box>
          {contacts.length === 0 && (
            <EmptyState message="Este trabajador no tiene información de contacto" />
          )}
          <Grid container spacing={2}>
            {!loading &&
              contacts.map((item, index) => (
                <ContactCard
                  index={index + 1}
                  key={`contact-${item.id}`}
                  contact={item}
                  onEdit={() => {
                    setCurrentContact(item)
                    toggleOpenEdit()
                  }}
                  onDelete={() => {
                    setCurrentContact(item)
                    toggleOpenDelete()
                  }}
                />
              ))}
          </Grid>
        </Box>
      </Grid>
      <ContactForm
        successMessage="Información de contacto creado"
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createContact}
        successFunction={() => fetchContacts(employee.run)}
      />
      {currentContact && openEdit && (
        <ContactForm
          type="UPDATE"
          successMessage="Información de contacto actualizado"
          open={openEdit}
          data={currentContact}
          onClose={toggleOpenEdit}
          submitFunction={updateContact}
          successFunction={() => fetchContacts(employee.run)}
        />
      )}
      {currentContact && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          onConfirm={() => blockContact(currentContact.id)}
          success={success}
          loading={deleting}
          message={
            <Typography>
              ¿Estás seguro de eliminar la información de contacto?
            </Typography>
          }
        />
      )}
    </Wrapper>
  )
}

export default InfoContact
