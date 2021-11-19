import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import { PageHeading, Wrapper } from '../../components/UI'
import { UserList } from '../../components/Users'
import uiActions from '../../state/actions/ui'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(uiActions.setCurrentModule('USUARIOS'))
  }, [])

  return (
    <Box>
      <PageHeading>Usuarios</PageHeading>
      <Wrapper>
        <UserList />
      </Wrapper>
    </Box>
  )
}

export default Users
