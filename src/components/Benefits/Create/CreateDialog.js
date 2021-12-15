import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Stepper, Step, StepLabel } from '@material-ui/core'
import { Success } from '../../UI'
import StepTwo from './StepTwo'
import StepOne from './StepOne'
import { Dialog } from '../../Shared'
import benefitsActions from '../../../state/actions/benefits'

function getSteps() {
  return ['Datos', 'Restricciones']
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

const CreateDialog = ({
  open,
  onClose,
  type,
  data,
  successFunction,
  benefitName
}) => {
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
    if (open) {
      dispatch(
        benefitsActions.updateCreate({
          ...create,
          open,
          type,
          step: open ? 0 : create.step,
          benefit: type === 'UPDATE' ? data : { name: benefitName }
        })
      )
    }
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
  type: 'CREATE',
  benefitName: ''
}

export default CreateDialog
