import { Box, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useToggle } from '../../hooks'
import { DataTable } from '../Shared'
import { ActionsTable, Button } from '../UI'
import PaymentDialog from './PaymentDialog'

const PaymentsList = ({ items }) => {
  const { unemployed } = useSelector((state) => state.unemployed)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()

  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography>Historial de pagos</Typography>
        <Button onClick={toggleOpenAdd}>Registrar pago</Button>
      </Box>
      <DataTable
        data={items}
        columns={[
          {
            name: 'Fecha',
            selector: (row) => row.run,
            sortable: true
          },
          {
            name: 'Fecha',
            selector: (row) => row.run,
            sortable: true
          },
          {
            name: 'Nombres y apellidos',
            selector: (row) => row.names
          },
          {
            name: 'causal',
            selector: (row) => row.causal
          },
          {
            name: 'date',
            selector: (row) => row.date
          },
          {
            name: 'Año',
            selector: (row) => row.year
          },
          {
            name: '',
            selector: () => <ActionsTable onView={() => {}} />
          }
        ]}
      />
      {openAdd && (
        <PaymentDialog
          open={openAdd}
          onClose={toggleOpenAdd}
          employeeId={unemployed.employeeId}
        />
      )}
    </Box>
  )
}

PaymentsList.defaultProps = {
  items: []
}
export default PaymentsList
