import { Box } from '@material-ui/core'
import { Button, SubmitButton, TextArea } from '../UI'

const UserReportModal = ({
  setDifusion,
  togglePrintMonthlyReport,
  difusion,
  onHandleBack
}) => (
  <Box>
    <TextArea
      label={'TEMAS DIFUSIÓN PRÓXIMO MES'}
      required
      onChange={(e) => setDifusion(e.target.value)}
      value={difusion}
    />
    <Button variant={'outlined'} onClick={onHandleBack}>
      Volver
    </Button>
    <SubmitButton onClick={togglePrintMonthlyReport} disabled={!difusion}>
      Generar
    </SubmitButton>
  </Box>
)

export default UserReportModal
