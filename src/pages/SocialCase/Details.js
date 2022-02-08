import { useEffect, useState } from 'react'
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
  const history = useHistory()
  const { socialCaseId } = useParams()

  const [loading, setLoading] = useState(false)
  const { caseDetails } = useSelector((state) => state.socialCase)

  useEffect(() => {
    setLoading(true)
    dispatch(socialCasesActions.getSocialCaseById(socialCaseId)).then(() => {
      setLoading(false)
    })
  }, [])
  return (
    <Box>
      <Wrapper>
        <Box>
          <BackHeading
            loading={loading}
            title={`CASO ${socialCaseId} -  ${caseDetails?.employeeNames}`}
            goBack={() => {
              history.push('/social-case')
            }}
          />
          <Box px={2}>
            <Grid container>
              <Grid item xs={12} lg={6}>
                <LabeledRow label={'Fecha de Inicio'}>
                  <Text loading={loading}>
                    {formatDate(caseDetails?.createdDate)}{' '}
                  </Text>
                </LabeledRow>
              </Grid>
              <Grid item xs={12} lg={6}>
                <LabeledRow label={'Estado'}>
                  <Text loading={loading}>{caseDetails?.state}</Text>
                </LabeledRow>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <SocialCaseTabs loading={loading} />
          </Box>
        </Box>
      </Wrapper>
    </Box>
  )
}

export default SocialCaseDetails
