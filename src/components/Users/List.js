import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid } from '@material-ui/core'

import usersActions from '../../state/actions/users'
import { DataTable } from '../Shared'
import { ActionsTable, Button, SearchInput } from '../UI'
import UserForm from './Form'
import { useToggle } from '../../hooks'

const List = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(null)
  const { usersList } = useSelector((state) => state.users)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()

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
        <Grid container>
          <Grid item xs={12} md={4}>
            <SearchInput placeholder="Buscar por: Nombre, Correo" />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box textAlign="right">
              <Button onClick={toggleOpenAdd}> Nuevo usuario</Button>
            </Box>
          </Grid>
        </Grid>
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
                  setCurrent(row)
                  toggleOpenEdit()
                }}
                onDelete={() => {
                  setCurrent(row)
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
        successFunction={fetchUsers}
        onClose={toggleOpenAdd}
        submitFunction={onCreateUser}
      />
      {current && openEdit && (
        <UserForm
          open={openEdit}
          data={current}
          type="UPDATE"
          successFunction={fetchUsers}
          onClose={toggleOpenEdit}
          submitFunction={onCreateUser}
        />
      )}
    </Box>
  )
}

export default List
