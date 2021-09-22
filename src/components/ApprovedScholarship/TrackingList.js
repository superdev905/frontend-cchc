import { Box, Typography } from '@material-ui/core'
import { formatDate } from '../../formatters'
import { DataTable } from '../Shared'

const TrackingList = () => (
  <Box p={1}>
    <Typography>Seguimiento</Typography>
    <Box>
      <DataTable
        progressPending={false}
        emptyMessage={'Esta beca no tiene seguimientos registrados'}
        highlightOnHover
        pointerOnHover
        columns={[
          {
            name: 'Fecha de aprobación',
            selector: (row) => formatDate(row.date)
          },
          {
            name: 'Nombre del beneficiario',
            selector: (row) => row.postulation.beneficiaryNames,
            sortable: true
          },
          {
            name: 'Trabajador',
            selector: (row) => row.postulation.employeeNames,
            hide: 'md'
          },
          {
            name: 'Empresa',
            selector: (row) => row.postulation.businessName,
            hide: 'md'
          }
        ]}
        data={[]}
      />
    </Box>
  </Box>
)

TrackingList.propTypes = {}

export default TrackingList
