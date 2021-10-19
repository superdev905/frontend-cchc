import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import uiActions from '../../state/actions/ui'
import { useToggle } from '../../hooks'
import { PollsDot } from '../../components/Polls'
import CreateDialog from '../../components/Benefits/CreateDialog'
import { Button, PageHeading } from '../../components/UI'
import BenefitList from '../../components/Benefits/List'

const Benefits = () => {
  const dispatch = useDispatch()
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()

  useEffect(() => {
    dispatch(uiActions.setCurrentModule('BENEFICIOS'))
  }, [])

  return (
    <Box>
      <PageHeading>
        Beneficios <PollsDot module="BENEFICIOS" />
      </PageHeading>
      <Box>
        <Button onClick={toggleOpenAdd}>Crear Beneficio</Button>
        <BenefitList />
      </Box>
      <CreateDialog open={openAdd} onClose={toggleOpenAdd} />
    </Box>
  )
}

export default Benefits
