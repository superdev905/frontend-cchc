import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import { VisitToCloseList } from '../../components/Assistance'
import { PageHeading } from '../../components/UI'
import uiActions from '../../state/actions/ui'

const Assistance = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(uiActions.setCurrentModule('VISITAS'))
  }, [])

  return (
    <Box>
      <PageHeading>Visitas por cerrar</PageHeading>

      <VisitToCloseList />
    </Box>
  )
}
export default Assistance
