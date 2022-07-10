import { useSelector } from 'react-redux'
import { Dialog } from '../Shared'
import { Button, SubmitButton, TextArea } from '../UI'

const UserReportModal = ({
  open,
  onClose,
  setDifusion,
  togglePrintMonthlyReport,
  difusion
}) => {
  const { isMobile } = useSelector((state) => state.ui)
  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <TextArea
        label={'TEMAS DIFUSIÓN PRÓXIMO MES'}
        required
        onChange={(e) => setDifusion(e.target.value)}
      />
      <Button
        variant={'outlined'}
        onClick={() => {
          onClose()
          closeAll()
        }}
      >
        Cancelar
      </Button>
      <SubmitButton onClick={togglePrintMonthlyReport} disabled={!difusion}>
        Generar
      </SubmitButton>
    </Dialog>
  )
}

export default UserReportModal
