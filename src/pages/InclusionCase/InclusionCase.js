import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Alert } from '@material-ui/lab'
import { Box, Chip, Grid, makeStyles, Typography } from '@material-ui/core'
import { Button, LabeledRow, Text, Wrapper } from '../../components/UI'
import { CompanyRow, HeadingWithButton } from '../../components/Shared'
import inclusionActions from '../../state/actions/inclusion'
import CompanyCard from '../../components/Company/CompanyCard'
import ContactCard from '../../components/Schedule/ContactCard'
import { UserCard } from '../../components/Users'
import { formatDate } from '../../formatters'
import { COLORS } from '../../utils/generateColor'
import { useToggle } from '../../hooks'
import {
  InclusionApproveDialog,
  InclusionStatus
} from '../../components/Inclusion'

const useStyles = makeStyles((theme) => ({
  caseDetails: {
    backgroundColor: theme.palette.gray.gray100,
    borderRadius: 5
  }
}))

const InclusiveDetails = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { caseNumber } = useParams()
  const [loading, setLoading] = useState(false)
  const { inclusionCaseDetails: details } = useSelector(
    (state) => state.inclusion
  )
  const { open: openApprove, toggleOpen: toggleOpenApprove } = useToggle()

  const fetchCaseDetails = () => {
    setLoading(true)
    dispatch(inclusionActions.getCaseDetails(caseNumber)).then(() => {
      setLoading(false)
    })
  }

  const approveCase = (values) =>
    dispatch(
      inclusionActions.approveCase(caseNumber, {
        ...values,
        date: new Date().toISOString()
      })
    )

  useEffect(() => {
    fetchCaseDetails()
  }, [caseNumber])

  return (
    <Wrapper>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <HeadingWithButton
            loading={loading}
            title={`CASO N° ${caseNumber}: ${details?.employee?.names} ${details?.employee?.paternalSurname}`}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button>Rechazar</Button>
            <Button
              disabled={details?.status === 'APROBADA'}
              onClick={toggleOpenApprove}
            >
              Approbar
            </Button>
            <Button>Aprobar cierre </Button>
          </Box>
        </Box>
        <Box px={1}>
          <Box my={1}>
            <Alert severity="info" style={{ borderRadius: 5 }}>
              <Typography>
                Estado de caso: <strong>{details?.status}</strong>{' '}
              </Typography>
            </Alert>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <Typography>Detalles de trabajador</Typography>
                <LabeledRow label={'Rut de trabajador'}>
                  <Text loaderWidth={'30%'}>{details?.employee.run}</Text>
                </LabeledRow>
                <LabeledRow label={'Nombres'}>
                  <Text loaderWidth={'30%'}>{details?.employee.names}</Text>
                </LabeledRow>
                <LabeledRow label={'Apellidos'}>
                  <Text
                    loaderWidth={'30%'}
                  >{`${details?.employee.paternalSurname} ${details?.employee.maternalSurname}`}</Text>
                </LabeledRow>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Box className={classes.caseDetails} p={2}>
                  <Typography>Detalles de Caso</Typography>
                  <LabeledRow label={'Estado'}>
                    <Text loaderWidth={'40%'}>
                      {details && (
                        <Chip color="primary" label={details.status} />
                      )}
                    </Text>
                  </LabeledRow>
                  <LabeledRow label={'Fecha'}>
                    <Text loaderWidth={'20%'}>
                      {details && formatDate(details?.date)}
                    </Text>
                  </LabeledRow>
                  <LabeledRow label={'Departamento'}>
                    <Text loading={loading} loaderWidth={'30%'}>
                      {details?.delegation}
                    </Text>
                  </LabeledRow>
                  <LabeledRow label={'Modalidad de cobro'}>
                    <Text loading={loading} loaderWidth={'70%'}>
                      {details?.chargeMethod?.name}
                    </Text>
                  </LabeledRow>
                  {details && (
                    <>
                      <Typography>Jefatura</Typography>
                      <UserCard user={details?.boss} />
                      <Typography>Assistente</Typography>
                      <UserCard
                        avatarColor={COLORS[2]}
                        user={details?.assistance}
                      />
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box mt={1}>
            <Typography>Detalles de empresa</Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} lg={6}>
                <CompanyCard loading={loading} company={details?.business} />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography>Interlocutor de empresa</Typography>
                <ContactCard contact={details?.business?.interlocutor} />
              </Grid>
            </Grid>
          </Box>
          <Box mt={1}>
            <Typography>Obra</Typography>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                {details && (
                  <CompanyRow
                    type="CONSTRUCTION"
                    company={details?.construction}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
          <Box mt={1}>
            <Typography>Empresa facturadora</Typography>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                {details && <CompanyRow company={details?.business} />}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <InclusionStatus />
        {openApprove && (
          <InclusionApproveDialog
            open={openApprove}
            onClose={toggleOpenApprove}
            submitFunction={approveCase}
          />
        )}
      </Box>
    </Wrapper>
  )
}
export default InclusiveDetails
