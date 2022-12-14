import { Box, Typography } from '@material-ui/core'
import { ActionsTable, Button } from '../../../components/UI'
import { DataTable } from '../../../components/Shared'

const EmployeeList = ({ employees, onAdd, onDelete }) => (
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
        emptyMessage={'No se seleccionaron trabajadores'}
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
              <ActionsTable
                onDelete={() => {
                  onDelete(row)
                }}
              />
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
