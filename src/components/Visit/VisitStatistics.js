import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Typography, makeStyles, Paper } from '@material-ui/core'
import assistanceActions from '../../state/actions/assistance'
import { LabeledRow, Text, Wrapper } from '../UI'

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
  const { idVisit } = useParams()
  const [fetching, setFetching] = useState(false)
  const [data, setData] = useState({ total: 0, new: 0, old: 0 })
  const { attendedEmployeeList } = useSelector((state) => state.assistance)

  useEffect(() => {
    setFetching(true)
    dispatch(assistanceActions.getVisitStatistics(idVisit)).then((result) => {
      setFetching(false)
      setData(result)
    })
  }, [idVisit, attendedEmployeeList])

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
              <Text loaderWidth="80%" loading={fetching}>
                {data?.new}
              </Text>
            </LabeledRow>

            <LabeledRow label="Antiguos:">
              <Text loaderWidth="80%" loading={fetching}>
                {data?.old}
              </Text>
            </LabeledRow>

            <LabeledRow label="Total:">
              <Text loaderWidth="80%" loading={fetching}>
                {data?.total}
              </Text>
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
              <Text loaderWidth="80%" loading={fetching}>
                {data?.house}
              </Text>
            </LabeledRow>{' '}
            <LabeledRow label="SubContrato:">
              <Text loaderWidth="80%" loading={fetching}>
                {data?.subcontract}
              </Text>
            </LabeledRow>
            <LabeledRow label="Total:">
              <Text loaderWidth="80%" loading={fetching}>
                {data?.total}
              </Text>
            </LabeledRow>
          </Grid>
        </Paper>
      </Box>
    </Wrapper>
  )
}

export default VisitStatistics
