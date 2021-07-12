import { Box, Typography } from '@material-ui/core'
import useToggle from '../../../hooks/useToggle'
import { EmptyState } from '../../UI'
import useStyles from './styles'
import Actions from './Actions'
import CreateModal from '../../Contacts/CreateModal'

const StepOne = () => {
  const classes = useStyles()
  const { open, toggleOpen } = useToggle()

  return (
    <Box className={classes.form}>
      <Typography className={classes.subtitle} align="center">
        Contactos
      </Typography>
      <Box>
        <EmptyState
          actionMessage="Crear nuevo"
          event={toggleOpen}
          message="Esta empresa no tiene contactos"
        />
      </Box>
      <Actions />
      <CreateModal open={open} onClose={toggleOpen} />
    </Box>
  )
}

export default StepOne
