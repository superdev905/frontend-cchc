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
          selector: (row) => row.full_name,
          sortable: true
        },
        {
          name: 'Nombres',
          selector: (row) => row.full_name,
          sortable: true
        },
        {
          name: 'Apellidos',
          selector: (row) => row.charge
        },
        {
          name: 'Nacionalidad',
          selector: (row) => row.email
        },
        {
          name: 'Sexo',
          selector: (row) => row.email
        },
        {
          name: 'Fecha de nacimiento',
          selector: (row) => row.email
        }
      ]}
      data={[]}
    />
  </Wrapper>
)

export default ContactList
