import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import unemployedActions from '../../../state/actions/unemployed'
import { useToggle } from '../../../hooks'
import { DataTable } from '../../Shared'
import { ActionsTable, Button } from '../../UI'
import PaymentDialog from './Dialog'
import { months } from '../../../config'
import { formatDate } from '../../../formatters'
import DetailsDrawer from './Details'

const PaymentsList = () => {
  const dispatch = useDispatch()
  const { idUnemployed } = useParams()
  const [loading, setLoading] = useState(false)
  const [paymentsList, setPaymentsList] = useState([])
  const [paymentId, setPaymentId] = useState(null)
  const { unemployed, payments } = useSelector((state) => state.unemployed)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openView, toggleOpen: toggleOpenView } = useToggle()

  const registerPayment = (values) =>
    dispatch(
      unemployedActions.registerPayment({
        ...values,
        date: new Date().toISOString(),
        unemployedId: idUnemployed
      })
    )
  const fetchPayments = () => {
    setLoading(true)
    dispatch(
      unemployedActions.getPayments({ unemployedId: idUnemployed })
    ).then(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    setPaymentsList(
      payments.map((item) => ({
        ...item,
        monthName: months.find((month) => item.month === month.index).name
      }))
    )
  }, [payments])

  useEffect(() => {
    fetchPayments()
  }, [])

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
        data={paymentsList}
        progressPending={loading}
        columns={[
          {
            name: 'Mes',
            selector: (row) => row.monthName,
            sortable: true
          },
          {
            name: 'Año',
            selector: (row) => row.period,
            sortable: true
          },
          {
            name: 'Fecha de registro',
            selector: (row) => formatDate(row.date)
          },
          {
            name: '',
            right: true,
            selector: (row) => (
              <ActionsTable
                onView={() => {
                  toggleOpenView()
                  setPaymentId(row.id)
                }}
              />
            )
          }
        ]}
      />
      {openAdd && (
        <PaymentDialog
          open={openAdd}
          onClose={toggleOpenAdd}
          employeeId={unemployed.employeeId}
          submitFunction={registerPayment}
          successFunction={fetchPayments}
        />
      )}
      {openView && paymentId && (
        <DetailsDrawer
          paymentId={paymentId}
          open={openView}
          onClose={toggleOpenView}
        />
      )}
    </Box>
  )
}

PaymentsList.defaultProps = {
  items: []
}
export default PaymentsList
