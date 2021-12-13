import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import housingActions from '../../state/actions/housing'
import { formatDate } from '../../formatters'
import { Button, LabeledRow, Text, Wrapper } from '../../components/UI'
import { HeadingWithButton } from '../../components/Shared'
import CompanyCard from '../../components/Company/CompanyCard'
import ContactCard from '../../components/Schedule/ContactCard'
import { AddAnnexedDialog, AgreementTabs } from '../../components/Agreement'
import { useToggle } from '../../hooks'

const useStyles = makeStyles((theme) => ({
  subHeading: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  },
  simpleHeading: {
    fontSize: 17,
    fontWeight: 'bold'
  }
}))

const Agreement = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const { agreementId } = useParams()
  const [loading, setLoading] = useState(false)
  const { agreementDetails } = useSelector((state) => state.housing)
  const { open, toggleOpen } = useToggle()

  const fetchDetails = () => {
    setLoading(true)
    dispatch(housingActions.getAgreementDetails(agreementId)).then(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchDetails()
  }, [])
  return (
    <Box>
      <Wrapper>
        <HeadingWithButton
          title={`Convenio ${agreementDetails?.number}: ${agreementDetails?.businessName}`}
          loading={loading}
          goBack={() => {
            history.goBack()
          }}
        />
        <Box mt={2}>
          <Typography className={classes.subHeading}>
            Detalles de convenio
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <LabeledRow label="Fecha:">
                  <Text loading={loading} loaderWidth="40%">
                    {agreementDetails && formatDate(agreementDetails.date)}
                  </Text>
                </LabeledRow>
                <LabeledRow label="Creado por:">
                  <Text loading={loading} loaderWidth="50%">
                    {`${agreementDetails?.author?.names} ${agreementDetails?.author?.paternalSurname}`}
                  </Text>
                </LabeledRow>
              </Grid>
              <Grid item xs={12} lg={6}>
                <LabeledRow label="Empresa:">
                  <Text loading={loading} loaderWidth="20%">
                    <a
                      href={`/company/${agreementDetails?.businessId}/details`}
                      target="_blank"
                    >
                      {agreementDetails?.businessName}
                    </a>
                  </Text>
                </LabeledRow>
                <LabeledRow label="Cantidad de trabajadores:" width="220px">
                  <Text loading={loading} loaderWidth="10%">
                    {agreementDetails?.totalEmployees}
                  </Text>
                </LabeledRow>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box mt={2}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <Typography className={classes.subHeading}>
                  Detalles de empresa
                </Typography>
                <CompanyCard
                  loading={loading}
                  company={agreementDetails?.business}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography className={classes.subHeading}>
                  Interlocutor de empresa
                </Typography>
                {agreementDetails && (
                  <ContactCard
                    contact={agreementDetails?.business?.interlocutor}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box mt={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography className={classes.simpleHeading}>
              Anexos de convenio
            </Typography>
            <Button onClick={toggleOpen}>Nuevo anexo</Button>
            {open && agreementDetails && (
              <AddAnnexedDialog
                selectedCompany={{ id: agreementDetails.businessId }}
                open={open}
                onClose={toggleOpen}
              />
            )}
          </Box>
          <AgreementTabs />
        </Box>
      </Wrapper>
    </Box>
  )
}
export default Agreement
