import { useEffect } from 'react'
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
  const { visit, visitStatistics, totalUsers } = useSelector(
    (state) => state.assistance
  )
  const { idVisit } = useParams()

  useEffect(() => {
    if (idVisit && totalUsers) {
      dispatch(assistanceActions.getVisitStatistics(idVisit))
    }
  }, [idVisit, totalUsers])

  useEffect(() => {
    dispatch(
      assistanceActions.getAttendedHistoricalEmployees({
        business_id: visit?.business_id,
        construction_id: visit?.construction_id,
        visit_id: idVisit
      })
    )
  }, [visit])

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
              <Text loaderWidth="80%">{visitStatistics?.newWorker || 0}</Text>
            </LabeledRow>

            <LabeledRow label="Antiguos:">
              <Text loaderWidth="80%">{visitStatistics?.old || 0}</Text>
            </LabeledRow>

            <LabeledRow label="Total:">
              <Text loaderWidth="80%">{visitStatistics?.total || 0}</Text>
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
            Dotaci??n:
          </Typography>
          <hr></hr>
          <Grid>
            <LabeledRow label="Casa:">
              <Text loaderWidth="80%">{visitStatistics?.casa || 0}</Text>
            </LabeledRow>{' '}
            <LabeledRow label="SubContrato:">
              <Text loaderWidth="80%">{visitStatistics?.subContrato || 0}</Text>
            </LabeledRow>
            <LabeledRow label="Total:">
              <Text loaderWidth="80%">{visitStatistics?.total || 0}</Text>
            </LabeledRow>
          </Grid>
        </Paper>
      </Box>
    </Wrapper>
  )
}

export default VisitStatistics
