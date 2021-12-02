import { useHistory } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { Button } from '../UI'
import { DataTable } from '../Shared'
import Can from '../Can'

const HouseAgreements = () => {
  const history = useHistory()
  const onClickCreate = () => {
    history.push(`/housing/new`)
  }

  return (
    <Box>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography style={{ fontSize: 18, fontWeight: 'bold' }} variant="h7">
            Convenios
          </Typography>
          <Button onClick={onClickCreate}>Nuevo convenio</Button>
        </Box>
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
    </Box>
  )
}

export default HouseAgreements
