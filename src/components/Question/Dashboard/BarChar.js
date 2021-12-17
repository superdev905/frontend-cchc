import { Box, makeStyles, Typography } from '@material-ui/core'
import { ResponsiveBar } from '@nivo/bar'

const useStyles = makeStyles((theme) => ({
  tooltipRoot: {
    backgroundColor: theme.palette.common.white
  }
}))

const CustomTooltip = ({ data }) => {
  const classes = useStyles()
  return (
    <Box p={2} className={classes.tooltipRoot}>
      <Typography>{`${data.name}: ${data.value}`}</Typography>
    </Box>
  )
}

const BarChart = ({ data }) => (
  <Box height={500}>
    <ResponsiveBar
      data={data}
      keys={['value']}
      indexBy="number"
      margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'set2' }}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -30,
        legend: 'Región (Número)',
        legendPosition: 'middle',
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Preguntas',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      role="application"
      ariaLabel="Distribución de preguntas"
      tooltip={CustomTooltip}
    />
  </Box>
)

export default BarChart
