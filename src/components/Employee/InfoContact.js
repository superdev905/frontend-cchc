import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { useToggle } from '../../hooks'
import { Button, Wrapper } from '../UI'
import ContactForm from './ContactForm'
import ContactCard from './ContactCard'
import employeesActions from '../../state/actions/employees'

const InfoContact = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [contacts, setContacts] = useState([])
  const { employee } = useSelector((state) => state.employees)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()

  const createContact = (values) =>
    dispatch(
      employeesActions.createEmployeeContact({
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

  useEffect(() => {
    if (employee) {
      fetchContacts(employee.run)
    }
  }, [employee])

  return (
    <Box>
      <Wrapper>
        <Box display="flex" justifyContent="space-between">
          <Typography>Información de contacto</Typography>
          <Button onClick={toggleOpenAdd}> Registrar contacto</Button>
        </Box>
        <Box>
          <Grid container spacing={2}>
            {!loading &&
              contacts.map((item) => (
                <ContactCard key={`contact-${item.id}`} contact={item} />
              ))}
          </Grid>
        </Box>
      </Wrapper>
      <ContactForm
        successMessage="Información de contacto creado"
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createContact}
        submitFunction={fetchContacts}
      />
    </Box>
  )
}

export default InfoContact
