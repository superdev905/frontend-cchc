import React from 'react'
import { Box } from '@material-ui/core'
import BackHeading from '../../components/Shared/BackHeading'
import { Wrapper } from '../../components/UI'
import { SocialCaseTabs } from '../../components/SocialCases'

const SocialCaseDetails = () => (
  <Box>
    <Wrapper>
      <BackHeading title="Caso 1: Jhon Doe" />
      <Box>
        <SocialCaseTabs />
      </Box>
    </Wrapper>
  </Box>
)

export default SocialCaseDetails
