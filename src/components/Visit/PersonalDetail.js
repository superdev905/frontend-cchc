import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { LabeledRow, Text, Wrapper } from '../UI'
import { formatDate } from '../../formatters'

const PersonalDetails = ({ loading }) => {
  const { employee } = useSelector((state) => state.employees)

  return (
    <Box width="100%">
      <Wrapper>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
            Datos personales
          </Typography>
        </Box>
        <Box p={2}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <LabeledRow label={'Run'}>
                <Text loading={loading}>{employee?.run}</Text>
              </LabeledRow>
              <LabeledRow label={'Nombres'}>
                <Text loading={loading}>{employee?.names}</Text>
              </LabeledRow>
              <LabeledRow label={'Apellido paterno'}>
                <Text loading={loading}>{employee?.paternal_surname}</Text>
              </LabeledRow>
              <LabeledRow label={'Apellido materno'}>
                <Text loading={loading}>{employee?.maternal_surname}</Text>
              </LabeledRow>
              <LabeledRow label={'Sexo'}>
                <Text loading={loading}>{employee?.gender}</Text>
              </LabeledRow>
            </Grid>
            <Grid item xs={12} md={6}>
              <LabeledRow label={'Estado civil'}>
                <Text loading={loading}>
                  {employee?.marital_status?.description}
                </Text>
              </LabeledRow>
              <LabeledRow label={'Nacionalidad'}>
                <Text loading={loading}>
                  {employee?.nationality?.description}
                </Text>
              </LabeledRow>
              <LabeledRow label={'Escolaridad'}>
                <Text loading={loading}>
                  {employee?.scholarship?.description}
                </Text>
              </LabeledRow>
              <LabeledRow width={170} label={'Fecha de nacimiento'}>
                <Text loading={loading}>{formatDate(employee?.born_date)}</Text>
              </LabeledRow>
            </Grid>
          </Grid>
        </Box>
      </Wrapper>
    </Box>
  )
}

export default PersonalDetails
