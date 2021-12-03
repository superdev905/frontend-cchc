import { Box, Checkbox, Typography } from '@material-ui/core'
import { Button } from '../../../components/UI'
import { DataTable } from '../../../components/Shared'

const EmployeeList = ({ employees, onAdd }) => (
  <Box>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography
        component="div"
        style={{ display: 'flex', fontWeight: 'bold' }}
      >
        Trabajadores
      </Typography>
      <Button onClick={onAdd}>Agregar</Button>
    </Box>
    <Box>
      <DataTable
        emptyMessage={'Esta empresa no tiene beneficios'}
        data={employees}
        progressPending={false}
        columns={[
          {
            name: 'Rut',
            selector: (row) => row.run
          },
          {
            name: 'Nombres y Apellidos',
            selector: (row) =>
              `${row.names} ${row.paternal_surname} ${
                row.maternal_surname || ''
              }`
          },
          {
            name: 'Sexo',
            selector: (row) => row.gender
          },
          {
            name: '',
            right: true,
            selector: (row) => (
              <Box display="flex" alignItems="center">
                <Checkbox
                  value={row.isSelected}
                  color="primary"
                  onChange={() => {}}
                  inputProps={{ 'aria-label': 'status checkbox' }}
                />
              </Box>
            )
          }
        ]}
        highlightOnHover
        pointerOnHover
      />
    </Box>
  </Box>
)

export default EmployeeList
