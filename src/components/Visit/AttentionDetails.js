import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import assistanceActions from '../../state/actions/assistance'
import { ActionsTable, Wrapper } from '../UI'
import { DataTable } from '../Shared'
import { formatDate } from '../../formatters'
import { useToggle } from '../../hooks'
import { AssistanceDetailsModal } from '../Assistance'

const AttentionDetails = () => {
  const dispatch = useDispatch()
  const { idVisit, idEmployee } = useParams()
  const [list, setList] = useState([])
  const { open: openDetails, toggleOpen: toggleOpenDetails } = useToggle()
  const [currentData, setCurrentData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchList = () => {
    setLoading(true)
    dispatch(
      assistanceActions.getAttention({
        visit_id: parseInt(idVisit, 10),
        id_employee: idEmployee
      })
    ).then((data) => {
      setLoading(false)
      setList(
        data.map((item) => ({ ...item, stringDate: formatDate(item.date, {}) }))
      )
    })
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <Box width="100%">
      <Wrapper>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
              Detalle de Atención
            </Typography>
          </Box>
        </Box>
        <Box>
          <DataTable
            emptyMessage="No hay existen detalles de atención "
            progressPending={loading}
            columns={[
              {
                name: 'Fecha',
                selector: (row) => row.stringDate
              },
              {
                name: 'Nombre de Obra',
                selector: (row) => row.construction_name
              },
              {
                name: 'Area',
                selector: (row) => row.area_name,
                hide: 'md'
              },
              {
                name: 'Lugar de atención',
                selector: (row) => row.attention_place
              },
              {
                name: 'Método de contacto',
                selector: (row) => row.contact_method
              },
              {
                name: '',
                right: true,
                cell: (row) => (
                  <ActionsTable
                    onView={() => {
                      setCurrentData(row)
                      toggleOpenDetails()
                    }}
                  />
                )
              }
            ]}
            data={list}
            pagination
          />
        </Box>

        {currentData && openDetails && (
          <AssistanceDetailsModal
            open={openDetails}
            assistanceId={currentData.id}
            onClose={toggleOpenDetails}
          />
        )}
      </Wrapper>
    </Box>
  )
}

export default AttentionDetails
