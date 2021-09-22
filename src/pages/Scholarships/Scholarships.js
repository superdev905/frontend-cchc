import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import { PollsDot } from '../../components/Polls'
import { PageHeading } from '../../components/UI'
import uiActions from '../../state/actions/ui'
import PostulationList from '../../components/Scholarships/PostulationList'

const Scholarships = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(uiActions.setCurrentModule('BECAS'))
  }, [])

  return (
    <Box>
      <PageHeading>
        Postulaciones
        <PollsDot module="BECAS" />
      </PageHeading>
      <PostulationList />
    </Box>
  )
}

export default Scholarships
