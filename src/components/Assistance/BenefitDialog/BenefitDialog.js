import { useEffect, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import benefitsActions from '../../../state/actions/benefits'

const BenefitDialog = ({ employee }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [benefitsList, setBenefitsList] = useState([])

  const fetchAvailableBenefits = () => {
    setLoading(true)
    dispatch(benefitsActions.getBenefitsForEmployee(employee?.id)).then(
      (result) => {
        setLoading(false)
        setBenefitsList(result.items)
      }
    )
  }
  useEffect(() => {
    fetchAvailableBenefits()
  })

  return (
    <Box>
      <Typography>{`Beneficios disponibles para: ${employee?.names}`}</Typography>
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
  )
}

BenefitDialog.propTypes = {}

export default BenefitDialog
