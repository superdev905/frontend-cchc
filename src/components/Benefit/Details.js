import { useSelector } from 'react-redux'
import { differenceInDays } from 'date-fns'
import { useHistory } from 'react-router-dom'
import { FaUserFriends as UsersIcon } from 'react-icons/fa'
import { IoIosTime as TimeIcon } from 'react-icons/io'
import { RiMoneyDollarCircleFill as MoneyIcon } from 'react-icons/ri'
import { Avatar, Box, Grid, Typography } from '@material-ui/core'
import { Button, DataCard, LabeledRow, StatusChip, Text } from '../UI'
import { formatCurrency, formatDate } from '../../formatters'
import generateColor from '../../utils/generateColor'

const BenefitDetails = ({ loading }) => {
  const history = useHistory()
  const { benefitDetails: benefit } = useSelector((state) => state.benefits)

  const courseDetails = () => {
    history.push(`/courses/${benefit.courseId}/classes`)
  }

  return (
    <Box p={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={7}>
          {benefit && benefit.state === 'DELETED' && (
            <LabeledRow label="Estado:" width={200}>
              <Text loading={loading}>
                <StatusChip error label="Beneficio eliminado" />
              </Text>
            </LabeledRow>
          )}

          <LabeledRow label="Vigencia:" width={200}>
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

          <LabeledRow label={'Código'} width={200}>
            <Text loading={loading}>{benefit && benefit.code}</Text>
          </LabeledRow>
          <LabeledRow label={'Nombre'} width={200}>
            <Text loading={loading}>{benefit && benefit.name}</Text>
          </LabeledRow>

          <LabeledRow label={'Fecha de inicio'} width={200}>
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
          <LabeledRow label={'Fecha de fin'} width={200}>
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
          <LabeledRow label={'Creado por: '} width={200}>
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
          <LabeledRow label={'Nombre de proyecto'} width={200}>
            <Text loading={loading}>{benefit && benefit.projectName}</Text>
          </LabeledRow>
        </Grid>
        {benefit?.course && (
          <>
            <Box p={1}>
              <LabeledRow label={'OTEC'} width={200}>
                <Text loading={loading}>
                  {benefit && benefit?.course.otec.businessName}
                </Text>
              </LabeledRow>
              <LabeledRow label={'Relator'} width={200}>
                <Text loading={loading}>
                  {benefit && benefit?.course.instructor.names}
                </Text>
              </LabeledRow>
              <LabeledRow label={'Descripción'} width={200}>
                <Text loading={loading}>
                  {benefit && benefit.course.description}
                </Text>
              </LabeledRow>
              <Button onClick={courseDetails}>Ver curso</Button>
            </Box>
          </>
        )}
        <Grid item xs={12} lg={5}>
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <Box>
                  <Typography style={{ fontSize: '15px' }}>
                    Cantidad de cupos anuales
                  </Typography>
                  <DataCard
                    icon={<UsersIcon />}
                    data={benefit && benefit.usersQuantity}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} md={6}>
                <Box>
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
              <Grid item xs={6} md={6}>
                <Box>
                  <Typography style={{ fontSize: '15px' }}>
                    Costo total
                  </Typography>
                  <DataCard
                    icon={<MoneyIcon />}
                    data={benefit && `${formatCurrency(benefit.totalCost)}`}
                    color={'red'}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BenefitDetails
