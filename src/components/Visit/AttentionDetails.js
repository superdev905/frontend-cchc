import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import assistanceActions from '../../state/actions/assistance'
import { Wrapper } from '../UI'
import { DataTable } from '../Shared'

const AttentionDetails = () => {
  const dispatch = useDispatch()
  const { idVisit, idEmployee } = useParams()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchList = () => {
    setLoading(true)
    dispatch(
      assistanceActions.getAttention({
        visit_id: idVisit,
        employee_id: idEmployee
      })
    ).then((data) => {
      setList(data)
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
                selector: (row) => row.date,
                sortable: true
              },
              {
                name: 'Nombre de empresa',
                selector: (row) => row.business_name,
                sortable: true
              },
              {
                name: 'Nombre de Obra',
                selector: (row) => row.construction_name,
                sortable: true
              },
              {
                name: 'Area',
                selector: (row) => row.area_id,
                hide: 'md'
              },
              {
                name: 'Plan de Intervención',
                selector: (row) => row.task_id,
                hide: 'md'
              },
              {
                name: 'Gestión',
                selector: (row) => row.management_id,
                hide: 'md'
              },
              {
                name: 'Estado',
                selector: (row) => row.status,
                hide: 'md'
              }
            ]}
            data={list}
            pagination
          />
        </Box>
      </Wrapper>
    </Box>
  )
}

AttentionDetails.propTypes = {}

export default AttentionDetails
