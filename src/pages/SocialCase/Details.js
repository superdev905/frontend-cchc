import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, makeStyles } from '@material-ui/core'
import BackHeading from '../../components/Shared/BackHeading'
import { Wrapper, Text, LabeledRow } from '../../components/UI'
import { formatDate } from '../../formatters'
import { SocialCaseTabs } from '../../components/SocialCases'
import socialCasesActions from '../../state/actions/socialCase'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    gap: '100px',
    padding: '5px 50px'
  }
}))

const SocialCaseDetails = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { socialCaseId } = useParams()
  const { caseDetails } = useSelector((state) => state.socialCase)

  useEffect(() => {
    dispatch(socialCasesActions.getSocialCaseById(socialCaseId))
  }, [])
  return (
    <Box>
      <Wrapper>
        {caseDetails ? (
          <Box>
            <BackHeading
              title={`CASO ${socialCaseId} -  ${caseDetails.employeeNames}`}
            />
            {/* <TimeStamp loading={false} text={createdDate} /> */}
            <Box container className={classes.root}>
              <LabeledRow label={'Fecha de Inicio'}>
                <Text>{formatDate(caseDetails.createdDate)} </Text>
              </LabeledRow>
              _
              <LabeledRow label={'Estado'}>
                <Text>{caseDetails.isActive ? 'Activo' : 'Completado'} </Text>
              </LabeledRow>
            </Box>
            <Box>
              <SocialCaseTabs />
            </Box>
          </Box>
        ) : null}
      </Wrapper>
    </Box>
  )
}

export default SocialCaseDetails
