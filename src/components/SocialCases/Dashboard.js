import { Box, makeStyles, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import reportsActions from '../../state/actions/reports'

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    backgroundColor: theme.palette.common.white,
    textAlign: 'center',
    borderRadius: theme.spacing(1)
  },
  iconButton: {
    padding: '0px',
    margin: '0px 0px 0px 9px'
  },
  data: {
    fontSize: 38,
    fontWeight: 'bold'
  },
  label: {
    opacity: 0.8
  }
}))

const SimpleCard = ({ data, label = false }) => {
  const classes = useStyles()

  return (
    <Box p={2} className={classes.cardRoot}>
      <Box display="flex" justifyContent="center" padding={0} margin={0}>
        <Typography className={classes.data}>{data}</Typography>
      </Box>
      <Typography className={classes.label}>{label}</Typography>
    </Box>
  )
}

const CardDashboard = () => {
  const dispatch = useDispatch()
  const { stats } = useSelector((state) => state.reports)
  const [query] = useState()

  const getStats = () => {
    const formattedQuery = { ...query }
    dispatch(reportsActions.getStats(formattedQuery))
  }

  useEffect(() => {
    getStats()
  }, [])

  return (
    <Grid container spacing={1}>
      {Object.keys(stats).map((key) => (
        <Grid item xs={6} md={4} lg={2} key={`card-stats-${key}`}>
          <SimpleCard label={stats[key].label} data={stats[key].value} />
        </Grid>
      ))}
    </Grid>
  )
}

export default CardDashboard
