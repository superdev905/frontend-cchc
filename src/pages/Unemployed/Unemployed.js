import React from 'react'
import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import UnemployedList from '../../components/Unemployed/UnemployedList'
import { ModuleIndicator } from '../../components/Shared'

const Unemployed = () => (
  <Box>
    <ModuleIndicator module={'CESANTES'} />
    <PageHeading>Cesantes</PageHeading>
    <UnemployedList />
  </Box>
)

export default Unemployed
