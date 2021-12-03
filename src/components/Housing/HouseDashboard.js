import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import housingActions from '../../state/actions/housing'

const HouseDashboard = () => {
  const dispatch = useDispatch()
  const [stats, setStats] = useState({ agreements: 0, employees: 0, owners: 0 })

  useEffect(() => {
    dispatch(housingActions.getStats()).then((res) => {
      setStats(res)
    })
  }, [])
  return (
    <Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h2" align="center">
                {stats.agreements}
              </Typography>
              <Typography variant="body2" align="center">
                Convenios
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h2" align="center">
                {stats.employees}
              </Typography>
              <Typography variant="body2" align="center">
                Trabajadores
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h2" align="center">
                {stats.owners}
              </Typography>
              <Typography variant="body2" align="center">
                Propietarios
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
export default HouseDashboard
