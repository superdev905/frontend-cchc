import { Box, Grid } from '@material-ui/core'
import { formatCurrency } from '../../../formatters'
import { LabeledRow, Text } from '../../UI'

const General = ({ restriction }) => (
  <Box>
    <Grid container>
      <Grid item xs={12} md={6}>
        <LabeledRow label={'Nacionalidad'}>
          <Text>{restriction.nationalityName || 'NO APLICA'}</Text>
        </LabeledRow>
        <LabeledRow label={'RSH'}>
          <Text>{restriction.rshName || 'NO APLICA'}</Text>
        </LabeledRow>
        <LabeledRow label={'Carga legal'}>
          <Text>{restriction.legalCharge || 'NO APLICA'}</Text>
        </LabeledRow>
        <LabeledRow label={'Prevision'}>
          <Text>{restriction.prevision || 'NO APLICA'}</Text>
        </LabeledRow>
        <LabeledRow label={'Mayor de edad'}>
          <Text>{restriction.isAdult || 'NO APLICA'}</Text>
        </LabeledRow>
        <LabeledRow label={'Pertenece a Reconocer'}>
          <Text>{restriction.belongsToReconocer || 'NO APLICA'}</Text>
        </LabeledRow>
      </Grid>
      <Grid item xs={12} md={6}>
        <LabeledRow label={'Sexo'}>
          <Text>{restriction.gender || 'NO APLICA'}</Text>
        </LabeledRow>
        <LabeledRow label={'Tipo de actividad'}>
          <Text>{restriction.activityType || 'NO APLICA'}</Text>
        </LabeledRow>
        <LabeledRow label={'Quien inscribe'}>
          <Text>{restriction.inscriber || 'NO APLICA'}</Text>
        </LabeledRow>
        <LabeledRow label={'Financiamiento'}>
          <Text>{restriction.funding || 'NO APLICA'}</Text>
        </LabeledRow>
        <LabeledRow label={'Renta máxima'}>
          <Text>{formatCurrency(restriction.maxSalary) || 'NO APLICA'}</Text>
        </LabeledRow>
      </Grid>
    </Grid>
  </Box>
)

General.propTypes = {}

export default General
