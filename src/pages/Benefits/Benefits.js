import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import uiActions from '../../state/actions/ui'
import CreateDialog from '../../components/Benefits/CreateDialog'
import { Button } from '../../components/UI'
import benefitsActions from '../../state/actions/benefits'

const Benefits = () => {
  const dispatch = useDispatch()
  const { showCreateModal } = useSelector((state) => state.benefits)

  useEffect(() => {
    dispatch(uiActions.setCurrentModule('BENEFICIOS'))
  }, [])

  const toggleCreateModal = () => {
    dispatch(benefitsActions.toggleCreateModal(showCreateModal))
  }

  const addButtonClick = () => {
    dispatch(benefitsActions.toggleCreateModal(showCreateModal))
  }

  return (
    <Box>
      <Box>
        <Button onClick={addButtonClick}>Crear Beneficio</Button>
      </Box>
      <CreateDialog open={showCreateModal} onClose={toggleCreateModal} />
    </Box>
  )
}

export default Benefits
