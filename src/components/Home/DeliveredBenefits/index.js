import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import homeActions from '../../../state/actions/home'
import DeliveredRow from './Row'
import useStyles from '../style'
import { EmptyState, Wrapper } from '../../UI'

const NextVisits = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { deliveredBenefits } = useSelector((state) => state.home)

  const getDeliveredBenefit = () => {
    setLoading(true)
    dispatch(homeActions.getBenefitsDelivered())
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getDeliveredBenefit()
  }, [])

  return (
    <Wrapper>
      <Box mb={2}>
        <Box>
          <Typography className={classes.title}>
            Ultimos beneficios entregados
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2}>
            {loading ? (
              <>
                {[...Array.from(Array(3).keys())].map((__, index) => (
                  <Grid key={`loader-card-${index}`} item xs={12}>
                    <DeliveredRow.Loader />
                  </Grid>
                ))}
              </>
            ) : (
              <>
                {deliveredBenefits.length === 0 ? (
                  <Grid item xs={12}>
                    <EmptyState
                      message="No tienes beneficios entregados"
                      bgWhite
                    />
                  </Grid>
                ) : (
                  <>
                    {deliveredBenefits.map((item) => (
                      <Grid key={`delivered-card-${item.id}`} item xs={12}>
                        <DeliveredRow data={item} />
                      </Grid>
                    ))}
                  </>
                )}
              </>
            )}
          </Grid>
        </Box>
      </Box>
    </Wrapper>
  )
}

export default NextVisits
