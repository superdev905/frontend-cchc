import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import uiActions from '../../state/actions/ui'
import MigrantList from '../../components/Migrants/MigrantList'

const Migrant = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(uiActions.setCurrentModule('MIGRANTES'))
  }, [])
  return (
    <Box>
      <PageHeading>Migrantes</PageHeading>
      <MigrantList />
    </Box>
  )
}

export default Migrant
