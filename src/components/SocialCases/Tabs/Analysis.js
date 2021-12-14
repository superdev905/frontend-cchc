import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography, Grid } from '@material-ui/core'
import { Wrapper, EmptyState, LabeledRow, Text } from '../../UI'
import DerivationModal from '../Analysis/DerivationModal'
import socialCasesActions from '../../../state/actions/socialCase'
import { formatDate } from '../../../formatters'

const Analysis = () => {
  const { socialCaseId } = useParams()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const { caseDetails, derivationDetails } = useSelector(
    (state) => state.socialCase
  )

  const openModal = () => {
    setOpen(true)
  }
  const closeModal = () => {
    setOpen(false)
  }

  useEffect(() => {
    dispatch(
      socialCasesActions.getDerivation(socialCaseId, caseDetails.derivationId),
      closeModal()
    )
  }, [caseDetails])

  return (
    <Grid item xs={12}>
      {!derivationDetails ? (
        <Box>
          <Wrapper>
            <EmptyState
              message={'Este Caso No Tiene Derivación'}
              event={openModal}
              actionMessage={'Crear'}
            />
          </Wrapper>
          <DerivationModal
            open={open}
            onClose={closeModal}
            assistanceID={caseDetails.assistanceId}
          />
        </Box>
      ) : (
        <Wrapper>
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
                Detalles Delegación
              </Typography>
            </Box>
            <Box p={2}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <LabeledRow label={'Fecha'}>
                    <Text>{formatDate(derivationDetails.date)} </Text>
                  </LabeledRow>
                  <LabeledRow label={'Estado'}>
                    <Text>{derivationDetails.state} </Text>
                  </LabeledRow>
                  <LabeledRow label={'Prioridad'}>
                    <Text>{derivationDetails.priority}</Text>
                  </LabeledRow>
                  <LabeledRow label={'Observaciones'}>
                    <Text>{derivationDetails.observations}</Text>
                  </LabeledRow>
                </Grid>
                <Grid item xs={12} md={6}>
                  <LabeledRow label={'Encargados'}>
                    {derivationDetails.professionals.map((item, index) => (
                      <Text key={item.id}>
                        {index + 1} - {item.fullName}
                      </Text>
                    ))}
                  </LabeledRow>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Wrapper>
      )}
    </Grid>
  )
}

export default Analysis
