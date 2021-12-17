import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import questionActions from '../../../state/actions/questions'

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

const SimpleCard = ({ data, label }) => {
  const classes = useStyles()
  return (
    <Box p={2} className={classes.cardRoot}>
      <Typography className={classes.data}>{data}</Typography>
      <Typography className={classes.label}>{label}</Typography>
    </Box>
  )
}

const Cards = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { stats } = useSelector((state) => state.questions)
  const [query] = useState({ professionalId: user.id })

  const getStats = () => {
    const formattedQuery = { ...query }
    if (user.role.key === 'ADMIN' || user.role.key === 'JEFATURA') {
      delete formattedQuery.professionalId
    }
    dispatch(questionActions.getStats(formattedQuery))
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

export default Cards
