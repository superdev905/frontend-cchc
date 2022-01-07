import { Box, Typography } from '@material-ui/core'
import { LabeledRow, Text } from '../UI'

const InclusiveCardInterlocutor = () => (
  <Box>
    <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
      Datos Interlocutor
    </Typography>

    <LabeledRow label="Nombre: ">
      <Text> jhjh </Text>
    </LabeledRow>
    <LabeledRow label="Correo :">
      <Text> jfjfd@gmail.com</Text>
    </LabeledRow>
    <LabeledRow label="Teléfono :">
      <Text> 34589898</Text>
    </LabeledRow>
  </Box>
)

export default InclusiveCardInterlocutor
