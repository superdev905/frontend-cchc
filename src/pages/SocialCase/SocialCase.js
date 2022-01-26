import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import {
  SocialCasesList,
  SocialCasesDashboard
} from '../../components/SocialCases'
import uiActions from '../../state/actions/ui'

const SocialCase = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(uiActions.setCurrentModule('CASO SOCIAL'))
  }, [])

  return (
    <Box>
      <PageHeading>Caso Social</PageHeading>
      <SocialCasesDashboard />
      <SocialCasesList />
    </Box>
  )
}

export default SocialCase
