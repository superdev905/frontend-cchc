import { useSelector } from 'react-redux'
import { Dialog } from '../Shared'
import { Button, SubmitButton, TextArea } from '../UI'

const UserReportModal = ({
  open,
  onClose,
  firstLabel,
  secondLabel,
  thirdLabel,
  setPrimerArea,
  setSegundaArea,
  setTercerArea,
  togglePrintMonthlyReport
}) => {
  const { isMobile } = useSelector((state) => state.ui)
  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      {firstLabel && (
        <TextArea
          label={firstLabel}
          required
          onChange={(e) => setPrimerArea(e.target.value)}
        />
      )}
      {secondLabel && (
        <TextArea
          label={secondLabel}
          required
          onChange={(e) => setSegundaArea(e.target.value)}
        />
      )}
      {thirdLabel && (
        <TextArea
          label={thirdLabel}
          required
          onChange={(e) => setTercerArea(e.target.value)}
        />
      )}
      <Button variant={'outlined'}> Cancelar </Button>
      <SubmitButton onClick={togglePrintMonthlyReport}> Generar </SubmitButton>
    </Dialog>
  )
}

export default UserReportModal
