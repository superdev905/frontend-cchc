import { useSelector, useDispatch } from 'react-redux'
import { Box, Stepper, Step, StepLabel, Typography } from '@material-ui/core'
import { FullScreenDialog, Button } from '../../UI'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import companiesActions from '../../../state/actions/companies'

function getSteps() {
  return ['Información de empresa', 'Otros datos']
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <StepOne />
    case 1:
      return <StepTwo />
    default:
      return <span>Paso no encontrado</span>
  }
}

const CreateDialog = ({ open, onClose }) => {
  const steps = getSteps()
  const dispatch = useDispatch()
  const { create } = useSelector((state) => state.companies)

  const handleBack = () => {
    if (create.step === 0) {
      onClose()
    } else {
      dispatch(
        companiesActions.updateCreate({ ...create, step: create.step - 1 })
      )
    }
  }

  return (
    <FullScreenDialog open={open} onClose={onClose} onBack={handleBack}>
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
              <Typography align="center">Empresa creado con éxito</Typography>
              <Box display="flex" justifyContent="center">
                <Button onClick={onClose}>Cerrar</Button>
              </Box>
            </Box>
          ) : (
            <>{getStepContent(create.step)}</>
          )}
        </div>
      </Box>
    </FullScreenDialog>
  )
}

export default CreateDialog
