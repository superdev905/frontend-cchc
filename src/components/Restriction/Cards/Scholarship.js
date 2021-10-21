import { Box, Grid } from '@material-ui/core'
import { LabeledRow, Text } from '../../UI'

const Scholarship = ({ restriction }) => (
  <Box>
    <Grid container>
      <Grid item xs={12} md={6}>
        <LabeledRow label={'Promedio del ultimo año'} width={200}>
          <Text>{restriction.averageLastYear}</Text>
        </LabeledRow>
        <LabeledRow label={'Semestre'} width={200}>
          <Text>{restriction.semester}</Text>
        </LabeledRow>
      </Grid>
      <Grid item xs={12} md={6}>
        <LabeledRow label={'Nombre de carrera'} width={200}>
          <Text>{restriction.careerName}</Text>
        </LabeledRow>
        <LabeledRow label={'Seguimiento'} width={200}>
          <Text>{restriction.tracking}</Text>
        </LabeledRow>
      </Grid>
    </Grid>
  </Box>
)

export default Scholarship
