import { Box, Grid } from '@material-ui/core'
import { Button, SearchInput } from '../UI'
import { useToggle, useMenu } from '../../hooks'
import InclusiveCreate from './InclusiveCreate'
import FiltersMenu from '../WebConsultBoss/FiltersMenu'

const Inclusive = () => {
  const { open: openInclusive, toggleOpen: toggleOpenInclusive } = useToggle()

  const { open, anchorEl, handleClose, handleOpen } = useMenu()

  return (
    <Box>
      <Grid container alignItems="center">
        <Grid item xs={12} md={6} lg={5}>
          <SearchInput placeholder="Buscar..." />
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
          <Box textAlign="right">
            <Button onClick={handleOpen}>Filtros</Button>
            <Button onClick={toggleOpenInclusive}>Nuevo</Button>
          </Box>
        </Grid>
      </Grid>
      {openInclusive && (
        <InclusiveCreate
          open={openInclusive}
          onClose={toggleOpenInclusive}
          successMessage="Caso Creado Correctamente"
        />
      )}
      {open && (
        <FiltersMenu open={open} anchorEl={anchorEl} onClose={handleClose} />
      )}
    </Box>
  )
}

export default Inclusive
