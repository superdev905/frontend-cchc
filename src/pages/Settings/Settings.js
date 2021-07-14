import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import SettingsList from '../../components/Settings/List/index'

const Settings = () => (
  <Box>
    <PageHeading>Configuración</PageHeading>
    <SettingsList />
  </Box>
)

export default Settings
