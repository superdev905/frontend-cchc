import { Box } from '@material-ui/core'
import { PageHeading, Wrapper } from '../../components/UI'
import { UserList } from '../../components/Users'

const Users = () => (
  <Box>
    <PageHeading>Usuarios</PageHeading>
    <Wrapper>
      <UserList />
    </Wrapper>
  </Box>
)

export default Users
