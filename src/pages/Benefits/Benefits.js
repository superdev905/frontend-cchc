import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import uiActions from '../../state/actions/ui'
import { PageHeading } from '../../components/UI'
import BenefitList from '../../components/Benefits/List'

const Benefits = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(uiActions.setCurrentModule('BENEFICIOS'))
  }, [])

  return (
    <Box>
      <PageHeading>Beneficios</PageHeading>
      <Box>
        <BenefitList />
      </Box>
    </Box>
  )
}

export default Benefits
