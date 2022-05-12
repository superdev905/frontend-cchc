import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { Wrapper } from '../UI'
import { DataTable } from '../Shared'
import { formatDate } from '../../formatters'
import assistanceActions from '../../state/actions/assistance'

const Historial = ({ business_id, construction_id }) => {
  const [totalItems, setTotalItems] = useState(0)
  const [filters, setFilters] = useState({ page: 1, size: 10 })
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    dispatch(
      assistanceActions.getAttendedEmployeeByBusinessAndConstruction({
        business_id,
        construction_id,
        ...filters
      })
    )
      .then((result) => {
        setLoading(false)
        setTotalItems(result.total)
        setTableData(
          result.items.map((item) => ({
            ...item,
            createDate: new Date(item.created_at).toLocaleDateString('es-CL', {
              dateStyle: 'long'
            })
          }))
        )
      })
      .catch(() => {
        setLoading(false)
      })
  }, [filters])

  return (
    <Wrapper>
      <Typography
        style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}
      >
        Historial de Trabajadores Atendidos
      </Typography>
      <Box>
        <DataTable
          progressPending={loading}
          emptyMessage={'Esta empresa no tiene trabajadores atendidos'}
          columns={[
            {
              name: 'Sistema de origen',
              selector: (row) => row.source_system
            },
            {
              name: 'Fecha',
              selector: (row) => formatDate(row.date, {})
            },
            {
              name: 'Obra',
              selector: (row) => row.construction_name
            },
            {
              name: 'Visita',
              selector: (row) => `Visita ${row.visit_id}`
            },
            {
              name: 'Trabajador',
              selector: (row) => `${row.employee_name} ${row.employee_lastname}`
            },
            {
              name: 'Area',
              selector: (row) => row.area_name
            }
          ]}
          data={tableData}
          pagination
          paginationRowsPerPageOptions={[10, 20]}
          paginationServer={true}
          onChangeRowsPerPage={(limit) => {
            setFilters({ page: 1, size: limit })
          }}
          onChangePage={(page) => {
            setFilters({ ...filters, page })
          }}
          paginationTotalRows={totalItems}
        />
      </Box>
    </Wrapper>
  )
}

export default Historial
