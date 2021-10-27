import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Stepper, Step, StepLabel } from '@material-ui/core'
import { Success } from '../../UI'
import { Dialog } from '../../Shared'
import benefitsActions from '../../../state/actions/benefits'
import BenefitDialog from '.'
import CreateActivity from './CreateActivity'

function getSteps() {
  return ['Beneficios', 'Actividad']
}

function getStepContent(stepIndex, { onClose, selectedUser }) {
  switch (stepIndex) {
    case 0:
      return <BenefitDialog employee={selectedUser} onClose={onClose} />
    case 1:
      return <CreateActivity />
    default:
      return <span>Paso no encontrado</span>
  }
}

const CreateDialog = ({
  open,
  onClose,
  type,
  employee,
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
        benefitsActions.updateCreate({ ...create, step: create.step - 1 })
      )
    }
  }

  const handleNext = () => {
    if (create.step === 0) {
      onNext()
    } else {
      dispatch(
        benefitsActions.updateCreate({ ...create, step: create.step + 1 })
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
        employee: null
      })
    )
    onClose()
  }

  useEffect(() => {
    dispatch(
      benefitsActions.updateCreate({
        ...create,
        type,
        step: open ? 0 : create.step,
        employee: type === 'UPDATE' ? employee : null
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
              <Success message={'!Beneficio creado!'} event={handleEnd} />
            </Box>
          ) : (
            <>{getStepContent(create.step, { onClose })}</>
          )}
        </div>
      </Box>
    </Dialog>
  )
}

CreateDialog.defaultProps = {
  type: 'CREATE'
}

export default CreateDialog
