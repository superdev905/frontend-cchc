import { useEffect, useState } from 'react'
import { startOfDay } from 'date-fns'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import assistanceActions from '../../state/actions/assistance'
import { Button, Wrapper } from '../UI'
import { DataTable } from '../Shared'
import { formatDate } from '../../formatters'

const EventList = () => {
  const history = useHistory()
  const [currentDate] = useState(new Date())
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const [filters, setFilters] = useState({
    skip: 0,
    size: 30,
    status: 'PROGRAMADA',
    user_id: user?.id,
    start_date: new Date(startOfDay(currentDate)).toISOString()
  })
  const { listEvents, totalEvents: totalPages } = useSelector(
    (state) => state.assistance
  )

  const dispatch = useDispatch()
  const launchCalendar = () => {
    history.push('/calendar')
  }

  const assistanceTypes = () => {
    history.push('/assistance-type')
  }

  const fetchList = () => {
    setLoading(true)
    dispatch(assistanceActions.getEvents(filters)).then(() => {
      setLoading(false)
    })
  }

  const onRowClick = (row) => {
    history.push(`/visit/${row.id}`)
  }

  useEffect(() => {
    setTableData(
      listEvents.map((item) => ({
        ...item,
        dateEvent: formatDate(item.date, {})
      }))
    )
  }, [listEvents])

  useEffect(() => {
    fetchList()
  }, [filters])

  return (
    <Box>
      <Box marginTop="10px">
        <Wrapper>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={launchCalendar} size="small">
              Revisar calendario
            </Button>
          </Box>
          <DataTable
            data={tableData}
            progressPending={loading}
            highlightOnHover
            pointerOnHover
            columns={[
              {
                name: 'Fecha',
                selector: 'dateEvent',
                sortable: true
              },
              {
                name: 'Estado',
                selector: 'status'
              },
              {
                name: 'Titulo',
                selector: 'title'
              },
              {
                name: 'Empresa',
                selector: 'business_name'
              },
              {
                name: 'Obra',
                selector: 'construction_name',
                hide: 'md'
              }
            ]}
            pagination
            paginationServer={true}
            onRowClicked={onRowClick}
            paginationRowsPerPageOptions={[30, 40]}
            paginationPerPage={filters.size}
            onChangeRowsPerPage={(limit) => {
              setFilters({ ...filters, size: limit })
            }}
            onChangePage={(page) => {
              setFilters({ ...filters, skip: page })
            }}
            paginationTotalRows={totalPages}
          />
        </Wrapper>
      </Box>

      <Box display="flex" justifyContent="flex-end">
        <Button onClick={assistanceTypes} size="small">
          Atenciones en Obras
        </Button>
      </Box>
    </Box>
  )
}

export default EventList
