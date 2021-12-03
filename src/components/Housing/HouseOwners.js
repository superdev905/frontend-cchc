import { Box, Grid, Typography } from '@material-ui/core'
import { Wrapper } from '../UI'
import { DataTable } from '../Shared'

const HouseOwners = () => (
  <Wrapper>
    <Box>
      <Grid container spacing={1} alingItems="center">
        <Grid item>
          <Typography variant="h7" style={{ fontSize: 18, fontWeight: 'bold' }}>
            Propietarios
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <DataTable
      higlightOnHover
      pointerOnHover
      columns={[
        {
          name: 'Fecha',
          selector: (row) => row.date
        },
        {
          name: 'Empresa',
          selector: (row) => row.companies
        },
        {
          name: 'Estado',
          selector: (row) => row.state
        },
        {
          name: 'Trabajadores',
          selector: (row) => row.Workers
        }
      ]}
    />
  </Wrapper>
)

export default HouseOwners
