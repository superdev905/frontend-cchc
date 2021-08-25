import { Box, Grid, Typography, makeStyles, Paper } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { LabeledRow, Text } from '../UI'

const useStyles = makeStyles(() => ({
  Paper: {
    width: '45%',
    padding: '2%',
    margin: '2%',
    verticalAlign: 'top',
    display: 'inline-block'
  }
}))

const VisitStatistics = ({ fetching }) => {
  //  const dispatch = useDispatch()
  const classes = useStyles()
  const { visit } = useSelector((state) => state.assistance)

  return (
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
              {visit?.new}
            </Text>
          </LabeledRow>

          <LabeledRow label="Antiguos:">
            <Text loaderWidth="80%" loading={fetching}>
              {visit?.old}
            </Text>
          </LabeledRow>

          <LabeledRow label="Total:">
            <Text loaderWidth="80%" loading={fetching}>
              {visit?.total}
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
              {visit?.new}
            </Text>
          </LabeledRow>{' '}
          <LabeledRow label="SubContrato:">
            <Text loaderWidth="80%" loading={fetching}>
              {visit?.old}
            </Text>
          </LabeledRow>
          <LabeledRow label="Total:">
            <Text loaderWidth="80%" loading={fetching}>
              {visit?.total}
            </Text>
          </LabeledRow>
        </Grid>
      </Paper>
    </Box>
  )
}

export default VisitStatistics
