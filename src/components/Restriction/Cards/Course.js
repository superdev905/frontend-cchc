import { Box, Grid } from '@material-ui/core'
import { formatCurrency } from '../../../formatters'
import { LabeledRow, Text } from '../../UI'

const Course = ({ restriction }) => (
  <Box>
    <Grid container>
      <Grid item xs={12} md={6}>
        <LabeledRow label={'OTEC'}>
          <Text>{restriction.otecName}</Text>
        </LabeledRow>
        <LabeledRow label={'Relator'}>
          <Text>{restriction.instructorName}</Text>
        </LabeledRow>
        <LabeledRow label={'Lugar'}>
          <Text>{restriction.place}</Text>
        </LabeledRow>
        <LabeledRow label={'Modalidad'}>
          <Text>{restriction.modality}</Text>
        </LabeledRow>
        <LabeledRow label={'Participantes'}>
          <Text>{restriction.participants}</Text>
        </LabeledRow>
        <LabeledRow label={'Horas curso'}>
          <Text>{restriction.courseHours}</Text>
        </LabeledRow>
      </Grid>
      <Grid item xs={12} md={6}>
        <LabeledRow label={'Nombre del oficio'}>
          <Text>{restriction.occupationName}</Text>
        </LabeledRow>
        <LabeledRow label={'Responsable fundacion'}>
          <Text>{restriction.assignedTo}</Text>
        </LabeledRow>
        <LabeledRow label={'Costo de matricula'}>
          <Text>{formatCurrency(restriction.enrollCost)}</Text>
        </LabeledRow>
      </Grid>
    </Grid>
  </Box>
)

export default Course
