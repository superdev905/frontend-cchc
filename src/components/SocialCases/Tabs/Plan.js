import { Box, Typography } from '@material-ui/core'
import List from '../InterventionPlan/List'
import useStyles from './styles'

const Background = () => {
  const classes = useStyles()
  return (
    <Box>
      <Box>
        <Typography className={classes.title}>
          Tareas de plan de intervención
        </Typography>
      </Box>
      <List />
    </Box>
  )
}

export default Background
