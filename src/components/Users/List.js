import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@material-ui/core'

import usersActions from '../../state/actions/users'
import { DataTable } from '../Shared'
import { ActionsTable, Button } from '../UI'
import UserForm from './Form'
import { useToggle } from '../../hooks'

const List = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { usersList } = useSelector((state) => state.users)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()

  const onCreateUser = (values) => dispatch(usersActions.createUser(values))

  const fetchUsers = () => {
    setLoading(true)
    dispatch(usersActions.getUsers({}))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <Box>
      <Box>
        <Button onClick={toggleOpenAdd}> Nuevo usuario</Button>
      </Box>
      <DataTable
        progressPending={loading}
        data={usersList}
        columns={[
          {
            name: 'Nombres',
            selector: 'names',
            sortable: true
          },
          {
            name: 'Apellidos',
            selector: 'names'
          },
          {
            name: 'Correo',
            selector: 'email',
            hide: 'md'
          },
          {
            name: '',
            selector: '',
            right: true,
            cell: (row) => (
              <ActionsTable
                {...row}
                onEdit={() => {
                  console.log('on de edit')
                }}
                onDelete={() => {
                  console.log('on delete')
                }}
              />
            )
          }
        ]}
        pagination
      />
      <UserForm
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={onCreateUser}
      />
    </Box>
  )
}

export default List
