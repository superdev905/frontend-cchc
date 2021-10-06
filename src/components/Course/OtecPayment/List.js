import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import coursesActions from '../../../state/actions/courses'
import OTECPaymentCard from './Card'
import OTECPaymentDialog from './Dialog'
import { useToggle } from '../../../hooks'
import { Button } from '../../UI'

const PaymentsList = () => {
  const dispatch = useDispatch()
  const { idCourse } = useParams()
  const [payments, setPayments] = useState([])
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()

  const createPayment = (values) =>
    dispatch(
      coursesActions.createOTECPayment({ ...values, courseId: idCourse })
    )

  const fetchPayments = () => {
    dispatch(
      coursesActions.getOTECPayments({ size: 30, page: 1, courseId: idCourse })
    ).then((result) => {
      setPayments(result.items)
    })
  }

  useEffect(() => {
    fetchPayments()
  }, [])

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
        {payments.map((item) => (
          <OTECPaymentCard payment={item} key={`payment-card-${item.id}`} />
        ))}
      </Box>
      {openAdd && (
        <OTECPaymentDialog
          submitFunction={createPayment}
          successFunction={fetchPayments}
          open={openAdd}
          successMessage="Pago a OTEC registrado"
          onClose={toggleOpenAdd}
        />
      )}
    </Box>
  )
}
export default PaymentsList
