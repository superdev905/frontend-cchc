import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid } from '@material-ui/core'
import BackHeading from '../../components/Shared/BackHeading'
import { Wrapper, Text, LabeledRow } from '../../components/UI'
import { formatDate } from '../../formatters'
import { SocialCaseTabs } from '../../components/SocialCases'
import socialCasesActions from '../../state/actions/socialCase'

const SocialCaseDetails = () => {
  const dispatch = useDispatch()
  const { socialCaseId } = useParams()
  const history = useHistory()
  const { caseDetails } = useSelector((state) => state.socialCase)

  useEffect(() => {
    dispatch(socialCasesActions.getSocialCaseById(socialCaseId))
  }, [])
  return (
    <Box>
      <Wrapper>
        <Box>
          <BackHeading
            title={`CASO ${socialCaseId} -  ${caseDetails?.employeeNames}`}
            goBack={() => {
              history.push('/social-case')
            }}
          />
          {/* <TimeStamp loading={false} text={createdDate} /> */}
          <Box px={2}>
            <Grid container>
              <Grid item xs={12} lg={6}>
                <LabeledRow label={'Fecha de Inicio'}>
                  <Text>{formatDate(caseDetails?.createdDate)} </Text>
                </LabeledRow>
              </Grid>
              <Grid item xs={12} lg={6}>
                <LabeledRow label={'Estado'}>
                  <Text>{caseDetails?.state}</Text>
                </LabeledRow>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <SocialCaseTabs />
          </Box>
        </Box>
      </Wrapper>
    </Box>
  )
}

export default SocialCaseDetails
