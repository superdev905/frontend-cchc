import { Box, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Dialog } from '../Shared'

const DetailsDialog = ({ open, onClose, visitId }) => {
  const { isMobile } = useSelector((state) => state.ui)

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Box>
        <Box mb={2}>
          <Typography
            align="center"
            variant="h6"
            style={{ fontWeight: 'bold' }}
          >
            {`Visita ${visitId}`}{' '}
          </Typography>
        </Box>
        <Box></Box>
      </Box>
    </Dialog>
  )
}

export default DetailsDialog
