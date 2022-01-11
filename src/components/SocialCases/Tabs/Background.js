import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import { LabeledRow, Text, Wrapper } from '../../UI'

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: '17px',
    fontWeight: 'bold',
    marginTop: '10px'
  }
}))

const Background = () => {
  const classes = useStyles()
  const { caseDetails } = useSelector((state) => state.socialCase)
  return (
    <Wrapper>
      {caseDetails ? (
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
              Detalles de Caso Social
            </Typography>
          </Box>
          <Box p={2}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography className={classes.heading}>
                  Datos del Trabajador
                </Typography>
                <LabeledRow label={'Run'}>
                  <Text>{caseDetails.employee.run} </Text>
                </LabeledRow>
                <LabeledRow label={'Nombres'}>
                  <Text>{caseDetails.employee.names}</Text>
                </LabeledRow>
                <LabeledRow label={'Apellido paterno'}>
                  <Text>{caseDetails.employee.paternalSurname}</Text>
                </LabeledRow>
                <LabeledRow label={'Apellido materno'}>
                  <Text>{caseDetails.employee.maternalSurname}</Text>
                </LabeledRow>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography className={classes.heading}>
                  Detalle de Empresa
                </Typography>
                <LabeledRow label={'Run'}>
                  <Text>{caseDetails.business.rut}</Text>
                </LabeledRow>
                <LabeledRow label={'Nombre'}>
                  <Text>{caseDetails.business.businessName}</Text>
                </LabeledRow>
                <LabeledRow label={'Email'}>
                  <Text>{caseDetails.business.email}</Text>
                </LabeledRow>
                <LabeledRow label={'Dirección'}>
                  <Text>{caseDetails.business.address}</Text>
                </LabeledRow>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography className={classes.heading}>Area</Typography>
                <LabeledRow label={'Nombre'}>
                  <Text>{caseDetails.area.name}</Text>
                </LabeledRow>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography className={classes.heading}>
                  Información adicional
                </Typography>

                <LabeledRow width={200} label={'Profesional'}>
                  <Text>{`${caseDetails.professional.names} ${caseDetails.professional.paternalSurname} ${caseDetails.professional.maternalSurname}`}</Text>
                </LabeledRow>
                <LabeledRow width={200} label={'Tipo de Solicitud'}>
                  <Text>
                    {caseDetails.typeRequest ? caseDetails.typeRequest : 'TEST'}
                  </Text>
                </LabeledRow>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : null}
    </Wrapper>
  )
}

export default Background
