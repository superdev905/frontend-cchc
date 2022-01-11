import { Dialog } from '../Shared'
import { Box, Grid, Typography } from '@material-ui/core'

const ModuleDIalog = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <Box>
      <Typography variant="h6">Protocolos disponibles</Typography>
      <Box mt={2}>
        <Grid container spacing={2}></Grid>
      </Box>
    </Box>
  </Dialog>
)

export default ModuleDIalog
