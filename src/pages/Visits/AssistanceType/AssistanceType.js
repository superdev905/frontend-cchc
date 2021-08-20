import { Box } from '@material-ui/core'
import AssistanceTypeList from '../../../components/Assistance/AssistanceType/AssistanceTypeList'
import { PageHeading } from '../../../components/UI'

const AssistanceType = () => (
  <Box>
    <PageHeading>Asistencias en obra</PageHeading>
    <AssistanceTypeList />
  </Box>
)

export default AssistanceType
