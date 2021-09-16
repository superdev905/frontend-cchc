import { useSelector } from 'react-redux'
import { Box, Grid, Chip } from '@material-ui/core'
import { LabeledRow, StatusChip, Text } from '../UI'
import { formatDate, formatText } from '../../formatters'

const ApplicationDetails = ({ fetching }) => {
  const { application } = useSelector((state) => state.scholarships)

  return (
    <Box p={2}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <LabeledRow label="Fecha de postulación:">
              <Text loading={fetching}>
                {application ? formatDate(application.date) : ''}
              </Text>
            </LabeledRow>
          </Grid>
          <Grid item xs={12} md={6}>
            <LabeledRow label="Estado:">
              <Text loaderWidth="80%" loading={fetching}>
                {application && (
                  <StatusChip
                    success={application.status === 'APROBADA'}
                    error={application.status === 'RECHAZADA'}
                    label={formatText.capitalizeString(application.status)}
                  />
                )}
              </Text>
            </LabeledRow>
          </Grid>
          <Grid item xs={12} md={6}>
            <LabeledRow label="Trabajador">
              <Text loading={loading}> {application?.employeeName}</Text>
            </LabeledRow>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default ApplicationDetails
