import { Box, Grid } from '@material-ui/core'
import { formatCurrency } from '../../../formatters'
import { LabeledRow, Text } from '../../UI'

const General = ({ restriction }) => (
  <Box>
    <Grid container>
      <Grid item xs={12} md={6}>
        <LabeledRow label={'Nacionalidad'}>
          <Text>{restriction.nationalityName}</Text>
        </LabeledRow>
        <LabeledRow label={'RSH'}>
          <Text>{restriction.rshName}</Text>
        </LabeledRow>
        <LabeledRow label={'Carga legal'}>
          <Text>{restriction.legalCharge}</Text>
        </LabeledRow>
        <LabeledRow label={'Prevision'}>
          <Text>{restriction.prevision}</Text>
        </LabeledRow>
        <LabeledRow label={'Mayo de edad'}>
          <Text>{restriction.isAdult}</Text>
        </LabeledRow>
        <LabeledRow label={'Pertenece a Reconocer'}>
          <Text>{restriction.belongsToReconocer}</Text>
        </LabeledRow>
      </Grid>
      <Grid item xs={12} md={6}>
        <LabeledRow label={'Sexo'}>
          <Text>{restriction.gender}</Text>
        </LabeledRow>
        <LabeledRow label={'Tipo de actividad'}>
          <Text>{restriction.activityType}</Text>
        </LabeledRow>
        <LabeledRow label={'Quien inscribe'}>
          <Text>{restriction.inscriber}</Text>
        </LabeledRow>
        <LabeledRow label={'Financiamiento'}>
          <Text>{restriction.funding}</Text>
        </LabeledRow>
        <LabeledRow label={'Renta máxima'}>
          <Text>{formatCurrency(restriction.maxSalary)}</Text>
        </LabeledRow>
      </Grid>
    </Grid>
  </Box>
)

General.propTypes = {}

export default General
