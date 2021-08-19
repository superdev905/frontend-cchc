import { Box, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import constructionsActions from '../../state/actions/constructions'
import { DataTable } from '../Shared'
import { Wrapper, Button } from '../UI'

const ContactList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
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

  const assistanceTypes = () => {
    history.push(`${location.pathname}/assistance-type`)
  }

  return (
    <Wrapper>
      <Box p={1} display="flex" justifyContent="space-between">
        <Typography style={{ fontSize: '18px', fontWeight: 'bold' }}>
          Contactos de obra
        </Typography>

        <Button onClick={assistanceTypes}>Atenciones en Obras</Button>
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
