import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import housingActions from '../../state/actions/housing'
import { formatDate } from '../../formatters'
import { LabeledRow, Text, Wrapper } from '../../components/UI'
import { HeadingWithButton } from '../../components/Shared'
import EmployeeList from '../../components/Agreement/EmployeeList'
import CompanyCard from '../../components/Company/CompanyCard'
import ContactCard from '../../components/Schedule/ContactCard'

const useStyles = makeStyles((theme) => ({
  subHeading: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  }
}))

const Agreement = () => {
  const classes = useStyles()
  const { agreementId } = useParams()
  const [loading, setLoading] = useState(false)
  const { agreementDetails } = useSelector((state) => state.housing)
  const dispatch = useDispatch()
  const history = useHistory()

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
          title={`Convenio ${agreementId}: ${agreementDetails?.businessName}`}
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
          <EmployeeList />
        </Box>
      </Wrapper>
    </Box>
  )
}
export default Agreement
