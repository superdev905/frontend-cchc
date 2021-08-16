import { useEffect, useState } from 'react'
import { startOfDay, subDays } from 'date-fns'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid } from '@material-ui/core'
import assistanceActions from '../../state/actions/assistance'
import { Button, SearchInput, Wrapper } from '../UI'
import { DataTable } from '../Shared'
import { formatDate } from '../../formatters'

const EventList = () => {
  const history = useHistory()
  const [currentDate] = useState(new Date())
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const [filters, setFilters] = useState({
    page: 1,
    size: 30,
    status: 'PROGRAMADA',
    search: '',
    user_id: user?.id,
    start_date: new Date(subDays(startOfDay(currentDate), 1)).toISOString()
  })
  const { listEvents, totalEvents: totalPages } = useSelector(
    (state) => state.assistance
  )

  const dispatch = useDispatch()
  const launchCalendar = () => {
    history.push('/calendar')
  }

  const fetchList = () => {
    setLoading(true)
    dispatch(
      assistanceActions.getEvents({ ...filters, search: filters.search.trim() })
    ).then(() => {
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
          <Grid container>
            <Grid item xs={12} md={5}>
              <SearchInput
                value={filters.search}
                onChange={(e) => {
                  setFilters({ ...filters, search: e.target.value })
                }}
                placeholder={'Buscar por: Título, Empresa, Obra'}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={launchCalendar} size="small">
                  Revisar calendario
                </Button>
              </Box>
            </Grid>
          </Grid>

          <DataTable
            emptyMessage={
              filters.search
                ? `No se encontraron resultados para: ${filters.search}`
                : 'No hay visitas registradas'
            }
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
              setFilters({ ...filters, page })
            }}
            paginationTotalRows={totalPages}
          />
        </Wrapper>
      </Box>
    </Box>
  )
}

export default EventList
