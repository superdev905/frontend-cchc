import { Box } from '@material-ui/core'
import { DataTable } from '../Shared'

const QuestionList = () => (
  <Box>
    <Box mt={2}>
      <DataTable
        columns={[
          {
            name: 'N°',
            selector: (row) => row.number,
            sortable: true
          },
          {
            name: 'Estado',
            selector: (row) => row.state,
            sortable: true
          },
          {
            name: 'Fecha',
            selector: (row) => row.date,
            sortable: true
          },
          {
            name: 'Area',
            selector: (row) => row.area
          },
          {
            name: 'Profesional',
            selector: (row) => row.pro,
            sortable: true
          }
        ]}
      />
    </Box>
  </Box>
)

export default QuestionList
