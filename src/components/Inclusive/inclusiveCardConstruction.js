import { Box, Typography } from '@material-ui/core'
import { LabeledRow, Text } from '../UI'

const InclusiveCardConstruction = () => (
  <Box>
    <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
      Obra
    </Typography>

    <LabeledRow label="Nombre:">
      <Text> 20.122.171-4</Text>
    </LabeledRow>

    <LabeledRow label="Rut:">
      <Text> 20.122.171-4</Text>
    </LabeledRow>
    <LabeledRow label="Direccion :">
      <Text> nn</Text>
    </LabeledRow>
    <LabeledRow label="Region :">
      <Text>garrido</Text>
    </LabeledRow>

    <LabeledRow label="Comuna :">
      <Text>martin</Text>
    </LabeledRow>
  </Box>
)

export default InclusiveCardConstruction
