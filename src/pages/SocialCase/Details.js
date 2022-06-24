import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Chip, Grid, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import BackHeading from '../../components/Shared/BackHeading'
import { useToggle } from '../../hooks'
import { Wrapper, Text, LabeledRow, Button } from '../../components/UI'
import { formatDate } from '../../formatters'
import { SocialCaseTabs } from '../../components/SocialCases'
import socialCasesActions from '../../state/actions/socialCase'
import ClosingModal from '../../components/SocialCases/Closing/ClosingModal'

const SocialCaseDetails = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { socialCaseId } = useParams()
  const { open: openClose, toggleOpen: toggleOpenClose } = useToggle()
  const [loading, setLoading] = useState(false)
  const { caseDetails } = useSelector((state) => state.socialCase)

  const availableOptions = (action, value) => {
    if (action === 'close') {
      if (value?.state === 'CERRADO') return true
      if (value?.state === 'SIN MOVIMIENTO') return true
      if (value?.state === 'ABANDONO') return true
    }
    return false
  }

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
            <Grid
              container
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={12} lg={4}>
                <LabeledRow label={'Fecha de Inicio'}>
                  <Text loading={loading}>
                    {formatDate(caseDetails?.createdDate)}{' '}
                  </Text>
                </LabeledRow>
              </Grid>
              <Grid item xs={12} lg={4}>
                <LabeledRow label={'Estado'}>
                  <Text loading={loading}>
                    {caseDetails && (
                      <Chip color="primary" label={caseDetails?.state} />
                    )}
                  </Text>
                </LabeledRow>
              </Grid>
              <Box item xs={12} lg={4} justifyContent="flex-end">
                <Button
                  onClick={toggleOpenClose}
                  disabled={availableOptions('close', caseDetails)}
                >
                  Aprobar cierre{' '}
                </Button>
              </Box>
            </Grid>
          </Box>
          {caseDetails?.state === 'CERRADO' && (
            <Box my={1}>
              <Alert severity="error" style={{ borderRadius: 5 }}>
                <Typography>
                  Estado de caso: <strong>{caseDetails?.state}</strong>
                </Typography>
              </Alert>
            </Box>
          )}

          <Box>
            <SocialCaseTabs loading={loading} />
          </Box>
        </Box>
        {openClose && (
          <ClosingModal open={openClose} onClose={toggleOpenClose} />
        )}
      </Wrapper>
    </Box>
  )
}

export default SocialCaseDetails
