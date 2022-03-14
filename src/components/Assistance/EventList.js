import { useEffect, useState } from 'react'
import { startOfWeek, subDays } from 'date-fns'
import { useHistory } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, IconButton } from '@material-ui/core'
import assistanceActions from '../../state/actions/assistance'
import { Button, SearchInput, Wrapper } from '../UI'
import { DataTable } from '../Shared'
import { formatDate, formatHours } from '../../formatters'
import VisitStatusChip from './VisitStatusChip'

const EventList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const [looking, setLooking] = useState(false)
  const { user } = useSelector((state) => state.auth)

  const filterDate = (currentDate, days) => {
    currentDate.setDate(currentDate.getDate() + days)
    return currentDate
  }

  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    status: 'PROGRAMADA',
    search: '',
    user_id: user?.id,
    start_date: new Date(
      subDays(startOfWeek(filterDate(new Date(), -30)), 1)
    ).toISOString()
  })
  const { listEvents, totalEvents: totalPages } = useSelector(
    (state) => state.assistance
  )

  const launchCalendar = () => {
    history.push('/calendar')
  }
  const launchVisitsToClose = () => {
    history.push('/visits-close')
  }

  const changePage = (page) => {
    setFilters({ ...filters, page })
    setLoading(true)
    dispatch(assistanceActions.getEvents({ ...filters, page })).then(() => {
      setLoading(false)
    })
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

  const searchButton = () => {
    setLooking(true)
    fetchList()
  }

  useEffect(() => {
    setTableData(
      listEvents.map((item) => ({
        ...item,
        dateEvent: formatDate(item.date, {}),
        startHour: `${formatHours(item.start_date)} - ${formatHours(
          item.end_date
        )}`
      }))
    )
  }, [listEvents])

  useEffect(() => {
    if (setLooking(true)) {
      fetchList()
    }
  }, [filters])

  return (
    <Box>
      <Box marginTop="10px">
        <Wrapper>
          <Grid container>
            <Grid item xs={12} md={5}>
              <SearchInput
                value={filters.search}
                status={looking}
                onChange={(e) => {
                  setFilters({ ...filters, search: e.target.value })
                }}
                placeholder={'Buscar por: Título, Empresa, Obra'}
              >
                <IconButton onClick={searchButton}>
                  <SearchIcon color="primary" fontSize="large" />
                </IconButton>
              </SearchInput>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={launchVisitsToClose}>
                  Visitas por cerrar
                </Button>
                <Button onClick={launchCalendar}>Revisar calendario</Button>
              </Box>
            </Grid>
          </Grid>

          <DataTable
            emptyMessage={
              filters.search
                ? `Buscando Visita : ${filters.search}`
                : 'Para encontrar Visitas utilice el buscador'
            }
            data={tableData}
            progressPending={loading}
            highlightOnHover
            pointerOnHover
            columns={[
              {
                name: 'Fecha',
                selector: (row) => row.dateEvent,
                sortable: true
              },
              {
                name: 'Hora',
                selector: (row) => row.startHour,
                sortable: true
              },
              {
                name: 'Estado',
                selector: (row) => (
                  <Box>
                    <VisitStatusChip visit={row} />
                  </Box>
                )
              },
              {
                name: 'Titulo',
                selector: (row) => row.title
              },
              {
                name: 'Empresa',
                selector: (row) => row.business_name
              },
              {
                name: 'Obra',
                selector: (row) => row.construction_name,
                hide: 'md'
              }
            ]}
            pagination
            paginationServer={true}
            onRowClicked={onRowClick}
            paginationRowsPerPageOptions={[10, 20, 30, 40]}
            paginationPerPage={filters.size}
            onChangeRowsPerPage={(limit) => {
              setFilters({ ...filters, size: limit })
            }}
            onChangePage={changePage}
            paginationTotalRows={totalPages}
          />
        </Wrapper>
      </Box>
    </Box>
  )
}

export default EventList
