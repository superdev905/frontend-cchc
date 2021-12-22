import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Box, Typography, Grid } from '@material-ui/core'
import { LabeledRow, Text, Wrapper, Button } from '../UI'
import { FileThumbnail, FileVisor } from '../Shared'

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: '17px',
    fontWeight: 'bold',
    marginTop: '10px'
  }
}))

const Details = () => {
  const classes = useStyles()
  const history = useHistory()
  const { idUnemployed } = useParams()
  const [open, setOpen] = useState(false)

  const redirectHistory = () => {
    history.push(`/unemployed/${idUnemployed}/details/Benefits-history`)
  }

  return (
    <Wrapper>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
            Detalle Registro de Cesantia
          </Typography>
        </Box>
        <Box p={2}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography className={classes.heading}>
                Datos del Trabajador
              </Typography>
              <LabeledRow label={'Run'}>
                <Text>000000</Text>
              </LabeledRow>
              <LabeledRow label={'Nombres'}>
                <Text>00000000</Text>
              </LabeledRow>
              <LabeledRow label={'Apellido paterno'}>
                <Text>00000000</Text>
              </LabeledRow>
              <LabeledRow label={'Apellido materno'}>
                <Text>0000000000</Text>
              </LabeledRow>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography className={classes.heading}>
                Detalle de Empresa
              </Typography>
              <LabeledRow label={'Run'}>
                <Text>000000000</Text>
              </LabeledRow>
              <LabeledRow label={'Nombre'}>
                <Text>000000000000000</Text>
              </LabeledRow>
              <LabeledRow label={'Email'}>
                <Text>000000000000000</Text>
              </LabeledRow>
              <LabeledRow label={'Dirección'}>
                <Text>000000000000000000000</Text>
              </LabeledRow>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography className={classes.heading}>
                Datos Adicionales
              </Typography>
              <LabeledRow label={'Run'}>
                <Text>000000000</Text>
              </LabeledRow>
              <LabeledRow label={'Nombre'}>
                <Text>000000000000000</Text>
              </LabeledRow>
              <LabeledRow label={'Email'}>
                <Text>000000000000000</Text>
              </LabeledRow>
              <LabeledRow label={'Dirección'}>
                <Text>000000000000000000000</Text>
              </LabeledRow>
            </Grid>
            <Grid item xs={12} md={6}>
              <LabeledRow label={'Finiquito'}>
                <FileThumbnail
                  fileName={'test PDF'}
                  date={'12/12/12'}
                  fileSize={'23Mb'}
                  onView={() => setOpen(true)}
                  onDownload={() => {
                    console.log('dl')
                  }}
                />
              </LabeledRow>
              <Grid item xs={12} md={12}>
                <Box display="flex" justifyContent="flex-end" width={1}>
                  <Button onClick={redirectHistory}>
                    Ver Historial de Beneficios
                  </Button>
                </Box>
              </Grid>
            </Grid>
            {open && (
              <FileVisor
                open={open}
                onClose={() => setOpen(false)}
                src={
                  'https://image.freepik.com/vector-gratis/ilustracion-vectorial-cosmonauta_1441-11.jpg'
                }
                filename={'test name'}
              />
            )}
          </Grid>
        </Box>
      </Box>
    </Wrapper>
  )
}

export default Details
