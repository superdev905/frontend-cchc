import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import SettingsList from '../../components/Settings/List/index'
import OTECSList from '../../components/Settings/OTECS/OTECSList'

const Settings = () => (
  <Box>
    <PageHeading>Configuración</PageHeading>
    <SettingsList />
    <OTECSList />
  </Box>
)

export default Settings
