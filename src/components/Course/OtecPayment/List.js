import { Box, Typography } from '@material-ui/core'
import OTECPaymentCard from './Card'
import OTECPaymentDialog from './Dialog'
import { useToggle } from '../../../hooks'
import { Button } from '../../UI'

const PaymentsList = () => {
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}
        >
          Pagos a OTEC
        </Typography>
        <Button onClick={toggleOpenAdd}>Agregar</Button>
      </Box>
      <Box>
        <OTECPaymentCard />
        <OTECPaymentCard />
      </Box>
      <OTECPaymentDialog open={openAdd} onClose={toggleOpenAdd} />
    </Box>
  )
}
export default PaymentsList
