import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, IconButton } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons'
import { PageHeading, Text } from '../../components/UI'
import unemployedActions from '../../state/actions/unemployed'
import Details from '../../components/Unemployed/Details'

const UnemployedDetails = () => {
  const dispatch = useDispatch()
  const { idUnemployed } = useParams()
  const history = useHistory()
  const { unemployed } = useSelector((state) => state.unemployed)

  useEffect(() => {
    dispatch(unemployedActions.getUnemployedById(idUnemployed))
  }, [])

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
            <PageHeading>
              {unemployed
                ? `${unemployed.employee.names} ${unemployed.employee.paternalSurname} ${unemployed.employee.maternalSurname}`
                : null}
            </PageHeading>
          </Text>
        </Box>
      </Box>
      {unemployed ? <Details /> : null}
    </Box>
  )
}

export default UnemployedDetails
