import { Box } from '@material-ui/core'
import { LabeledRow } from '../UI'

const CompanyCard = ({ company }) => (
  <Box>
    <LabeledRow label="Rut: ">{company?.rut}</LabeledRow>
    <LabeledRow label="Razón social: ">
      {company?.business_name || company?.businessName}
    </LabeledRow>
    <LabeledRow label="Dirección: ">{company?.address}</LabeledRow>
    <LabeledRow label="Region: ">{company?.region?.name}</LabeledRow>
    <LabeledRow label="Comuna: ">{company?.commune?.name}</LabeledRow>
    <LabeledRow label="Tipo: ">{company?.type}</LabeledRow>
  </Box>
)

export default CompanyCard
