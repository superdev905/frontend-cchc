import React from 'react'
/* import { useDispatch } from 'react-redux' */
import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
/* import uiActions from '../../state/actions/ui' */
import UnemployedList from '../../components/Unemployed/UnemployedList'

const Unemployed = () => {
  /* const dispatch = useDispatch() */
  /* useEffect(() => {
    dispatch(uiActions.setCurrentModule('NAME'))
  }, []) */
  console.log('Unemployed')
  return (
    <Box>
      <PageHeading>Cesantes</PageHeading>
      <UnemployedList />
    </Box>
  )
}

export default Unemployed
