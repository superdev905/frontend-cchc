import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Wrapper, LabeledRow, Text, EmptyState } from '../../UI'
import { formatDate } from '../../../formatters'

const Closing = () => {
  const { caseDetails } = useSelector((state) => state.socialCase)

  useEffect(() => {}, [caseDetails])
  console.log(caseDetails)
  return (
    <Grid item xs={12}>
      {caseDetails?.state === 'SOLICITADO' ? (
        <Box>
          <Wrapper>
            <EmptyState message={'Este caso no fue cerrado'} />
          </Wrapper>
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
                Detalles de Cierre de Caso
              </Typography>
            </Box>
            <Box p={2}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <LabeledRow label={'Fecha'}>
                    <Text>{formatDate(caseDetails?.closing.date)} </Text>
                  </LabeledRow>
                  <LabeledRow label={'Estado'}>
                    <Text>{caseDetails?.closing.state} </Text>
                  </LabeledRow>
                  <LabeledRow label={'Encargado'}>
                    <Text>{caseDetails?.closing.professionalNames}</Text>
                  </LabeledRow>
                  <LabeledRow label={'Observaciones'}>
                    <Text>{caseDetails?.closing.observations}</Text>
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

export default Closing
