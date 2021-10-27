import { useEffect, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import benefitsActions from '../../../state/actions/benefits'
import { Dialog } from '../../Shared'
import useStyles from './styles'
import { BenefitCard } from '../../Benefits'
import ActivityForm from './ActivityForm'

const BenefitDialog = ({ open, onClose, employee, onSave }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [selectedBenefit, setSelectedBenefit] = useState(null)
  const [benefitsList, setBenefitsList] = useState([])

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
    <Dialog open={open} onClose={onClose} fullWidth>
      <Box>
        <Typography align="center" className={classes.title}>
          Asignar beneficio a trabajador
        </Typography>
        <Typography>{`Beneficios disponibles para: ${employee?.names}`}</Typography>
        {selectedBenefit ? (
          <BenefitCard
            benefit={selectedBenefit}
            selected
            onDelete={() => setSelectedBenefit(null)}
          />
        ) : (
          <>
            {loading ? (
              <Box>
                <BenefitCard.Loader />
                <BenefitCard.Loader />
              </Box>
            ) : (
              <>
                {benefitsList.map((item) => (
                  <BenefitCard
                    onClick={() => setSelectedBenefit(item)}
                    key={`benefit-card-${item.id}`}
                    benefit={item}
                  />
                ))}
              </>
            )}
          </>
        )}
        <Box mt={3}>
          {selectedBenefit && (
            <Box>
              <Typography style={{ marginBottom: 10 }}>
                Detalles de actividad
              </Typography>
              <ActivityForm
                submitFunction={(values) => {
                  onSave(selectedBenefit, values)
                  onClose()
                }}
              />{' '}
            </Box>
          )}
        </Box>
      </Box>
    </Dialog>
  )
}

BenefitDialog.propTypes = {}

export default BenefitDialog
