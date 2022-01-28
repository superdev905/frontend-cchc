import { Grid } from '@material-ui/core'
import { LabeledRow, Text } from '../../UI'
import {} from '../../Shared'

const Company = ({ restriction }) => (
  <Grid container>
    <Grid item xs={12} md={6}>
      <LabeledRow label={'Empresa'}>
        <Text>{restriction.businessName}</Text>
      </LabeledRow>
      <LabeledRow label={'Obra'}>
        <Text>{restriction.constructionName}</Text>
      </LabeledRow>
      <LabeledRow label={'Tipo de empresa'}>
        <Text>{restriction.businessType || 'NO APLICA'}</Text>
      </LabeledRow>
      <LabeledRow label={'Servicio social'}>
        <Text>
          {restriction.socialService
            ? `${restriction.socialService ? 'Con' : 'Sin'} Servicio Social`
            : 'NO APLICA'}
        </Text>
      </LabeledRow>
      <LabeledRow label={'Giro de empresa'}>
        <Text>{restriction.businessField || 'NO APLICA'}</Text>
      </LabeledRow>
    </Grid>
    <Grid item xs={12} md={6}>
      <LabeledRow label={'Tipo de trabajador'}>
        <Text>{restriction.employeeType || 'NO APLICA'}</Text>
      </LabeledRow>
      <LabeledRow label={'Cobertura'}>
        <Text>{restriction.coverage || 'NO APLICA'}</Text>
      </LabeledRow>
      <LabeledRow label={'Dirigida a'}>
        <Text>{restriction.target || 'NO APLICA'}</Text>
      </LabeledRow>
      <LabeledRow label={'Oficina regional'}>
        <Text>{restriction.office || 'NO APLICA'}</Text>
      </LabeledRow>
    </Grid>
  </Grid>
)

export default Company
