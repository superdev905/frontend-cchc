import { Box, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { Button, SearchInput } from '../UI'
import { useToggle, useMenu } from '../../hooks'
import InclusiveCreate from './InclusiveCreate'
import inclusionActions from '../../state/actions/inclusive'
import FiltersMenu from '../WebConsultBoss/FiltersMenu'

const Inclusive = () => {
  const dispatch = useDispatch()
  const { open: openInclusive, toggleOpen: toggleOpenInclusive } = useToggle()

  const { open, anchorEl, handleClose, handleOpen } = useMenu()

  const createInclusive = (values) =>
    dispatch(
      inclusionActions.createCase({
        ...values,
        state: 'CREATED'
      })
    )
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
          submitFunction={createInclusive}
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
