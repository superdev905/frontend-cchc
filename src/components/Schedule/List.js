import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Grid } from '@material-ui/core'
import { DataTable } from '../Shared'
import { ActionsTable, Button, SearchInput, Wrapper } from '../UI'

const List = () => {
  const [loading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [filters, setFilters] = useState({
    page: 1,
    size: 30,
    search: ''
  })
  const history = useHistory()

  const handleRowClick = (id) => {
    history.push(`/schedule/${id}`)
  }

  useEffect(() => {
    setTotalPages(0)
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
          data={[]}
          progressPending={loading}
          columns={[
            {
              name: 'Fecha',
              selector: (row) => row.dateEvent,
              sortable: true
            },
            {
              name: 'Empresa',
              selector: (row) => row.businessName,
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
