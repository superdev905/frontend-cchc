import { Box, Typography } from '@material-ui/core'
import { EmployeeJobs } from '../Employee'
import { Dialog } from '../Shared'

const JobsDialog = ({ open, onClose, employeeId }) => (
  <Dialog open={open} onClose={onClose} maxWidth fullWidth="lg">
    <Box>
      <Typography>Agregue trabajos en el nuevo empleo</Typography>
      <EmployeeJobs employeeId={employeeId} />
    </Box>
  </Dialog>
)

export default JobsDialog
