import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, Grid } from '@material-ui/core'
import scheduleActions from '../../state/actions/schedule'
import { DataTable } from '../Shared'
import { ActionsTable, Button, SearchInput, StatusChip, Wrapper } from '../UI'
import { formatDate, formatSearchWithRut } from '../../formatters'

const List = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState({
    page: 1,
    size: 10,
    search: ''
  })
  const history = useHistory()
  const { list, totalPages } = useSelector((state) => state.schedule)

  const handleRowClick = (id) => {
    history.push(`/schedule/${id}`)
  }

  const fetchSchedules = () => {
    setLoading(true)
    dispatch(scheduleActions.getSchedules(query)).then(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchSchedules()
  }, [query])

  return (
    <Wrapper>
      <Box display="flex">
        <Grid container alignItems="center">
          <Grid item xs={12} md={6} lg={5}>
            <SearchInput
              value={query.search}
              onChange={(e) =>
                setQuery({
                  ...query,
                  search: formatSearchWithRut(e.target.value)
                })
              }
              placeholder="Buscar por: RUT, Nombre de empresa"
            />
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
            query.search
              ? `No se encontraron resultados para: ${query.search}`
              : 'Lista vacía'
          }
          data={list}
          progressPending={loading}
          columns={[
            {
              name: 'Fecha de programación',
              selector: (row) => formatDate(row.date, {})
            },
            {
              name: 'RUT',
              selector: (row) => row.businessRut
            },
            {
              name: 'Empresa',
              selector: (row) => row.businessName.toUpperCase(),
              sortable: true
            },
            {
              name: 'Periodo',
              selector: (row) => row.period,
              sortable: true
            },
            {
              name: 'Enviado',
              selector: (row) =>
                row.sendStatus ? (
                  <StatusChip
                    success={row.sendStatus.status === 'SI'}
                    error={row.sendStatus.status !== 'SI'}
                    label={row.sendStatus.status}
                  />
                ) : (
                  '--'
                ),
              center: true
            },
            {
              name: 'Aprobado',
              selector: (row) =>
                row.approbation ? (
                  <StatusChip
                    success={row.approbation.status === 'SI'}
                    error={row.approbation.status !== 'SI'}
                    label={row.approbation.status}
                  />
                ) : (
                  '--'
                ),
              center: true
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
          paginationRowsPerPageOptions={[10, 20, 30, 40]}
          paginationPerPage={query.size}
          onChangeRowsPerPage={(limit) => {
            setQuery({ ...query, size: limit })
          }}
          onChangePage={(page) => {
            setQuery({ ...query, page })
          }}
          paginationTotalRows={totalPages}
        />
      </Box>
    </Wrapper>
  )
}

export default List
