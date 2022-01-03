import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Box, Typography, Grid } from '@material-ui/core'

import { LabeledRow, Text, Wrapper, Button } from '../UI'
import { FileThumbnail, FileVisor } from '../Shared'
import { formatDate } from '../../formatters'
import files from '../../state/actions/files'

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: '17px',
    fontWeight: 'bold',
    marginTop: '10px'
  },
  boxList: {
    background: 'rgb(245, 246, 248)',
    overflowY: 'scroll',
    height: '200px'
  }
}))

const Details = ({ loading }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { unemployed } = useSelector((state) => state.unemployed)
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
                <Text loading={loading}>{unemployed?.employee?.run}</Text>
              </LabeledRow>
              <LabeledRow label={'Nombres'}>
                <Text loading={loading}>{unemployed?.employee?.names}</Text>
              </LabeledRow>
              <LabeledRow label={'Apellido paterno'}>
                <Text loading={loading}>
                  {unemployed?.employee?.paternalSurname}
                </Text>
              </LabeledRow>
              <LabeledRow label={'Apellido materno'}>
                <Text loading={loading}>
                  {unemployed?.employee?.maternalSurname}
                </Text>
              </LabeledRow>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography className={classes.heading}>
                Asistente Social
              </Typography>
              <LabeledRow label={'Nombre'}>
                <Text loading={loading}>{unemployed?.assistance?.names}</Text>
              </LabeledRow>
              <LabeledRow label={'Apellidos'}>
                <Text
                  loading={loading}
                >{`${unemployed?.assistance?.paternalSurname} ${unemployed?.assistance?.maternalSurname}`}</Text>
              </LabeledRow>
              <LabeledRow label={'Email'}>
                <Text loading={loading}>{unemployed?.assistance?.email}</Text>
              </LabeledRow>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography className={classes.heading}>
                Datos Adicionales del Registro
              </Typography>
              <LabeledRow label={'Fecha de Registro'}>
                <Text loading={loading}>{formatDate(unemployed?.date)}</Text>
              </LabeledRow>
              <LabeledRow label={'Oficina'}>
                <Text loading={loading}>{unemployed?.office}</Text>
              </LabeledRow>
              <LabeledRow label={'Periodo'}>
                <Text loading={loading}>{unemployed?.period}</Text>
              </LabeledRow>
              <LabeledRow label={'Listado de Beneficios'}>
                <Box className={classes.boxList}>
                  <ol>
                    {[1, 2, 3, 4].map(() => (
                      <li>test</li>
                    ))}
                  </ol>
                </Box>
              </LabeledRow>
            </Grid>
            <Grid item xs={12} md={6}>
              <LabeledRow label={'Finiquito'}>
                <FileThumbnail
                  fileName={unemployed?.dismissalFile?.fileName}
                  date={formatDate(unemployed?.dismissalFile?.uploadDate)}
                  fileSize={unemployed?.dismissalFile?.fileSize}
                  onView={() => setOpen(true)}
                  onDownload={() => {
                    dispatch(
                      files.downloadFile(
                        unemployed?.dismissalFile?.fileUrl,
                        unemployed?.dismissalFile?.fileName
                      )
                    )
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
                src={unemployed.dismissalFile.fileUrl}
                filename={unemployed.dismissalFile.fileName}
              />
            )}
          </Grid>
        </Box>
      </Box>
    </Wrapper>
  )
}

export default Details
