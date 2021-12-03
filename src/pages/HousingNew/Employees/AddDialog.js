import { useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { Dialog } from '../../../components/Shared'

const AddDialog = ({ open, onClose }) => {
  const { isMobile } = useSelector((state) => state.ui)
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      fullWidth
      maxWidth="lg"
    >
      <Box>
        <Typography
          align="center"
          style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 15 }}
        >
          Agregar trabajador
        </Typography>
        <Box></Box>
      </Box>
    </Dialog>
  )
}

export default AddDialog
