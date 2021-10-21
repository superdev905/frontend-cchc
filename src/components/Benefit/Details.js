import { useSelector } from 'react-redux'
import { differenceInDays } from 'date-fns'
import { FaUserFriends as UsersIcon } from 'react-icons/fa'
import { IoIosTime as TimeIcon } from 'react-icons/io'
import { Avatar, Box, Grid, Typography } from '@material-ui/core'
import { DataCard, LabeledRow, StatusChip, Text } from '../UI'
import { formatDate } from '../../formatters'
import generateColor from '../../utils/generateColor'

const BenefitDetails = ({ loading }) => {
  const { benefitDetails: benefit } = useSelector((state) => state.benefits)
  return (
    <Box p={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {benefit && benefit.state === 'DELETED' && (
            <LabeledRow label="Estado:">
              <Text loading={loading}>
                <StatusChip error label="Beneficio eliminado" />
              </Text>
            </LabeledRow>
          )}

          <LabeledRow label="Vigencia:">
            <Text loading={loading}>
              {benefit && (
                <StatusChip
                  success={benefit.isActive}
                  error={!benefit.isActive}
                  label={
                    benefit.isActive
                      ? `Vigente hasta: ${formatDate(benefit.endDate, {})}`
                      : 'No vigente'
                  }
                />
              )}
            </Text>
          </LabeledRow>

          <LabeledRow label={'Código'}>
            <Text loading={loading}>{benefit && benefit.code}</Text>
          </LabeledRow>
          <LabeledRow label={'Nombre'}>
            <Text loading={loading}>{benefit && benefit.name}</Text>
          </LabeledRow>

          <LabeledRow label={'Fecha de inicio'}>
            <Text loading={loading}>
              {benefit &&
                formatDate(benefit.startDate, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
            </Text>
          </LabeledRow>
          <LabeledRow label={'Fecha de fin'}>
            <Text loading={loading}>
              {benefit &&
                formatDate(benefit.endDate, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
            </Text>
          </LabeledRow>
          <LabeledRow label={'Creado por: '}>
            <Text loading={loading}>
              <Box display="flex" alignItems="center">
                <Avatar
                  style={{
                    backgroundColor: generateColor(),
                    marginRight: '8px'
                  }}
                >
                  {benefit && benefit.createdBy.names.charAt(0)}
                </Avatar>
                <Text loading={loading}>
                  {benefit &&
                    `${benefit.createdBy.names} ${benefit.createdBy.paternalSurname}`}
                </Text>
              </Box>
            </Text>
          </LabeledRow>
        </Grid>
        <Grid item xs={12} md={6}>
          <LabeledRow label={'Nombre de proyecto'} width={200}>
            <Text loading={loading}>{benefit && benefit.projectName}</Text>
          </LabeledRow>
          <LabeledRow label={'Descripción'} width={200}>
            <Text loading={loading}>{benefit && benefit.description}</Text>
          </LabeledRow>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box mt={2}>
                <Typography style={{ fontSize: '15px' }}>
                  Cantidad de cupos anuales
                </Typography>
                <DataCard
                  icon={<UsersIcon />}
                  data={benefit && benefit.usersQuantity}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box mt={2}>
                <Typography style={{ fontSize: '15px' }}>Duración</Typography>
                <DataCard
                  icon={<TimeIcon />}
                  data={
                    benefit &&
                    `${differenceInDays(
                      new Date(benefit.endDate),
                      new Date(benefit.startDate)
                    )} días`
                  }
                  color={'purple'}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BenefitDetails
