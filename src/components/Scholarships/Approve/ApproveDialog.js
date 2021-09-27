import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Stepper, Step, StepLabel, Typography } from '@material-ui/core'
import { Button } from '../../UI'
import StepTwo from './StepTwo'
import StepOne from './StepOne'
import { Dialog } from '../../Shared'
import scholarshipsActions from '../../../state/actions/scholarships'

function getSteps() {
  return ['Revisar datos', 'Aprobar']
}

function getStepContent(stepIndex, { onClose }) {
  switch (stepIndex) {
    case 0:
      return <StepOne onClose={onClose} />
    case 1:
      return <StepTwo />
    default:
      return <span>Paso no encontrado</span>
  }
}

const ApproveDialog = ({
  open,
  onClose,
  type,
  data,
  successFunction,
  onNext
}) => {
  const steps = getSteps()
  const dispatch = useDispatch()
  const { create } = useSelector((state) => state.scholarships)
  const { isMobile } = useSelector((state) => state.ui)

  const handleBack = () => {
    if (create.step === 0) {
      onClose()
    } else {
      dispatch(
        scholarshipsActions.updateCreate({ ...create, step: create.step - 1 })
      )
    }
  }

  const handleNext = () => {
    if (create.step === 0) {
      onNext()
    } else {
      dispatch(
        scholarshipsActions.updateCreate({ ...create, step: create.step + 1 })
      )
    }
  }

  const handleEnd = () => {
    if (successFunction) {
      successFunction()
    }
    dispatch(
      scholarshipsActions.updateCreate({
        step: 0,
        type,
        application: null
      })
    )
    onClose()
  }

  useEffect(() => {
    dispatch(
      scholarshipsActions.updateCreate({
        ...create,
        type,
        step: open ? 0 : create.step,
        application: type === 'UPDATE' ? data : null
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
      onNext={handleNext}
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
              <Typography align="center">
                Postulación revisada con exito
              </Typography>
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

ApproveDialog.defaultProps = {
  type: 'CREATE'
}

export default ApproveDialog
