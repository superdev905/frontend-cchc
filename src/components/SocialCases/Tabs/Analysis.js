import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { FiEdit as EditIcon } from 'react-icons/fi'
import { Wrapper, EmptyState, LabeledRow, Text, Button } from '../../UI'
import DerivationModal from '../Analysis/DerivationModal'
import socialCase from '../../../state/types/socialCase'
import socialCasesActions from '../../../state/actions/socialCase'
import contactActions from '../../../state/actions/contact'
import { formatDate } from '../../../formatters'
import { ContactModal } from '../../Contacts'
import { UserCard } from '../../Users'
import { useToggle } from '../../../hooks'

const Analysis = () => {
  const { socialCaseId } = useParams()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [type, setType] = useState()
  const [loading, setLoading] = useState(false)
  const { caseDetails, derivationDetails } = useSelector(
    (state) => state.socialCase
  )
  const [currentContact, setCurrentContact] = useState(null)
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()

  const openModal = () => {
    setOpen(true)
    if (derivationDetails?.assistanceTitularId) {
      setType('EDIT')
    } else {
      setType('NEW')
    }
  }
  const closeModal = () => {
    setOpen(false)
  }

  const fetchDerivation = () => {
    if (caseDetails?.derivationId) {
      setLoading(true)

      dispatch(
        socialCasesActions.getDerivation(socialCaseId, caseDetails.derivationId)
      ).then(() => {
        setLoading(false)
      })
    } else {
      dispatch({ type: socialCase.GET_DERIVATION_DETAILS, payload: null })
    }
  }

  const onEditContact = (values) =>
    dispatch(
      contactActions.updateContact(currentContact.id, {
        ...currentContact,
        ...values,
        state: currentContact.state,
        email: values.email.toLowerCase()
      })
    )

  useEffect(() => {
    fetchDerivation()
  }, [caseDetails])

  return (
    <Grid item xs={12}>
      {loading ? (
        <Skeleton height={'300px'} />
      ) : (
        <>
          {!derivationDetails ? (
            <Box>
              <Wrapper>
                <EmptyState
                  message={'Este caso no tiene derivaci??n'}
                  event={openModal}
                  actionMessage={'Crear'}
                />
              </Wrapper>
              {caseDetails && (
                <DerivationModal
                  open={open}
                  onClose={closeModal}
                  assistanceID={caseDetails.assistanceId}
                  data={derivationDetails}
                  type={type}
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
                    Detalles Delegaci??n
                  </Typography>
                  <Box>
                    <Button onClick={openModal} startIcon={<EditIcon />}>
                      Editar an??lisis
                    </Button>
                  </Box>
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
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 6
                      }}
                    >
                      Profesionales
                    </Typography>
                    <Grid container spacing={2}>
                      {derivationDetails.professionals.map((item) => (
                        <Grid
                          item
                          xs={12}
                          lg={6}
                          key={`contact-card-${item.id}`}
                        >
                          <UserCard
                            user={item}
                            onEdit={() => {
                              setCurrentContact(item)
                              toggleOpenUpdate()
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                    {caseDetails && (
                      <DerivationModal
                        open={open}
                        onClose={closeModal}
                        assistanceID={caseDetails.assistanceId}
                        data={derivationDetails}
                        type={type}
                      />
                    )}
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
                        successMessage="Interlocutor actualizado con ??xito"
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Wrapper>
          )}
        </>
      )}
    </Grid>
  )
}

export default Analysis
