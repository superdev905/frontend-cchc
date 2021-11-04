import { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'

import { Dialog } from '../../Shared'
import { Button } from '../../UI'
import PollList from './List'
import Questions from './Questions'

const SuccessMessage = () => (
  <Box>
    <Typography align="center" variant="h6">
      !Tu respuesta fue enviada!
    </Typography>
  </Box>
)

const ModulePollsDialog = ({ open, onClose, module, polls }) => {
  const [step, setStep] = useState(0)
  const [loading] = useState(false)
  const [selectedPoll, setSelectedPoll] = useState(null)
  const { isMobile } = useSelector((state) => state.ui)

  useEffect(() => {
    if (open) {
      setStep(0)
    }
  }, [open, module])
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={'lg'}
      fullWidth
      fullScreen={isMobile}
    >
      <Box p={2}>
        {step === 0 && (
          <Box>
            <PollList
              loading={loading}
              onSelectPoll={(currentPoll) => {
                setSelectedPoll(currentPoll)
                setStep(1)
              }}
              list={polls}
            />
            <Box textAlign="center">
              <Button textAlign="center">Ver todas</Button>
            </Box>
          </Box>
        )}
        {step === 1 && (
          <Questions
            poll={selectedPoll}
            onNext={() => {
              setStep(2)
              onClose()
            }}
            onBack={() => {
              setStep(0)
              setSelectedPoll(null)
            }}
          />
        )}
        {step === 2 && <SuccessMessage />}
      </Box>
    </Dialog>
  )
}
export default memo(ModulePollsDialog)
