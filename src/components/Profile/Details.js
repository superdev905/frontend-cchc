import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid } from '@material-ui/core'
import { Button, LabeledRow, Text, Wrapper } from '../UI'
import { useToggle } from '../../hooks'
import PasswordModal from './PasswordModal'
import userActions from '../../state/actions/users'

const ProfileDetails = () => {
  //  const [changePassword, setChangePassword] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { open: openEditPassword, toggleOpen: toggleOpenEditPassword } =
    useToggle()

  const fetchData = () => {
    dispatch(userActions.getUserDetails(user.id))
  }

  const updatePassword = () =>
    dispatch(
      userActions.updatePassword(user.id, {
        old_password: '',
        new_password: '',
        confirm_password: ''
      })
    )
  useEffect(() => {
    fetchData()
  }, [])

  console.log(user.id)
  console.log(user.password)

  return (
    <Box p={2}>
      <Wrapper>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <LabeledRow label="Nombre">
              <Text>{user?.names}</Text>
            </LabeledRow>
          </Grid>
          <Grid item xs={12} md={12}>
            <LabeledRow label="Apellido Paterno">
              <Text>{user?.paternal_surname}</Text>
            </LabeledRow>
          </Grid>
          <Grid item xs={12} md={12}>
            <LabeledRow label="Apellido Materno">
              <Text>{user?.maternal_surname}</Text>
            </LabeledRow>
          </Grid>
          <Grid item xs={12} md={12}>
            <LabeledRow label="Correo">
              <Text>{user?.email}</Text>
            </LabeledRow>
          </Grid>
          <Grid item xs={12} md={12}>
            <LabeledRow label="Contraseña">
              <Text>{user?.password}</Text>
            </LabeledRow>
          </Grid>
        </Grid>
      </Wrapper>
      <Button onClick={toggleOpenEditPassword}>Cambiar Contraseña</Button>

      {user && openEditPassword && (
        <PasswordModal
          open={openEditPassword}
          onClose={toggleOpenEditPassword}
          type={'UPDATE'}
          submitFunction={updatePassword}
        />
      )}
    </Box>
  )
}

export default ProfileDetails
