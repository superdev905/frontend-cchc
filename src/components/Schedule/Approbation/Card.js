import { Box, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.gray.gray100
  },
  date: {
    fontSize: 14,
    opacity: 0.8
  }
}))

const Card = () => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.root}>{`${formatDate(
          new Date()
        )}`}</Typography>
      </Box>
    </Box>
  )
}

export default Card
