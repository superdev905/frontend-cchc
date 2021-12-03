import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, Grid } from '@material-ui/core'
import scheduleActions from '../../state/actions/schedule'
import { DataTable } from '../Shared'
import { ActionsTable, Button, SearchInput, Wrapper } from '../UI'
import { formatDate } from '../../formatters'

const List = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    page: 1,
    size: 30,
    search: ''
  })
  const history = useHistory()
  const { list, totalPages } = useSelector((state) => state.schedule)

  const handleRowClick = (id) => {
    history.push(`/schedule/${id}`)
  }

  const fetchSchedules = () => {
    setLoading(true)
    dispatch(scheduleActions.getSchedules(filters)).then(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchSchedules()
  }, [])

  return (
    <Wrapper>
      <Box display="flex">
        <Grid container alignItems="center">
          <Grid item xs={12} md={6} lg={5}>
            <SearchInput placeholder="Buscar por: Nombre de empresa" />
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <Box textAlign="right">
              <Button
                onClick={() => {
                  history.push(`/schedule/new`)
                }}
              >
                Nuevo
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mt={2}>
        <DataTable
          emptyMessage={
            filters.search
              ? `No se encontraron resultados para: ${filters.search}`
              : 'Lista vacía'
          }
          data={list}
          progressPending={loading}
          columns={[
            {
              name: 'Fecha de programación',
              selector: (row) => formatDate(row.date),
              sortable: true
            },
            {
              name: 'Empresa',
              selector: (row) => row.businessName,
              sortable: true
            },
            {
              name: 'Periodo',
              selector: (row) => row.period,
              sortable: true
            },
            {
              name: 'Beneficios programados',
              selector: (row) => row.benefits.length
            },
            {
              name: 'Estado',
              selector: () => <Box>aaa</Box>
            },

            {
              name: '',
              right: true,
              selector: (row) => (
                <ActionsTable onView={() => handleRowClick(row.id)} />
              )
            }
          ]}
          pagination
          highlightOnHover
          pointerOnHover
          onRowClicked={(row) => handleRowClick(row.id)}
          paginationServer={true}
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
      </Box>
    </Wrapper>
  )
}

export default List
