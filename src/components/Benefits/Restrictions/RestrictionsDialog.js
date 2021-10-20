import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Stepper, Step, StepLabel, Typography } from '@material-ui/core'
import { Button } from '../../UI'
import { Dialog } from '../../Shared'
import benefitsActions from '../../../state/actions/benefits'
import Restrictions from './Restrictions'

function getSteps() {
  return ['', '']
}

function getStepContent(stepIndex, { onClose }) {
  switch (stepIndex) {
    case 0:
      return <Restrictions onClose={onClose} />
    default:
      return <Restrictions onClose={onClose} />
  }
}

const RestrictionsDialog = ({ open, onClose, type, data, successFunction }) => {
  const steps = getSteps()
  const dispatch = useDispatch()
  const { create } = useSelector((state) => state.benefits)
  const { isMobile } = useSelector((state) => state.ui)

  const handleBack = () => {
    if (create.step === 0) {
      onClose()
    } else {
      dispatch(
        benefitsActions.updateCreate({ ...create, step: create.step - 1 })
      )
    }
  }

  const handleEnd = () => {
    if (successFunction) {
      successFunction()
    }
    dispatch(
      benefitsActions.updateCreate({
        step: 0,
        type,
        benefit: null
      })
    )
    onClose()
  }

  useEffect(() => {
    dispatch(
      benefitsActions.updateCreate({
        ...create,
        open,
        type,
        step: open ? 1 : create.step,
        benefit: type === 'UPDATE' ? data : null
      })
    )
  }, [type, open])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={'lg'}
      fullWidth
      onBack={handleBack}
      fullScreen={isMobile}
    >
      <Box>
        <Stepper activeStep={create.step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {create.step === steps.length ? (
            <Box>
              <Typography align="center">{`Beneficio ${
                type === 'UPDATE' ? 'actualizado' : 'creado'
              }  con éxito`}</Typography>
              <Box display="flex" justifyContent="center">
                <Button onClick={handleEnd}>Cerrar</Button>
              </Box>
            </Box>
          ) : (
            <>{getStepContent(create.step, { onClose })}</>
          )}
        </div>
      </Box>
    </Dialog>
  )
}

RestrictionsDialog.defaultProps = {
  type: 'CREATE'
}

export default RestrictionsDialog
