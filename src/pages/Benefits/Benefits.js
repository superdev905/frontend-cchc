import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import BenefitList from '../../components/Benefits/List'

const Benefits = () => (
  <Box>
    <ModuleIndicator module={'BENEFICIOS'} />
    <PageHeading>Beneficios</PageHeading>
    <Box>
      <BenefitList />
    </Box>
  </Box>
)

export default Benefits
