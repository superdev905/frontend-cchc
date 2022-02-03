import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import homeActions from '../../state/actions/home'

const useStyles = makeStyles((theme) => ({
  cardRoot: ({ height }) => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(2),
    minHeight: height || 100,
    maxHeight: height || 200,
    padding: theme.spacing(4)
  }),
  date: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(5),
    textAlign: 'center',
    fontSize: 10,
    color: 'white'
  },
  type: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },
  obra: {
    textAlign: 'center',
    fontSize: 10
  }
}))

const Card = ({ type, obra, date, height }) => {
  const classes = useStyles({ height })
  return (
    <Box className={classes.cardRoot} boxShadow={3} mt={2} mb={2}>
      <Grid item xs={12} spacing={1}>
        <Box>
          <Typography className={classes.type}>{type}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box mt={1} mb={1}>
          <Typography className={classes.obra}>{obra}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <Typography className={classes.date}>{date}</Typography>
        </Box>
      </Grid>
    </Box>
  )
}

const VisitsPending = () => {
  const dispatch = useDispatch()

  const getVisits = () => {
    dispatch(homeActions.getVisitsHome())
  }

  useEffect(() => {
    getVisits()
  }, [])

  return (
    <Grid>
      <Card />
    </Grid>
  )
}

export default VisitsPending
