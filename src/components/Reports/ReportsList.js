import { useState } from 'react'
import { Box, Grid } from '@material-ui/core'
import { Select, Wrapper, SearchInput, ActionsTable } from '../UI'
import { useToggle } from '../../hooks'
import { DataTable } from '../Shared'
import ReportDialog from './ReportDialog'

const ReportsList = () => {
  const { open, toggleOpen } = useToggle()
  const [filters, setFilters] = useState({
    page: 1,
    size: 30,
    search: '',
    status: ''
  })
  const handleModuleChange = (e) => {
    setFilters({ ...filters, status: e.target.value })
  }

  return (
    <Wrapper>
      <Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={2}>
            <Select name="module" onChange={handleModuleChange}>
              <option value="">Seleccione Módulo</option>
              {['Atenciones', 'Calendario'].map((item, i) => (
                <option key={`gender-${i}-${item}`} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={4}>
            <SearchInput
              value={filters.search}
              placeholder="Buscar por Nombre:"
            />
          </Grid>
        </Grid>
      </Box>
      <DataTable
        emptyMessage={
          filters.search
            ? `No se encontrarion resultador para: ${filters.search}`
            : 'No hay Reportes'
        }
        highlightOnhover
        pointerOnHover
        columns={[
          {
            name: 'Módulo',
            selector: (row) => row.modules
          },
          {
            name: 'Nombre',
            selector: (row) => row.name
          },
          {
            name: 'Disponible',
            selector: (row) => row.available
          },
          {
            name: '',
            right: true,
            cell: () => (
              <ActionsTable
                onDownload={() => {
                  ;<ReportDialog open={open} onClose={toggleOpen} />
                }}
              />
            )
          }
        ]}
        pagination
      />
    </Wrapper>
  )
}

export default ReportsList
