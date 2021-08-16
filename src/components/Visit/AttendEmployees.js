import { Box, Typography } from '@material-ui/core'
import { DataTable } from '../Shared'
import { Wrapper } from '../UI'

const ContactList = () => (
  <Wrapper>
    <Box p={1}>
      <Typography
        style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}
      >
        Trabajadores por atender
      </Typography>
    </Box>
    <DataTable
      emptyMessage="No hay trabajadores por atender"
      columns={[
        {
          name: 'Run',
          selector: 'full_name',
          sortable: true
        },
        {
          name: 'Nombres',
          selector: 'full_name',
          sortable: true
        },
        {
          name: 'Apellidos',
          selector: 'charge'
        },
        {
          name: 'Nacionalidad',
          selector: 'email'
        },
        {
          name: 'Sexo',
          selector: 'email'
        },
        {
          name: 'Fecha de nacimiento',
          selector: 'email'
        }
      ]}
      data={[]}
    />
  </Wrapper>
)

export default ContactList
