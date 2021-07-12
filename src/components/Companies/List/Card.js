import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))

const Card = ({}) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <span></span>
    </Box>
  )
}

Card.propTypes = {}

export default Card
