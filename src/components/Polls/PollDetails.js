import { useSelector } from 'react-redux'
import { Box, Grid, Chip } from '@material-ui/core'
import { LabeledRow, StatusChip, Text } from '../UI'
import { formatDate, formatText } from '../../formatters'

const PollDetails = ({ fetching }) => {
  const { poll } = useSelector((state) => state.poll)

  return (
    <Box p={2}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <LabeledRow label="Fecha de inicio:">
              <Text loading={fetching}>
                {poll ? formatDate(poll.start_date) : ''}
              </Text>
            </LabeledRow>
            <LabeledRow label="Fecha de fin:">
              <Text loading={fetching}>
                {poll ? formatDate(poll.end_date) : ''}
              </Text>
            </LabeledRow>
            <LabeledRow label="Creado por:">
              <Text loading={fetching}>{poll?.created_by}</Text>
            </LabeledRow>
          </Grid>
          <Grid item xs={12} md={6}>
            <LabeledRow label="Estado:">
              <Text loaderWidth="80%" loading={fetching}>
                {poll && (
                  <StatusChip
                    success={poll.status === 'VIGENTE'}
                    error={poll.status === 'NO_VIGENTE'}
                    label={formatText.capitalizeString(poll.status)}
                  />
                )}
              </Text>
            </LabeledRow>
            <LabeledRow label="Módulos:">
              <Text loaderWidth="80%" loading={fetching}>
                {poll &&
                  poll.modules.map((item, index) => (
                    <Chip
                      style={{ marginRight: '5px' }}
                      color="primary"
                      key={`module-chip-${item.id}-${index}`}
                      label={formatText.capitalizeString(item.module_name)}
                    />
                  ))}
              </Text>
            </LabeledRow>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default PollDetails
