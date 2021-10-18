import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import uiActions from '../../state/actions/ui'
import { useToggle } from '../../hooks'
import CreateDialog from '../../components/Benefits/CreateDialog'
import { Button } from '../../components/UI'

const Benefits = () => {
  const dispatch = useDispatch()
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()

  useEffect(() => {
    dispatch(uiActions.setCurrentModule('BENEFICIOS'))
  }, [])

  return (
    <Box>
      <Box>
        <Button onClick={toggleOpenAdd}>Crear Beneficio</Button>
      </Box>
      <CreateDialog open={openAdd} onClose={toggleOpenAdd} />
    </Box>
  )
}

export default Benefits
