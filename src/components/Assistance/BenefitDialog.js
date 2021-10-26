import { useEffect, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import benefitsActions from '../../state/actions/benefits'
import { Dialog } from '../Shared'

const BenefitDialog = ({ open, onClose, employee }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [benefitsList, setBenefitsList] = useState([])
  const { isMObile } = useSelector((state) => state.ui)

  const fetchAvailableBenefits = () => {
    setLoading(true)
    dispatch(benefitsActions.getBenefitsForEmployee(employee.id)).then(
      (result) => {
        setLoading(false)
        setBenefitsList(result.items)
      }
    )
  }
  useEffect(() => {
    if (open) {
      fetchAvailableBenefits()
    }
  }, [open])
  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMObile} fullWidth>
      <Box>
        <Typography>{`Beneficios disponibles para: ${employee.names}`}</Typography>
        {loading ? (
          <>....</>
        ) : (
          <>
            {benefitsList.map((item) => (
              <Box
                p={2}
                key={`benefit-card-${item.id}`}
                style={{ border: '1px solid' }}
                mb={2}
              >
                {`Nombre: ${item.name}`}
              </Box>
            ))}
          </>
        )}
      </Box>
    </Dialog>
  )
}

BenefitDialog.propTypes = {}

export default BenefitDialog
