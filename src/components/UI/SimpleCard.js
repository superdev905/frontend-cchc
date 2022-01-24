import { Box, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  cardRoot: ({ height }) => ({
    backgroundColor: theme.palette.common.white,
    textAlign: 'center',
    borderRadius: theme.spacing(1),
    minHeight: height || 130,
    maxHeight: height || 130
  }),
  data: {
    fontSize: 38,
    fontWeight: 'bold'
  },
  label: {
    opacity: 0.8
  }
}))

const SimpleCard = ({ data, label, height }) => {
  const classes = useStyles({ height })
  return (
    <Box p={2} className={classes.cardRoot}>
      <Box display="flex" justifyContent="center" padding={0} margin={0}>
        <Typography className={classes.data}>{data}</Typography>
      </Box>
      <Typography className={classes.label}>{label}</Typography>
    </Box>
  )
}

export default SimpleCard
