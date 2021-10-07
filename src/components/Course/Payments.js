import { Box } from '@material-ui/core'
import DocumentList from './Docs/List'
import ExtraPaymentsList from './ExtraPayments/List'
import { OTECPaymentList } from './OtecPayment'

const PaymentsTab = () => (
  <Box>
    <OTECPaymentList />
    <DocumentList />
    <ExtraPaymentsList />
  </Box>
)
export default PaymentsTab
