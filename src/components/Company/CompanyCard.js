import { Box } from '@material-ui/core'
import { LabeledRow, Text } from '../UI'

const CompanyCard = ({ company, loading }) => (
  <Box>
    <LabeledRow label="Rut: ">
      <Text loading={loading}>{company?.rut}</Text>
    </LabeledRow>
    <LabeledRow label="Razón social: ">
      <Text loading={loading}>
        <a href={`/company/${company?.id}/details`} target={'_blank'}>
          {company?.business_name || company?.businessName}
        </a>
      </Text>
    </LabeledRow>
    <LabeledRow label="Dirección: ">
      <Text loading={loading}>{company?.address}</Text>
    </LabeledRow>
    <LabeledRow label="Region: ">
      <Text loading={loading}>{company?.region?.name}</Text>
    </LabeledRow>
    <LabeledRow label="Comuna: ">
      <Text loading={loading}>{company?.commune?.name}</Text>
    </LabeledRow>
    {company?.type && (
      <LabeledRow label="Tipo: ">
        <Text loading={loading}>{company?.type}</Text>
      </LabeledRow>
    )}
  </Box>
)

export default CompanyCard
