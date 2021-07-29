import { Box, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Dialog } from '../../Shared'
import { Button } from '../../UI'
import TreeCompany from './TreeCompany'

const ParentBusiness = ({ open, onClose, data, selectedId, onChange }) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <Typography
      style={{ fontSize: '17px', fontWeight: 'bold', marginBottom: '10px' }}
      align="center"
    >
      Selecciona una empresa
    </Typography>
    <Box marginBottom="10px">
      <Alert severity="info">
        La empresa seleccionada será la <strong>empresa madre</strong> de la
        nueva empresa
      </Alert>
    </Box>
    <TreeCompany data={data} selectedId={selectedId} onChange={onChange} />
    <Box textAlign="center">
      <Button onClick={onClose} variant="outlined">
        Cerrar
      </Button>
      <Button onClick={onClose}>Aceptar</Button>
    </Box>
  </Dialog>
)

export default ParentBusiness
