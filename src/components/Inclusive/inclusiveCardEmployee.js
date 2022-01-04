import { Box, Typography } from '@material-ui/core'
import { LabeledRow, Text } from '../UI'

const InclusiveCardEmployee = () => (
  <Box>
    <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
      Datos personales trabajador
    </Typography>

    <LabeledRow label="Rut:">
      <Text> 20.122.171-4</Text>
    </LabeledRow>
    <LabeledRow label="Nombre :">
      <Text> nn</Text>
    </LabeledRow>
    <LabeledRow label="Apellido Paterno :">
      <Text>garrido</Text>
    </LabeledRow>

    <LabeledRow label="Apellido Materno :">
      <Text>martin</Text>
    </LabeledRow>

    <LabeledRow label="Sexo:">
      <Text>masculino</Text>
    </LabeledRow>
  </Box>
)

export default InclusiveCardEmployee
