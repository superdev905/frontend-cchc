import { Box } from '@material-ui/core'
import { useState } from 'react'
import { formatDate } from '../../formatters'
import { useToggle } from '../../hooks'
import AssistanceDetailsModal from '../Assistance/DetailsModal'
import { DataTable } from '../Shared'
import { ActionsTable } from '../UI'

const AssistanceList = ({ loading, list }) => {
  const { open: openView, toggleOpen: toggleOpenView } = useToggle()
  const [currentData, setCurrentData] = useState(null)
  console.log(list)
  return (
    <Box>
      <Box>
        <DataTable
          emptyMessage="No existen detalles de atención "
          progressPending={loading}
          columns={[
            {
              name: 'Fecha',
              selector: (row) => formatDate(row.date)
            },
            {
              name: 'Nombre de Obra',
              selector: (row) => row?.construction_name || 'Sin obra'
            },
            {
              name: 'Sistema de origen',
              selector: (row) => row.source_system,
              hide: 'md'
            },
            {
              name: 'Area',
              selector: (row) => row.area_name,
              hide: 'md'
            },
            {
              name: 'Lugar de atención',
              selector: (row) => row.attention_place,
              hide: 'md'
            },
            {
              name: 'Método de contacto',
              selector: (row) => row.contact_method,
              hide: 'md'
            },
            {
              name: '',
              right: true,
              cell: (row) => (
                <ActionsTable
                  {...row}
                  onView={() => {
                    setCurrentData(row)
                    toggleOpenView()
                  }}
                />
              )
            }
          ]}
          data={list}
          pagination
        />
      </Box>
      {currentData && openView && (
        <AssistanceDetailsModal
          open={openView}
          onClose={toggleOpenView}
          assistanceId={currentData.id}
        />
      )}
    </Box>
  )
}

export default AssistanceList
