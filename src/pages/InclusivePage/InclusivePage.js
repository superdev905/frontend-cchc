import { Box } from '@material-ui/core'
import { PageHeading, Wrapper } from '../../components/UI'
import { DataTable } from '../../components/Shared'
import Inclusive from '../../components/Inclusive/Inclusive'
import InclusiveDashboard from '../../components/Inclusive/InclusiveDashboard'

const InclusivePage = () => (
  <Box>
    <PageHeading>Casos Sociales de Inclusión</PageHeading>
    <Box mt={1} mb={2}>
      <InclusiveDashboard />
    </Box>
    <Wrapper>
      <Box my={1}>
        <Inclusive />
      </Box>
      <Box mt={2} width="100%">
        <DataTable
          selectableRows
          columns={[
            {
              name: 'N°',
              width: '80px',
              sortable: true,
              compact: true
            },
            {
              name: 'Estado',
              compact: true,
              maxWidth: '120px'
            },
            {
              name: 'Fecha',
              sortable: true,
              compact: true
            },
            {
              name: 'Profesional',
              sortable: true,
              compact: true
            }
          ]}
          pagination
          expandableRows
          expandOnRowClicked
          expandableRowsHideExpander
          selectableRowsHighlight
        />
      </Box>
    </Wrapper>
  </Box>
)

export default InclusivePage
