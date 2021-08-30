import { Box } from '@material-ui/core'
import GridOnIcon from '@material-ui/icons/GridOn'
import { Button } from '../UI'
import AnswerRow from './AnswerRow'

const AnswerTab = () => (
  <Box>
    <Box display="flex" justifyContent="flex-end">
      <Button size="small" startIcon={<GridOnIcon />}>
        Exportar a excel
      </Button>
    </Box>
    <Box p={1}>
      <AnswerRow.Heading />
      <AnswerRow loader />
      <AnswerRow />
      <AnswerRow />
    </Box>
  </Box>
)

export default AnswerTab
