import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import { PollsDot } from '../../components/Polls'
import { PageHeading } from '../../components/UI'
import uiActions from '../../state/actions/ui'
import ApplicationList from '../../components/Scholarships/ApplicationList'

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
      <ApplicationList />
    </Box>
  )
}

export default Scholarships
