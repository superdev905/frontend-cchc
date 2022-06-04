import { View } from '@react-pdf/renderer'
import StatisticsHeader from './StatisticsHeader'
import StatisticsNew from './StatisticsNew'
import StatisticsOld from './StatisticsOld'
import StatisticsTotal from './StatisticsTotal'

const StatisticsTable = ({ statistics }) => (
  <View>
    <StatisticsHeader />
    <StatisticsNew newCount={statistics?.new} house={statistics?.house} />
    <StatisticsOld
      old={statistics?.old}
      subcontract={statistics?.subcontract}
    />
    <StatisticsTotal total={statistics?.total} />
  </View>
)

export default StatisticsTable
