import { useState } from 'react'
import { Box, Stepper, Step, StepLabel, Typography } from '@material-ui/core'
import { FullScreenDialog, Button } from '../../UI'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import ConstructionForm from './Construction'

function getSteps() {
  return ['Información de empresa', 'Contactos', 'Divisiones', 'Obras']
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <StepOne />
    case 1:
      return <StepTwo />
    case 2:
      return <StepThree />
    case 3:
      return <ConstructionForm />
    default:
      return <span>Paso no encontrado</span>
  }
}

const CreateDialog = ({ open, onClose }) => {
  const [step] = useState(3)

  const steps = getSteps()

  return (
    <FullScreenDialog open={open} onClose={onClose}>
      <Box>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {step === steps.length ? (
            <Box>
              <Typography align="center">Cliente creado con éxito</Typography>
              <Box display="flex" justifyContent="center">
                <Button>Cerrar</Button>
              </Box>
            </Box>
          ) : (
            <>{getStepContent(step)}</>
          )}
        </div>
      </Box>
    </FullScreenDialog>
  )
}

export default CreateDialog
