import { Box, Typography } from '@material-ui/core'
import List from '../InterventionPlan/List'
import useStyles from './styles'

const InterventionTasks = () => {
  const classes = useStyles()
  return (
    <Box>
      <Box>
        <Typography className={classes.title}>
          Tareas de Plan de Intervención Social
        </Typography>
      </Box>
      <List />
    </Box>
  )
}

export default InterventionTasks
