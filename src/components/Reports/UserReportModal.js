import { Box } from '@material-ui/core'
import { Button, SubmitButton, TextArea } from '../UI'

const UserReportModal = ({
  firstLabel,
  secondLabel,
  thirdLabel,
  setPrimerArea,
  setSegundaArea,
  setTercerArea,
  nextStepper,
  onHandleBack,
  primerArea,
  segundaArea,
  tercerArea
}) => (
  <Box>
    {firstLabel && (
      <TextArea
        label={firstLabel}
        required
        onChange={(e) => setPrimerArea(e.target.value)}
        value={primerArea}
      />
    )}
    {secondLabel && (
      <TextArea
        label={secondLabel}
        required
        onChange={(e) => setSegundaArea(e.target.value)}
        value={segundaArea}
      />
    )}
    {thirdLabel && (
      <TextArea
        label={thirdLabel}
        required
        onChange={(e) => setTercerArea(e.target.value)}
        value={tercerArea}
      />
    )}
    <Button variant={'outlined'} onClick={onHandleBack}>
      Volver
    </Button>
    <SubmitButton onClick={nextStepper}>Siguiente</SubmitButton>
  </Box>
)

export default UserReportModal
