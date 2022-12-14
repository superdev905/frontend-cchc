import { Avatar, Box, Chip, Grid, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { formatDate } from '../../formatters'
import { LabeledRow, StatusChip, Text } from '../UI'
import generateColor from '../../utils/generateColor'

const Details = ({ loading }) => {
  const { courseDetails: course } = useSelector((state) => state.courses)
  return (
    <Box p={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <LabeledRow label="Estado:">
            <Text loading={loading}>
              {course && <Chip color="primary" label={course.status} />}
            </Text>
          </LabeledRow>
          <LabeledRow label="Código:">
            <Text loading={loading}>{course && course.code}</Text>
          </LabeledRow>
          <LabeledRow label="Nombre:">
            <Text loading={loading}>{course && course.name}</Text>
          </LabeledRow>
          {course && course.state === 'DELETED' && (
            <LabeledRow label="Estado:">
              <Text loading={loading}>
                <StatusChip error label="Este curso fue eliminado" />
              </Text>
            </LabeledRow>
          )}
          <LabeledRow label="Beneficio:">
            <Text loading={loading}>
              <a href={`/benefits/${course?.benefitId}`}>Ver beneficio</a>
            </Text>
          </LabeledRow>
          <Box mt={'15px'}>
            <Typography style={{ fontWeight: 'bold' }}>OTEC</Typography>
            <LabeledRow label="Rut:">
              <Text loading={loading}>{course && course.otec.rut}</Text>
            </LabeledRow>
            <LabeledRow label="Nombre:">
              <Text loading={loading}>
                {course && course.otec.businessName}
              </Text>
            </LabeledRow>
            <LabeledRow label="Dirección:">
              <Text loading={loading}>{course && course.otec.address}</Text>
            </LabeledRow>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <LabeledRow label="Fecha de creación">
            <Text loading={loading}>
              {course ? formatDate(course.createDate) : ''}
            </Text>
          </LabeledRow>
          <LabeledRow label="Relator">
            <Text loading={loading}>
              {course && course.instructor
                ? `${course.instructor.names} ${course.instructor.paternalSurname}`
                : 'Sin relator'}
            </Text>
          </LabeledRow>
          <LabeledRow label="Creador por">
            <Box display="flex" alignItems="center">
              <Avatar
                style={{
                  backgroundColor: generateColor(),
                  marginRight: '8px'
                }}
              >
                {course && course.createdBy.names.charAt(0)}
              </Avatar>
              <Text loading={loading}>
                {course &&
                  `${course.createdBy.names} ${course.createdBy.paternalSurname}`}
              </Text>
            </Box>
          </LabeledRow>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Details
