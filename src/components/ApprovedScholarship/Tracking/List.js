import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import approvedActions from '../../../state/actions/approvedScholarship'
import { formatDate } from '../../../formatters'
import { useToggle } from '../../../hooks'
import { DataTable } from '../../Shared'
import { Button } from '../../UI'
import TrackingDialog from './Dialog'

const TrackingList = () => {
  const dispatch = useDispatch()
  const { approvedScholarship } = useSelector((state) => state.scholarships)

  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()

  const createTracking = (values) => {
    const { scholarshipType } = approvedScholarship.postulation
    const data = { ...values, approvedScholarshipId: approvedScholarship.id }

    if (scholarshipType.key === 'ACADEMIC_EXCELLENCE_SCHOLARSHIP')
      return dispatch(approvedActions.createBEATracking(data))
    return null
  }

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
            submitFunction={createTracking}
          />
        )}
      </Box>
    </Box>
  )
}

TrackingList.propTypes = {}

export default TrackingList
