import { Box, Typography } from '@material-ui/core'
import { Dialog } from '../Shared'

const ReportModuleDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          Generar Reporte
        </Typography>
      </Box>
    </Dialog>
  )
}

export default ReportModuleDialog
