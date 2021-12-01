import { Box, Grid, Typography } from '@material-ui/core'
import { Wrapper } from '../UI'
import { DataTable } from '../Shared'

const HouseCredit = () => (
  <Wrapper>
    <Box>
      <Grid container spacing={1} alingItems="center">
        <Grid Item>
          <Typography variant="h7">Convenios</Typography>
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

export default HouseCredit
