import { Box, Typography } from '@material-ui/core'
import { ResponsivePie } from '@nivo/pie'
import { Wrapper } from '../../UI'

const GraphPie = ({ data }) => (
  <Wrapper>
    <Typography>Postulaciones por tipo de beca</Typography>
    <Box marginTop={2} height={280}>
      <ResponsivePie
        data={data}
        colors={{ scheme: 'accent' }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]]
        }}
      />
    </Box>
  </Wrapper>
)

export default GraphPie
