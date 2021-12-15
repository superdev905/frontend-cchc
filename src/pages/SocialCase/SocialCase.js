import React from 'react'
import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import SocialCasesList from '../../components/SocialCases/SocialCasesList'

const SocialCase = () => (
  <Box>
    <PageHeading>Caso Social</PageHeading>
    <SocialCasesList />
  </Box>
)

export default SocialCase
