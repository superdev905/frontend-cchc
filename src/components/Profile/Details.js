import { useSelector } from 'react-redux'
import { Box, Grid } from '@material-ui/core'
import { LabeledRow, Text, Wrapper } from '../UI'

const ProfileDetails = () => {
  const { user } = useSelector((state) => state.auth)

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
          <Grid item xs={12} md={6}>
            <LabeledRow label="Correo">
              <Text>{user?.email}</Text>
            </LabeledRow>
          </Grid>
        </Grid>
      </Wrapper>
    </Box>
  )
}

export default ProfileDetails
