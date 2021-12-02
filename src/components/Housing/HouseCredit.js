import { useHistory } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core'
import { Button, Wrapper } from '../UI'
import { DataTable } from '../Shared'
import Can from '../Can'

const HouseCredit = () => {
  const history = useHistory()
  const launchHousingNew = () => {
    history.push('/housing-new')
  }

  return (
    <Wrapper>
      <Grid container alignItems="center">
        <Box>
          <Typography variant="h7">Convenios</Typography>
        </Box>
        <Grid item md={11}>
          <Box display="flex" justifyContent="flex-end">
            <Can
              availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
              yes={() => (
                <Button onClick={launchHousingNew}> Nuevo Convenio </Button>
              )}
              no={() => null}
            />
          </Box>
        </Grid>
      </Grid>
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
}

export default HouseCredit
