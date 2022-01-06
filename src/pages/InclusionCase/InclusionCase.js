import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Alert } from '@material-ui/lab'
import { Box, Chip, Grid, makeStyles, Typography } from '@material-ui/core'
import inclusionActions from '../../state/actions/inclusion'
import socialCaseActions from '../../state/actions/socialCase'
import CompanyCard from '../../components/Company/CompanyCard'
import ContactCard from '../../components/Schedule/ContactCard'
import { UserCard } from '../../components/Users'
import { formatDate } from '../../formatters'
import { COLORS } from '../../utils/generateColor'
import { useToggle } from '../../hooks'
import Can from '../../components/Can'
import {
  CompanyRow,
  FileThumbnail,
  FileVisor,
  HeadingWithButton
} from '../../components/Shared'
import { Button, LabeledRow, Text, Wrapper } from '../../components/UI'
import {
  InclusionApproveDialog,
  InclusionCloseDialog,
  InclusionRejectDialog,
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
  const { open: openReject, toggleOpen: toggleOpenReject } = useToggle()
  const { open: openClose, toggleOpen: toggleOpenClose } = useToggle()
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()

  const createSocialCase = () => {
    dispatch(
      socialCaseActions.createSocialCase({
        date: new Date(),
        businessId: details.businessId,
        businessName: details.businessName,
        assistanceId: details.assistanceId,
        employeeRut: details.employeeRut,
        employeeId: details.employeeId,
        employeeNames: details.employeeNames.toUpperCase(),
        office: details.delegation,
        delegation: details.delegation,
        zone: details.delegation,
        professionalId: details.assistanceId,
        areaId: 1
      })
    ).then((res) => {
      dispatch(
        inclusionActions.updateCase(caseNumber, {
          socialCaseNumber: res.id
        })
      )
    })
  }

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
  const rejectCase = (values) =>
    dispatch(
      inclusionActions.rejectCase(caseNumber, {
        ...values,
        date: new Date().toISOString()
      })
    )

  const closeCase = (values) =>
    dispatch(
      inclusionActions.closeCase(caseNumber, {
        ...values,
        date: new Date().toISOString()
      })
    )
  const availableOptions = (action, value) => {
    if (action === 'reject' || action === 'approve') {
      if (value?.status === 'RECHAZADA') return true
      if (value?.status === 'APROBADA') return true
      if (value?.status === 'CERRADO') return true
    }
    if (action === 'close') {
      if (value?.status === 'RECHAZADA') return true
      if (value?.status === 'CERRADO') return true
    }
    return false
  }

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
            <Can
              availableTo={['ADMIN', 'JEFATURA', 'ANALISTA_CASOS']}
              yes={() => (
                <>
                  <Button
                    disabled={availableOptions('reject', details)}
                    danger
                    onClick={toggleOpenReject}
                  >
                    Rechazar
                  </Button>
                  <Button
                    disabled={availableOptions('approve', details)}
                    onClick={toggleOpenApprove}
                  >
                    Approbar
                  </Button>
                </>
              )}
              no={() => null}
            />
            <Can
              availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
              yes={() => (
                <Button
                  disabled={availableOptions('close', details)}
                  onClick={toggleOpenClose}
                >
                  Aprobar cierre
                </Button>
              )}
              no={() => null}
            />
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
                  <Text loading={loading} loaderWidth={'30%'}>
                    {details?.employee.run}
                  </Text>
                </LabeledRow>
                <LabeledRow label={'Nombres'}>
                  <Text loading={loading} loaderWidth={'40%'}>
                    {details?.employee.names}
                  </Text>
                </LabeledRow>
                <LabeledRow label={'Apellidos'}>
                  <Text
                    loading={loading}
                    loaderWidth={'70%'}
                  >{`${details?.employee?.paternalSurname} ${details?.employee?.maternalSurname}`}</Text>
                </LabeledRow>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Box className={classes.caseDetails} p={2}>
                  <Typography>Detalles de Caso</Typography>
                  <LabeledRow label={'Estado'}>
                    <Text loading={loading} loaderWidth={'40%'}>
                      {details && (
                        <Chip color="primary" label={details.status} />
                      )}
                    </Text>
                  </LabeledRow>
                  <LabeledRow label={'Fecha'}>
                    <Text loading={loading} loaderWidth={'20%'}>
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
                  {details?.attachment && (
                    <>
                      <Typography>Archivo adjunto</Typography>
                      <FileThumbnail
                        bgWhite
                        fileName={details?.attachment?.fileName}
                        date={details?.attachment?.uploadDate}
                        fileSize={details?.attachment?.fileSize}
                        onView={toggleOpenVisor}
                      />
                      {openVisor && (
                        <FileVisor
                          open={openVisor}
                          onClose={toggleOpenVisor}
                          src={details?.attachment?.fileUrl}
                          filename={details?.attachment?.fileName}
                        />
                      )}
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
            successFunction={() => {
              createSocialCase()
              fetchCaseDetails()
            }}
          />
        )}
        {openReject && (
          <InclusionRejectDialog
            open={openReject}
            onClose={toggleOpenReject}
            submitFunction={rejectCase}
            successFunction={fetchCaseDetails}
          />
        )}
        {openClose && (
          <InclusionCloseDialog
            open={openClose}
            onClose={toggleOpenClose}
            submitFunction={closeCase}
            successFunction={fetchCaseDetails}
          />
        )}
      </Box>
    </Wrapper>
  )
}
export default InclusiveDetails
