import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography, Grid } from '@material-ui/core'
import { Wrapper, EmptyState, LabeledRow, Text } from '../../UI'
import DerivationModal from '../Analysis/DerivationModal'
import socialCasesActions from '../../../state/actions/socialCase'
import contactActions from '../../../state/actions/contact'
import { formatDate } from '../../../formatters'
import { ContactCard, ContactModal } from '../../Contacts'
import { useToggle } from '../../../hooks'

const Analysis = () => {
  const { socialCaseId } = useParams()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const { caseDetails, derivationDetails } = useSelector(
    (state) => state.socialCase
  )
  const [currentContact, setCurrentContact] = useState(null)
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()

  const onEditContact = (values) =>
    dispatch(
      contactActions.updateContact(currentContact.id, {
        ...currentContact,
        ...values,
        state: currentContact.state,
        email: values.email.toLowerCase()
      })
    )

  const openModal = () => {
    setOpen(true)
  }
  const closeModal = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (caseDetails) {
      dispatch(
        socialCasesActions.getDerivation(
          socialCaseId,
          caseDetails.derivationId
        ),
        closeModal()
      )
    }
  }, [caseDetails])

  return (
    <Grid item xs={12}>
      {!derivationDetails ? (
        <Box>
          <Wrapper>
            <EmptyState
              message={'Este caso no tiene derivación'}
              event={openModal}
              actionMessage={'Crear'}
            />
          </Wrapper>
          {caseDetails && (
            <DerivationModal
              open={open}
              onClose={closeModal}
              assistanceID={caseDetails.assistanceId}
            />
          )}
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
            <Box>
              <Grid container>
                <Grid item xs={12} md={12}>
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
              </Grid>
              <Box mt={2}>
                <Typography
                  style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 6 }}
                >
                  Profesionales
                </Typography>
                <Grid container>
                  {derivationDetails.professionals.map((item) => (
                    <ContactCard
                      key={`contact-card-${item.id}`}
                      contact={item}
                      onEdit={() => {
                        setCurrentContact(item)
                        toggleOpenUpdate()
                      }}
                    />
                  ))}
                </Grid>
                {currentContact && openUpdate && (
                  <ContactModal
                    includeInterlocutor
                    open={openUpdate}
                    onClose={toggleOpenUpdate}
                    type="UPDATE"
                    data={currentContact}
                    submitFunction={onEditContact}
                    successFunc={() => {
                      dispatch(
                        socialCasesActions.getDerivation(
                          socialCaseId,
                          caseDetails.derivationId
                        )
                      )
                    }}
                    successMessage="Contacto actualizado con éxito"
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Wrapper>
      )}
    </Grid>
  )
}

export default Analysis