import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.gray.gray300}`,
    borderRadius: theme.spacing(1)
  }
}))

const QuestionCard = ({}) => {
  const classes = useStyles()

  return <Box display="flex" className={classes.root}></Box>
}

export default QuestionCard
