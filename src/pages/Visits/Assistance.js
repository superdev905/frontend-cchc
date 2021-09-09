import { useEffect } from 'react'
import { Box } from '@material-ui/core'
import { EventList } from '../../components/Assistance'
import { PollsDot } from '../../components/Polls'
import { PageHeading } from '../../components/UI'
import uiActions from '../../state/actions/ui'

const Assistance = () => {
  useEffect(() => {
    uiActions.setCurrentModule('VISITAS')
    console.log('CAMBIO DE MODULO: VIS')
  }, [])

  return (
    <Box>
      <PageHeading>
        Próximas visitas
        <PollsDot module="VISITAS" />
      </PageHeading>

      <EventList />
    </Box>
  )
}
export default Assistance
