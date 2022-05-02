import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography, makeStyles, Paper } from '@material-ui/core'
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
  const [data, setData] = useState({
    total: 0,
    new: 0,
    old: 0,
    house: 0,
    subcontract: 0
  })
  const { totalUsers, visit } = useSelector((state) => state.assistance)

  useEffect(() => {
    if (totalUsers.length > 0) {
      let old = 0
      let newAtention = 0
      let house = 0
      let subcontract = 0
      totalUsers?.forEach((user) => {
        if (user?.constructionId === visit?.construction_id) {
          house += 1
          old += 1
        } else {
          newAtention += 1
          subcontract += 1
        }
      })
      setData({ new: newAtention, old, house, subcontract })
    }
  }, [totalUsers])

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
              <Text loaderWidth="80%">{data.new}</Text>
            </LabeledRow>

            <LabeledRow label="Antiguos:">
              <Text loaderWidth="80%">{data.old}</Text>
            </LabeledRow>

            <LabeledRow label="Total:">
              <Text loaderWidth="80%">{totalUsers.length}</Text>
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
              <Text loaderWidth="80%">{data.house}</Text>
            </LabeledRow>{' '}
            <LabeledRow label="SubContrato:">
              <Text loaderWidth="80%">{data.subcontract}</Text>
            </LabeledRow>
            <LabeledRow label="Total:">
              <Text loaderWidth="80%">{totalUsers.length}</Text>
            </LabeledRow>
          </Grid>
        </Paper>
      </Box>
    </Wrapper>
  )
}

export default VisitStatistics
