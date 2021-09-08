import { Box } from '@material-ui/core'
import ProfileDetails from '../../components/Profile/Details'
import { PageHeading } from '../../components/UI'

const Profile = () => (
  <Box>
    <PageHeading>Mi Perfil</PageHeading>
    <ProfileDetails />
  </Box>
)

export default Profile
