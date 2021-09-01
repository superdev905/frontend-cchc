import { Box } from '@material-ui/core'
import { PollsDot } from '../../components/Polls'
import { PageHeading, Wrapper } from '../../components/UI'
import { UserList } from '../../components/Users'

const Users = () => (
  <Box>
    <PageHeading>
      Usuarios <PollsDot module="USUARIOS" />
    </PageHeading>
    <Wrapper>
      <UserList />
    </Wrapper>
  </Box>
)

export default Users
