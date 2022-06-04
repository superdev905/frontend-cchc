import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Grid, Typography, makeStyles, Paper } from '@material-ui/core'
import { LabeledRow, Text, Wrapper } from '../UI'
import assistanceActions from '../../state/actions/assistance'

const useStyles = makeStyles(() => ({
  Paper: {
    width: '45%',
    padding: 10,
    margin: 10,
    verticalAlign: 'top',
    display: 'inline-block'
  }
}))

const VisitStatistics = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [newAttendedWorkers, setNewAttendedWorkers] = useState(0)
  const [oldAttendedWorkers, setOldAttendedWorkers] = useState(0)
  const { historicly, visit, totalUsers, visitStatistics } = useSelector(
    (state) => state.assistance
  )
  const { idVisit } = useParams()

  useEffect(() => {
    dispatch(assistanceActions.getVisitStatistics(idVisit))
  }, [idVisit, totalUsers])

  useEffect(() => {
    dispatch(
      assistanceActions.statisticsPrint({
        new: newAttendedWorkers,
        old: oldAttendedWorkers,
        total: visitStatistics?.total,
        house: visitStatistics?.house,
        subcontract: visitStatistics?.subcontract
      })
    )
  }, [totalUsers, visitStatistics, newAttendedWorkers, oldAttendedWorkers])

  useEffect(() => {
    dispatch(
      assistanceActions.getAttendedHistoricalEmployees({
        business_id: visit?.business_id,
        construction_id: visit?.construction_id,
        visit_id: idVisit
      })
    )
  }, [visit])

  useEffect(() => {
    if (totalUsers.length > 0) {
      let newWorker = 0
      let old = 0
      totalUsers.forEach((user) => {
        const add = historicly.some((hist) => hist[0] === user.id)
        if (add) {
          old += 1
        } else {
          newWorker += 1
        }
      })
      setNewAttendedWorkers(newWorker)
      setOldAttendedWorkers(old)
    }
  }, [historicly, totalUsers])

  return (
    <Wrapper>
      <Typography style={{ fontSize: '18px', fontWeight: 'bold' }}>
        Estadisticas de la visita
      </Typography>
      <Box>
        <Paper className={classes.Paper}>
          <Typography
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}
          >
            Atendidos:
          </Typography>
          <hr></hr>
          <Grid>
            <LabeledRow label="Nuevos:">
              <Text loaderWidth="80%">{newAttendedWorkers}</Text>
            </LabeledRow>

            <LabeledRow label="Antiguos:">
              <Text loaderWidth="80%">{oldAttendedWorkers}</Text>
            </LabeledRow>

            <LabeledRow label="Total:">
              <Text loaderWidth="80%">{visitStatistics?.total}</Text>
            </LabeledRow>
          </Grid>
        </Paper>
        <Paper className={classes.Paper}>
          <Typography
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}
          >
            Dotación:
          </Typography>
          <hr></hr>
          <Grid>
            <LabeledRow label="Casa:">
              <Text loaderWidth="80%">{visitStatistics?.house}</Text>
            </LabeledRow>{' '}
            <LabeledRow label="SubContrato:">
              <Text loaderWidth="80%">{visitStatistics?.subcontract}</Text>
            </LabeledRow>
            <LabeledRow label="Total:">
              <Text loaderWidth="80%">{visitStatistics?.total}</Text>
            </LabeledRow>
          </Grid>
        </Paper>
      </Box>
    </Wrapper>
  )
}

export default VisitStatistics
