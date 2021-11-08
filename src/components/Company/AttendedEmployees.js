import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import assistanceActions from '../../state/actions/assistance'
import { ActionsTable, Wrapper } from '../UI'
import { DataTable } from '../Shared'
import useStyles from './styles'
import { formatDate } from '../../formatters'

const AttendedEmployees = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { idCompany } = useParams()
  const [totalItems, setTotalItems] = useState(0)
  const [filters, setFilters] = useState({ page: 1, size: 30 })
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)

  const onViewClick = (item) => {
    console.log(item)
  }

  useEffect(() => {
    setLoading(true)
    dispatch(
      assistanceActions.getAttendedEmployeeByBusiness({
        business_id: idCompany,
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
  }, [])

  return (
    <Box>
      <Wrapper>
        <Box display="flex" justifyContent="space-between">
          <Typography className={classes.heading}>
            Trabajadores atendidos
          </Typography>
        </Box>

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
                selector: (row) =>
                  `${row.employee_name} ${row.employee_lastname}`
              },
              {
                name: 'Area',
                selector: (row) => row.area_name
              },
              {
                name: '',
                right: true,
                cell: (row) => (
                  <ActionsTable {...row} onView={() => onViewClick(row)} />
                )
              }
            ]}
            data={tableData}
            pagination
            paginationRowsPerPageOptions={[30, 40]}
            paginationPerPage={filters.size}
            paginationServer={true}
            onChangeRowsPerPage={(limit) => {
              setFilters({ ...filters, size: limit })
            }}
            onChangePage={(page) => {
              setFilters({ ...filters, page })
            }}
            paginationTotalRows={totalItems}
          />
        </Box>
      </Wrapper>
    </Box>
  )
}

export default AttendedEmployees
