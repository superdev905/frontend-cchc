import { Box, Typography } from '@material-ui/core'
import useToggle from '../../../hooks/useToggle'
import { Button, EmptyState } from '../../UI'
import useStyles from './styles'
import Actions from './Actions'
import CreateModal from '../Division/CreateModal'

const StepThree = () => {
  const classes = useStyles()
  const { open, toggleOpen } = useToggle()

  return (
    <Box className={classes.form}>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography className={classes.subtitle} align="center">
            Divisiones
          </Typography>
          <Button size="small" onClick={toggleOpen}>
            Agregar división
          </Button>
        </Box>
        <EmptyState message="Esta empresa no tiene divisiones" />
      </Box>
      <Actions />
      <CreateModal open={open} onClose={toggleOpen} />
    </Box>
  )
}

export default StepThree
