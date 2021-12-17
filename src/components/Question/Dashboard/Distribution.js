import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import BarChart from './BarChar'
import questionActions from '../../../state/actions/questions'

const DistributionChart = () => {
  const dispatch = useDispatch()
  const { distribution } = useSelector((state) => state.questions)

  useEffect(() => {
    dispatch(questionActions.getDistributionStats())
  }, [])
  return (
    <Box height={500}>
      <BarChart data={distribution} />
    </Box>
  )
}

export default DistributionChart
