import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import uiActions from '../../state/actions/ui'
import CreateDialog from '../../components/Benefits/Create/CreateDialog'
import benefitsActions from '../../state/actions/benefits'
import { PollsDot } from '../../components/Polls'
import { Button, PageHeading } from '../../components/UI'
import BenefitList from '../../components/Benefits/List'

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
      <PageHeading>
        Beneficios <PollsDot module="BENEFICIOS" />
      </PageHeading>
      <Box>
        <Button onClick={addButtonClick}>Crear Beneficio</Button>
        <BenefitList />
      </Box>
      <CreateDialog open={showCreateModal} onClose={toggleCreateModal} />
    </Box>
  )
}

export default Benefits
