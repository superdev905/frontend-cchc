import { Box, Grid, Typography } from '@material-ui/core'
import { DataTable } from '../Shared'
import { SearchInput, Wrapper } from '../UI'

const ContactList = () => (
  <Wrapper>
    <Box p={1}>
      <Typography
        style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}
      >
        Trabajadores atendidos
      </Typography>

      <Grid spacing={2}>
        <Grid item xs={12} md={5}>
          <SearchInput placeholder="Busca por: Nombre, Run" />
        </Grid>
      </Grid>
    </Box>
    <DataTable
      emptyMessage="No hay trabajadores atendidos"
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
