import { useState, useEffect } from 'react'
import { Grid, Box } from '@material-ui/core'
import { formatDate } from '../../formatters'
import { DataTable } from '../Shared'
import { PageHeading, Wrapper, Button } from '../UI'
import GraphPie from './GraphPie'
import { useMenu } from '../../hooks'
import FiltersMenu from './FilterMenu'

const ScholarshipGraphs = () => {
  const {
    open: openfilters,
    handleOpen: handleOpenfilters,
    handleClose: handleClosefilters,
    anchorEl: anchorElfilters
  } = useMenu()
  const [filters, setFilters] = useState({
    scholarshipType: '',
    startDate: '',
    endDate: '',
    status: ''
  })

  const data = [
    {
      id: 'elixir',
      label: 'elixir',
      value: 432,
      color: 'hsl(58, 70%, 50%)'
    },
    {
      id: 'make',
      label: 'make',
      value: 160,
      color: 'hsl(219, 70%, 50%)'
    },
    {
      id: 'php',
      label: 'php',
      value: 229,
      color: 'hsl(197, 70%, 50%)'
    },
    {
      id: 'rust',
      label: 'rust',
      value: 516,
      color: 'hsl(111, 70%, 50%)'
    },
    {
      id: 'stylus',
      label: 'stylus',
      value: 531,
      color: 'hsl(117, 70%, 50%)'
    }
  ]

  useEffect(() => {
    /* fetch */
    console.log(filters)
  }, [filters])

  return (
    <Wrapper>
      <Box display={'flex'} justifyContent={'space-between'}>
        <PageHeading>Reportes becas</PageHeading>
        <Button onClick={handleOpenfilters}>Filtros</Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <GraphPie data={data} />
        </Grid>
        <Grid item xs={8}>
          <DataTable
            progressPending={true}
            /*         emptyMessage={
          filters.search
            ? `No se encontraron resultados para:`
            : 'Aún no hay becas aprobadas'
        } */
            highlightOnHover
            pointerOnHover
            columns={[
              {
                name: 'Fecha de aprobación',
                selector: (row) => formatDate(row.date)
              },
              {
                name: 'Nombre del beneficiario',
                selector: (row) => row.postulation.beneficiaryNames,
                sortable: true
              },
              {
                name: 'Trabajador',
                selector: (row) => row.postulation.employeeNames,
                hide: 'md'
              },
              {
                name: 'Empresa',
                selector: (row) => row.postulation.businessName,
                hide: 'md'
              },
              {
                name: 'Tipo de beca',
                selector: (row) => row.postulation.scholarshipType.name,
                hide: 'md'
              }
            ]}
            data={[]}
            pagination
            /* onRowClicked={} */
            paginationRowsPerPageOptions={[30, 40]}
            /* paginationPerPage={filters.limit} */
            paginationServer={true}
            /* onChangeRowsPerPage={(limit) => {
          setFilters({ ...filters, limit })
        }}
        onChangePage={(page) => {
          setFilters({ ...filters, skip: page })
        }} */
            paginationTotalRows={0}
          />
        </Grid>
      </Grid>
      <FiltersMenu
        open={openfilters}
        onClose={handleClosefilters}
        anchorEl={anchorElfilters}
        filters={filters}
        setFilters={setFilters}
      />
    </Wrapper>
  )
}

export default ScholarshipGraphs
