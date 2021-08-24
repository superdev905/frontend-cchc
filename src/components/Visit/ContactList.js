import { Box, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import constructionsActions from '../../state/actions/constructions'
import { DataTable } from '../Shared'
import { Wrapper } from '../UI'

const ContactList = () => {
  const dispatch = useDispatch()

  const [contactList, setContactList] = useState([])
  const { visit } = useSelector((state) => state.assistance)

  useEffect(() => {
    if (visit)
      dispatch(
        constructionsActions.getContacts(visit.construction_id, false)
      ).then((list) => {
        setContactList(
          list.map((item) => ({ ...item, charge: item.charge.name }))
        )
      })
  }, [visit])

  return (
    <Wrapper>
      <Box p={1} display="flex" justifyContent="space-between">
        <Typography style={{ fontSize: '18px', fontWeight: 'bold' }}>
          Contactos de obra
        </Typography>
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
          }
        ]}
        data={contactList}
      />
    </Wrapper>
  )
}

export default ContactList
