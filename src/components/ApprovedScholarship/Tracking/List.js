import { Box, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { formatDate } from '../../../formatters'
import { useToggle } from '../../../hooks'
import { DataTable } from '../../Shared'
import { Button } from '../../UI'
import TrackingDialog from './Dialog'

const TrackingList = () => {
  const { approvedScholarship } = useSelector((state) => state.scholarships)

  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()

  return (
    <Box p={1}>
      <Box display="flex" justifyContent="space-between">
        <Typography>Seguimiento</Typography>
        <Button onClick={toggleOpenAdd}>Registrar</Button>
      </Box>
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
        {openAdd && approvedScholarship && (
          <TrackingDialog
            open={openAdd}
            onClose={toggleOpenAdd}
            scholarshipType={
              approvedScholarship.postulation.scholarshipType.key
            }
          />
        )}
      </Box>
    </Box>
  )
}

TrackingList.propTypes = {}

export default TrackingList
