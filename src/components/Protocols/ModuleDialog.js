import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog } from '../Shared'
import { Button } from '../UI'
import ProtocolCard from './Card'

const ModuleDIalog = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <Box>
      <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
        Protocolos disponibles
      </Typography>
      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProtocolCard />
          </Grid>
          <Grid item xs={12}>
            <ProtocolCard />
          </Grid>
        </Grid>
        <Box mt={2} textAlign="center">
          <Button onClick={onClose}>Cerrar</Button>
        </Box>
      </Box>
    </Box>
  </Dialog>
)

export default ModuleDIalog
