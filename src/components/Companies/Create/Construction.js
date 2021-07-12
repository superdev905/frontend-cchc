import { Box, Typography } from '@material-ui/core'
import { Button, EmptyState } from '../../UI'
import useStyles from './styles'
import Actions from './Actions'
import useToggle from '../../../hooks/useToggle'
import { ConstructionModal } from '../../Constructions'

const StepThree = () => {
  const classes = useStyles()
  const { open, toggleOpen } = useToggle()
  return (
    <Box className={classes.form}>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography className={classes.subtitle} align="center">
            Obras
          </Typography>
          <Button size="small" onClick={toggleOpen}>
            Agregar obra
          </Button>
        </Box>
        <EmptyState message="Esta empresa no tiene obras" />
      </Box>
      <Actions nextText="Crear empresa" showNextIcon={false} />
      <ConstructionModal open={open} onClose={toggleOpen} />
    </Box>
  )
}

export default StepThree
