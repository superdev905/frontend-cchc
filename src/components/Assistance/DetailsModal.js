import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiArrowLeft as BackIcon } from 'react-icons/fi'
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import {
  Button,
  EmptyState,
  LabeledRow,
  StatusChip,
  Text,
  Wrapper
} from '../UI'
import { formatDate, formatHours } from '../../formatters'
import assistanceActions from '../../state/actions/assistance'
import { FileThumbnail, FileVisor } from '../Shared'
import { useToggle } from '../../hooks'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '70%'
    }
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  subHeading: {
    fontWeight: 'bold',
    marginBottom: 5
  }
}))

const AssistanceDetailsModal = ({ fetching, open, onClose, assistanceId }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { isMobile } = useSelector((state) => state.ui)
  const [loading, setLoading] = useState(false)
  const [attention, setAttention] = useState(null)
  const [currentFile, setCurrentFile] = useState(null)

  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()

  const fetchDetails = () => {
    setLoading(true)
    dispatch(assistanceActions.getAttentionDetails(assistanceId)).then(
      (result) => {
        setAttention(result)
        setLoading(false)
      }
    )
  }
  useEffect(() => {
    if (open) {
      fetchDetails()
    }
  }, [open])

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      classes={{ paper: classes.paper }}
    >
      <Box>
        <Wrapper>
          <Box p={1}>
            <Box display="flex" alignItems="center">
              <IconButton onClick={onClose}>
                <BackIcon />
              </IconButton>
              <Typography className={classes.heading}>
                Detalles de la asistencia
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box>
                  <LabeledRow label="Fecha: ">
                    <Text loading={fetching} loaderWidth="70%">
                      {attention ? formatDate(attention.date) : ''}
                    </Text>
                  </LabeledRow>
                  <LabeledRow label="Hora: ">
                    <Text loading={fetching} loaderWidth="70%">
                      {attention ? formatHours(attention.date) : ''}
                    </Text>
                  </LabeledRow>
                  <LabeledRow label="Estado: ">
                    <Text loaderWidth="80%" loading={fetching}>
                      <StatusChip success label={attention?.status} />
                    </Text>
                  </LabeledRow>
                  <LabeledRow label={'Contacto: '}>
                    <Text loading={loading}>{attention?.contact_method}</Text>
                  </LabeledRow>
                  <LabeledRow label={'Origen Sistema: '}>
                    <Text loading={loading}>{attention?.source_system}</Text>
                  </LabeledRow>
                  <LabeledRow label={'Origen Empresa: '}>
                    <Text loading={loading}>{attention?.source_business}</Text>
                  </LabeledRow>
                  <LabeledRow label="Empresa: ">
                    <Text loaderWidth="80%" loading={fetching}>
                      {attention?.business?.business_name}
                    </Text>
                  </LabeledRow>
                  <LabeledRow label="Obra: ">
                    <Text loaderWidth="80%" loading={fetching}>
                      {attention?.construction?.name}
                    </Text>
                  </LabeledRow>
                </Box>
                <Box mt={2}>
                  <Typography className={classes.subHeading}>
                    Trabajador
                  </Typography>
                  <LabeledRow label={'Rut: '}>
                    <Text loading={loading}>{attention?.employee_rut}</Text>
                  </LabeledRow>
                  <LabeledRow label={'Trabajador: '}>
                    <Text loading={loading}>
                      {`${attention?.employee_name} ${attention?.employee_lastname}`}
                    </Text>
                  </LabeledRow>
                </Box>
                <Box mt={2}>
                  <Typography className={classes.subHeading}>
                    Observaciones
                  </Typography>
                  <LabeledRow width={'0px'}>
                    <Text loading={loading}>
                      {attention?.observation || '---'}
                    </Text>
                  </LabeledRow>
                </Box>
              </Grid>
              <Grid attention xs={12} md={6}>
                <Box mt={2}>
                  <Typography className={classes.subHeading}>
                    Atención
                  </Typography>
                  <LabeledRow label={'Lugar de atención: '}>
                    <Text loading={loading}>{attention?.attention_place}</Text>
                  </LabeledRow>
                  <LabeledRow label={'Área: '}>
                    <Text loading={loading}>{attention?.area?.name}</Text>
                  </LabeledRow>
                  <LabeledRow label={'Tema: '}>
                    <Text loading={loading}>
                      {attention?.topic?.description}
                    </Text>
                  </LabeledRow>
                  <LabeledRow label={'Gestión: '}>
                    <Text loading={loading}>{attention?.management?.name}</Text>
                  </LabeledRow>
                  <LabeledRow label={'Informe Empresa: '}>
                    <Text loading={loading}>{attention?.company_report}</Text>
                  </LabeledRow>
                  {attention?.company_report_observation && (
                    <LabeledRow label={'Comentarios de informe: '}>
                      <Text loading={loading}>
                        {attention?.company_report_observation}
                      </Text>
                    </LabeledRow>
                  )}
                </Box>
                <Box mt={2}>
                  <Typography className={classes.subHeading}>
                    Caso social
                  </Typography>
                  <LabeledRow label={'Caso Social: '}>
                    <Text loading={loading}>{attention?.is_social_case}</Text>
                  </LabeledRow>
                  <LabeledRow label={'Caso: '}>
                    <Text loading={loading}>{attention?.case_id}</Text>
                  </LabeledRow>
                  <LabeledRow label={'Plan de Intervención: '}>
                    <Text loading={loading}>{attention?.task_id}</Text>
                  </LabeledRow>
                </Box>
              </Grid>
            </Grid>
            <Box mt={2}>
              <Typography className={classes.subHeading}>Archivos</Typography>

              {attention && attention?.attachments.length === 0 ? (
                <EmptyState message="No hay archivos adjuntos" />
              ) : (
                <>
                  <Grid container spacing={2}>
                    {attention?.attachments.map((item) => (
                      <Grid key={`attach-item%${item.id}`} item xs={12} md={6}>
                        <FileThumbnail
                          fileName={item.fileName}
                          date={item.uploadDate}
                          fileSize={item.fileSize}
                          onView={() => {
                            setCurrentFile(item)
                            toggleOpenVisor()
                          }}
                        />
                      </Grid>
                    ))}

                    {openVisor && currentFile && (
                      <FileVisor
                        open={openVisor}
                        onClose={toggleOpenVisor}
                        src={currentFile.fileUrl}
                        filename={currentFile.fileName}
                      />
                    )}
                  </Grid>
                </>
              )}
            </Box>
          </Box>
          <Box textAlign="right" marginTop="10px">
            <Button onClick={onClose}>Cerrar</Button>
          </Box>
        </Wrapper>
      </Box>
    </Drawer>
  )
}

export default AssistanceDetailsModal
