import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import uiActions from '../../state/actions/ui'
import {
  PostulationList,
  ApprovedList,
  ScholarshipDashboard
} from '../../components/Scholarships'

const Scholarships = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(uiActions.setCurrentModule('BECAS'))
  }, [])

  return (
    <Box>
      <ScholarshipDashboard />
      <PostulationList />
      <ApprovedList />
    </Box>
  )
}

export default Scholarships
