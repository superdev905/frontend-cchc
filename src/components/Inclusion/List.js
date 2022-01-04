import { Box, Grid } from '@material-ui/core'
import InclusionDialog from './Dialog'
import { useToggle } from '../../hooks'
import { DataTable } from '../Shared'
import { Button, SearchInput } from '../UI'

const List = () => {
  const { open: openCreate, toggleOpen: toggleOpenCreate } = useToggle()
  return (
    <Box>
      <Box mt={2}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={6} lg={5}>
            <SearchInput placeholder="Buscar..." />
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <Box textAlign="right">
              <Button>Filtros</Button>
              <Button onClick={toggleOpenCreate}>Nuevo</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <DataTable
          selectableRows
          columns={[
            {
              name: 'N°',
              width: '80px',
              sortable: true,
              compact: true
            },
            {
              name: 'Estado',
              compact: true,
              maxWidth: '120px'
            },
            {
              name: 'Fecha',
              sortable: true,
              compact: true
            },
            {
              name: 'Profesional',
              sortable: true,
              compact: true
            }
          ]}
          pagination
          expandableRows
          expandOnRowClicked
          expandableRowsHideExpander
          selectableRowsHighlight
        />
      </Box>
      {openCreate && (
        <InclusionDialog open={openCreate} onClose={toggleOpenCreate} />
      )}
    </Box>
  )
}

export default List
