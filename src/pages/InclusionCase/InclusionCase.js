import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core'
import { Button, Wrapper } from '../../components/UI'
import { CompanyRow, HeadingWithButton } from '../../components/Shared'

import InclusiveCardEmployee from '../../components/Inclusive/inclusiveCardEmployee'
import InclusiveCardInterlocutor from '../../components/Inclusive/inclusiveCardInterlocutor'
import InclusiveCardConstruction from '../../components/Inclusive/inclusiveCardConstruction'
import inclusionActions from '../../state/actions/inclusion'
import CompanyCard from '../../components/Company/CompanyCard'
import ContactCard from '../../components/Schedule/ContactCard'

const InclusiveDetails = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { caseNumber } = useParams()
  const [loading, setLoading] = useState(false)
  const { inclusionCaseDetails: details } = useSelector(
    (state) => state.inclusion
  )
  const goBack = () => {
    history.push('/inclusio')
  }

  const fetchCaseDetails = () => {
    setLoading(true)
    dispatch(inclusionActions.getCaseDetails(caseNumber)).then(() => {
      setLoading(false)
    })
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
            <Button onClick={goBack}>Rechazar</Button>
            <Button onClick={goBack}>Validar</Button>
            <Button onClick={goBack}>Aprobar cierre </Button>
          </Box>
        </Box>
        <Box px={1}>
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
                <CompanyRow
                  type="CONSTRUCTION"
                  company={details?.construction}
                />
                <CompanyCard loading={loading} company={details?.business} />
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
          <Wrapper>
            <Box justifyContent="space-between" alignItems="center">
              <InclusiveCardEmployee />
            </Box>
          </Wrapper>
          <Wrapper>
            <Box justifyContent="space-between" alignItems="center">
              <InclusiveCardConstruction />
            </Box>
          </Wrapper>

          <Box justifyContent="space-between" alignItems="center">
            <InclusiveCardInterlocutor />
          </Box>
        </Box>
      </Box>
    </Wrapper>
  )
}
export default InclusiveDetails
