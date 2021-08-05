import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { useToggle } from '../../hooks'
import { Button, EmptyState, Wrapper } from '../UI'
import ContactForm from './ContactForm'
import ContactCard from './ContactCard'
import employeesActions from '../../state/actions/employees'
import { ConfirmDelete } from '../Shared'

const InfoContact = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [contacts, setContacts] = useState([])
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

  const blockContact = () =>
    dispatch(
      employeesActions.patchEmployeeContact(currentContact.id, {
        state: 'DELETED'
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

  useEffect(() => {
    if (employee) {
      fetchContacts(employee.run)
    }
  }, [employee])

  return (
    <Box>
      <Wrapper>
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
              contacts.map((item) => (
                <ContactCard
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
      </Wrapper>
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
          message={
            <Typography>
              ¿Estás seguro de eliminar la información de contacto?
            </Typography>
          }
        />
      )}
    </Box>
  )
}

export default InfoContact
