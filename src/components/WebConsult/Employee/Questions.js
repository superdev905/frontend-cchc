import { Box, Typography } from '@material-ui/core'
import QuestionCard from '../QuestionCard'
import useStyles from './styles'

const Questions = () => {
  const classes = useStyles()
  return (
    <Box>
      <Box mb={1}>
        <Typography className={classes.title}>Mis Preguntas</Typography>
      </Box>
      <Box>
        <QuestionCard />
      </Box>
    </Box>
  )
}

export default Questions
