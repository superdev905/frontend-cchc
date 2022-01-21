import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import uiActions from '../../state/actions/ui'
import {
  PostulationList,
  ApprovedList,
  ScholarshipGraphs
} from '../../components/Scholarships'

const Scholarships = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(uiActions.setCurrentModule('BECAS'))
  }, [])

  return (
    <Box>
      <ScholarshipGraphs />
      <PostulationList />
      <ApprovedList />
    </Box>
  )
}

export default Scholarships
