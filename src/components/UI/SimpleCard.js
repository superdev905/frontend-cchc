import { Box, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  cardRoot: ({ height }) => ({
    backgroundColor: theme.palette.common.white,
    textAlign: 'center',
    borderRadius: theme.spacing(1),
    minHeight: height || 80,
    maxHeight: height || 80
  }),
  data: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  label: {
    opacity: 0.8,
    fontSize: 15
  }
}))

const SimpleCard = ({ data, label, height }) => {
  const classes = useStyles({ height })
  return (
    <Box p={1} className={classes.cardRoot}>
      <Box display="flex" justifyContent="center" padding={0} margin={0}>
        <Typography className={classes.data}>{data}</Typography>
      </Box>
      <Typography className={classes.label}>{label}</Typography>
    </Box>
  )
}

export default SimpleCard
