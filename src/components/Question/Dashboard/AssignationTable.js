import { Box } from '@material-ui/core'
import { DataTable } from '../../Shared'

const AssignationTable = () => (
  <Box>
    <DataTable
      dense
      columns={[
        { name: 'Professional' },
        { name: 'Asignadas' },
        { name: 'Respondidas' },
        { name: '%' },
        { name: 'Tiempo promedio' }
      ]}
      data={[]}
    />
  </Box>
)

export default AssignationTable
