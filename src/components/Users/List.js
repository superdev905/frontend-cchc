import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import usersActions from '../../state/actions/users'
import { ConfirmDelete, DataTable } from '../Shared'
import { ActionsTable, Button, SearchInput, Select } from '../UI'
import UserForm from './Form'
import { useToggle } from '../../hooks'
import { usersConfig } from '../../config'

const useStyles = makeStyles((theme) => ({
  top: {
    [theme.breakpoints.up('md')]: {
      marginTop: 13
    }
  }
}))

const List = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    skip: 0,
    limit: 30,
    search: '',
    state: 'ACTIVE'
  })
  const [current, setCurrent] = useState(null)
  const { usersList } = useSelector((state) => state.users)
  const { open: openView, toggleOpen: toggleOpenView } = useToggle()
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const onCreateUser = (values) => dispatch(usersActions.createUser(values))

  const onUpdateUser = (values) =>
    dispatch(
      usersActions.updateUser(current.id, { ...values, state: current.state })
    )
  const onBlockUser = () => {
    dispatch(usersActions.patchUser(current.id, { state: 'DELETED' }))
      .then(() => {
        enqueueSnackbar('Usuario eliminado', { variant: 'success' })
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const handleSearch = (e) => {
    setFilters({ ...filters, search: e.target.value })
  }
  const handleStatusChange = (e) => {
    setFilters({ ...filters, state: e.target.value })
  }

  const fetchUsers = () => {
    setLoading(true)
    dispatch(
      usersActions.getUsers({ ...filters, search: filters.search.trim() })
    )
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    setTableData(
      usersList.map((item) => ({
        ...item,
        lastName: `${item.paternal_surname} ${item.maternal_surname}`
      }))
    )
  }, [usersList])

  useEffect(() => {
    fetchUsers()
  }, [filters])
  return (
    <Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} className={classes.top}>
            <SearchInput
              value={filters.search}
              placeholder="Buscar por: Nombre, Correo"
              onChange={handleSearch}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Select
              label="Estado"
              name="state-filter"
              onChange={handleStatusChange}
              value={filters.state}
            >
              <option value="">Todos</option>
              {usersConfig.states.map((item) => (
                <option key={`option-users-${item.key}`} value={item.key}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={2} className={classes.top}>
            <Box textAlign="right">
              <Button onClick={toggleOpenAdd}> Nuevo usuario</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <DataTable
        emptyMessage={`${
          filters.search
            ? `No se econtraron resultados para: ${filters.search}`
            : 'No hay usuarios registrados'
        }`}
        progressPending={loading}
        data={tableData}
        columns={[
          {
            name: 'Nombres',
            selector: 'names',
            sortable: true
          },
          {
            name: 'Apellidos',
            selector: 'lastName'
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
                onView={() => {
                  setCurrent(row)
                  toggleOpenView()
                }}
                onEdit={() => {
                  setCurrent(row)
                  toggleOpenEdit()
                }}
                onDelete={() => {
                  setCurrent(row)
                  toggleOpenDelete()
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
        successMessage="Usuario creado con éxito"
      />
      {current && openView && (
        <UserForm
          type="VIEW"
          open={openView}
          onClose={toggleOpenView}
          data={current}
        />
      )}
      {current && openEdit && (
        <UserForm
          open={openEdit}
          data={current}
          type="UPDATE"
          successFunction={fetchUsers}
          onClose={toggleOpenEdit}
          submitFunction={onUpdateUser}
          successMessage="Usuario modificado con éxito"
        />
      )}
      {current && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          onConfirm={() => onBlockUser(current.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar a{' '}
              <strong>{`${current.names} ${current.lastName}`}</strong>?
            </Typography>
          }
        />
      )}
    </Box>
  )
}

export default List
