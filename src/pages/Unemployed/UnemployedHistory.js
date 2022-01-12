import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
/* import { useDispatch } from 'react-redux' */
import { Box, IconButton } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons'
import { PageHeading, Text } from '../../components/UI'
/* import uiActions from '../../state/actions/ui' */
import BenefitsHistoryList from '../../components/Unemployed/BenefitsHistoryList'

const UnemployedHistory = () => {
  const { idUnemployed } = useParams()
  const history = useHistory()
  /* const dispatch = useDispatch() */
  /* useEffect(() => {
    dispatch(uiActions.setCurrentModule('NAME'))
  }, []) */

  const goBack = () => {
    history.push(`/unemployed/${idUnemployed}/details`)
  }

  return (
    <Box>
      <Box marginBottom="10px" display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <IconButton onClick={goBack}>
            <ArrowBackIcon />
          </IconButton>
          <Text>
            <PageHeading>Historial de Beneficios de Nombre cesante</PageHeading>
          </Text>
        </Box>
      </Box>
      <BenefitsHistoryList />
    </Box>
  )
}

export default UnemployedHistory
