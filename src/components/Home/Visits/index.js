import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core'
import homeActions from '../../../state/actions/home'
import VisitCard from './Card'
import useStyles from '../style'
import { EmptyState } from '../../UI'

const NextVisits = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const { nextVisits } = useSelector((state) => state.home)

  const getVisits = () => {
    setLoading(true)
    dispatch(homeActions.getVisitsHome())
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getVisits()
  }, [])

  return (
    <Box>
      <Box>
        <Typography className={classes.title}>
          Proximas visitas pendientes
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {loading ? (
            <>
              {[...Array.from(Array(3).keys())].map((__, index) => (
                <Grid key={`loader-card-${index}`} item xs={12}>
                  <VisitCard.Loader />
                </Grid>
              ))}
            </>
          ) : (
            <>
              {nextVisits.length === 0 ? (
                <Grid item xs={12}>
                  <EmptyState
                    message="No tienes proximas visitas"
                    bgWhite
                    actionMessage="Ir a calendario"
                    event={() => {
                      history.push('/calendar')
                    }}
                  />
                </Grid>
              ) : (
                <>
                  {nextVisits.map((item) => (
                    <Grid key={`visit-card-${item.id}`} item xs={12}>
                      <VisitCard visit={item} />
                    </Grid>
                  ))}
                </>
              )}
            </>
          )}
        </Grid>
      </Box>
    </Box>
  )
}

export default NextVisits
