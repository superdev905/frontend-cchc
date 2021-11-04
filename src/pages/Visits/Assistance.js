import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import { EventList } from '../../components/Assistance'
import { PageHeading } from '../../components/UI'
import uiActions from '../../state/actions/ui'

const Assistance = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(uiActions.setCurrentModule('VISITAS'))
  }, [])

  return (
    <Box>
      <PageHeading>Próximas visitas</PageHeading>

      <EventList />
    </Box>
  )
}
export default Assistance
