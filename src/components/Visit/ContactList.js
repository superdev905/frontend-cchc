import { Box, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import constructionsActions from '../../state/actions/constructions'
import assistanceActions from '../../state/actions/assistance'
import { DataTable } from '../Shared'
import { Wrapper } from '../UI'

const ContactList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { idVisit } = useParams()
  const [contactList, setContactList] = useState([])
  const { visit } = useSelector((state) => state.assistance)

  useEffect(() => {
    dispatch(assistanceActions.getEventDetails(idVisit))
  }, [])

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
    history.push('/assistance-type')
  }

  return (
    <Wrapper>
      <Box p={2}>
        <Typography style={{ fontSize: '18px', fontWeight: 'bold' }}>
          Contactos de obra
        </Typography>
      </Box>
      <DataTable
        columns={[
          {
            name: 'Nombres',
            selector: 'full_name',
            sortable: true
          },
          {
            name: 'Cargo',
            selector: 'charge'
          },
          {
            name: 'Correo',
            selector: 'email'
          },
          {
            name: 'Móvil',
            selector: 'cell_phone'
          },
          {
            name: 'Oficina',
            selector: 'office_phone'
          },
          {
            name: 'Otro',
            selector: 'other_phone'
          }
        ]}
        data={contactList}
      />
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={assistanceTypes} size="small">
          Atenciones en Obras
        </Button>
      </Box>
    </Wrapper>
  )
}

ContactList.propTypes = {}

export default ContactList
