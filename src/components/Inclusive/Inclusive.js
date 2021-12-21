import { Box, Grid } from '@material-ui/core'
import { Button, SearchInput } from '../UI'
import { useToggle } from '../../hooks'
import InclusiveCreate from './InclusiveCreate'

const Inclusive = () => {
  const { open: openInclusive, toggleOpen: toggleOpenInclusive } = useToggle()
  return (
    <Box>
      <Grid container alignItems="center">
        <Grid item xs={12} md={6} lg={5}>
          <SearchInput placeholder="Buscar..." />
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
          <Box textAlign="right">
            <Button onClick={toggleOpenInclusive}>Nuevo</Button>
          </Box>
        </Grid>
      </Grid>
      {openInclusive && (
        <InclusiveCreate
          open={openInclusive}
          onClose={toggleOpenInclusive}
          successMessage="Caso de Inclusión Creado Correctamente"
        />
      )}
    </Box>
  )
}

export default Inclusive
