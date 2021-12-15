import { Box } from '@material-ui/core'
import { Tabs } from '../../Shared'

const EmployeeTabs = () => (
  <Box>
    <Tabs
      fullWidth
      value={0}
      tabs={['Información', 'Preguntas', 'Historial']}
      onChange={() => {}}
    >
      <Box></Box>
    </Tabs>
  </Box>
)

export default EmployeeTabs
