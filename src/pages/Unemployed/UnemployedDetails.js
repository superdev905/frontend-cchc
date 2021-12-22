import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
/* import { useDispatch } from 'react-redux' */
import { Box, IconButton } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons'
import { PageHeading, Text } from '../../components/UI'
/* import uiActions from '../../state/actions/ui' */
import Details from '../../components/Unemployed/Details'

const UnemployedDetails = () => {
  const { idUnemployed } = useParams()
  const history = useHistory()
  /* const dispatch = useDispatch() */
  /* useEffect(() => {
    dispatch(uiActions.setCurrentModule('NAME'))
  }, []) */

  const goBack = () => {
    history.push('/unemployed')
  }

  return (
    <Box>
      <Box marginBottom="10px" display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <IconButton onClick={goBack}>
            <ArrowBackIcon />
          </IconButton>
          <Text>
            <PageHeading>Nombre cesante {idUnemployed}</PageHeading>
          </Text>
        </Box>
      </Box>
      <Details />
    </Box>
  )
}

export default UnemployedDetails
