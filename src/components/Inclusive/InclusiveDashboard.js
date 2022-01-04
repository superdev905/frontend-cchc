import { makeStyles, Typography, Box, Grid } from '@material-ui/core'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import inclusionActions from '../../state/actions/inclusive'

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    backgroundColor: theme.palette.common.white,
    textAlign: 'center',
    borderRadius: theme.spacing(1)
  },
  data: {
    fontSize: 38,
    fontWeight: 'bold'
  },
  label: {
    opacity: 0.8
  }
}))

const InclusiveCard = ({ data, label }) => {
  const classes = useStyles()
  return (
    <Box p={2} className={classes.cardRoot}>
      <Typography className={classes.data}>{data}</Typography>
      <Typography className={classes.label}>{label}</Typography>
    </Box>
  )
}

const InclusiveDashboard = () => {
  const dispatch = useDispatch()

  const getDashboard = () => {
    dispatch(inclusionActions.getDashboard())
  }

  useEffect(() => {
    getDashboard()
  })

  return (
    <Grid container spacing={1}>
      <Grid item xs={6} md={4} lg={2}>
        <InclusiveCard />
      </Grid>
    </Grid>
  )
}

export default InclusiveDashboard
