import { Box, Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import { Button, PageHeading, Wrapper } from '../../components/UI'

import InclusiveCardEmployee from '../../components/Inclusive/inclusiveCardEmployee'
import InclusiveCardInterlocutor from '../../components/Inclusive/inclusiveCardInterlocutor'
import InclusiveCardEmployees from '../../components/Inclusive/inclusiveCardEmployees'
import InclusiveCardConstruction from '../../components/Inclusive/inclusiveCardConstruction'

const InclusiveDetails = () => {
  const history = useHistory()

  const goBack = () => {
    history.push('/employees')
  }

  return (
    <Wrapper>
      <Box>
        <PageHeading> Detalle: Trabajador</PageHeading>
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={goBack}>Rechazar</Button>
          <Button onClick={goBack}>Validar</Button>
          <Button onClick={goBack}>Aprobar cierre </Button>
        </Box>
        <Wrapper>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box justifyContent="space-between" alignItems="center">
                  <Wrapper>
                    {' '}
                    <InclusiveCardEmployees />
                  </Wrapper>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}></Grid>
            </Grid>
          </Box>
        </Wrapper>
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
    </Wrapper>
  )
}
export default InclusiveDetails
