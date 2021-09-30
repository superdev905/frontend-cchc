import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { LabeledRow, Text } from '../UI'
import { formatDate, formatText } from '../../formatters'
import { useToggle } from '../../hooks'
import { FileThumbnail, FileVisor } from '../Shared'
import StatusCard from './StatusCard'
import StatusTimeline from './StatusTimeline'

import files from '../../state/actions/files'

const useStyles = makeStyles((theme) => ({
  head: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  },
  title: {
    color: theme.palette.common.black,
    marginBottom: '8px'
  },
  files: {
    backgroundColor: theme.palette.gray.gray100
  },
  box: {
    marginTop: '35px'
  }
}))

const PostulationDetails = ({ loading }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { application } = useSelector((state) => state.scholarships)
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  const [currentFile, setCurrentFile] = useState(null)

  return (
    <Box p={2} className={classes.head}>
      <Grid spacing={2} container>
        <Grid item xs={12} lg={6}>
          <Box>
            <Box p={2}>
              <LabeledRow label="Fecha:">
                <Text loading={loading}>
                  {application ? formatDate(application.date) : ''}
                </Text>
              </LabeledRow>
              <LabeledRow label="Beca">
                <Text loading={loading}>
                  {' '}
                  {application?.scholarshipType.name}
                </Text>
              </LabeledRow>
            </Box>
            <Box width="100%">
              <Alert severity="info">
                Estado de postulación: {application?.revisionStatus.status}{' '}
              </Alert>
              {application && (
                <StatusCard status={application?.revisionStatus} />
              )}
            </Box>
            <Box className={classes.box}>
              <Typography variant="h6" className={classes.title}>
                Trabajador
              </Typography>
              <LabeledRow label="Rut:">
                <Text loading={loading}> {application?.employeeRut}</Text>
              </LabeledRow>
              <LabeledRow label="Nombre:">
                <Text loading={loading}> {application?.employeeNames}</Text>
              </LabeledRow>
            </Box>
            <Box className={classes.box}>
              <Typography variant="h6" className={classes.title}>
                Empresa
              </Typography>
              <LabeledRow label="Rut:">
                <Text loading={loading}> {application?.businessRut}</Text>
              </LabeledRow>
              <LabeledRow label="Nombre:">
                <Text loading={loading}> {application?.businessName}</Text>
              </LabeledRow>
            </Box>
            <Box className={classes.box}>
              <Typography variant="h6" className={classes.title}>
                Beneficiario
              </Typography>
              <LabeledRow label="Rut:">
                <Text loading={loading}> {application?.beneficiaryRut}</Text>
              </LabeledRow>
              <LabeledRow label="Nombre:">
                <Text s loading={loading}>
                  {' '}
                  {application?.beneficiaryNames}
                </Text>
              </LabeledRow>
            </Box>

            <Box className={classes.box}>
              <Typography variant="h6" className={classes.title}>
                Universidad o Instituto
              </Typography>
              <LabeledRow label="Nombre:">
                <Text s loading={loading}>
                  {' '}
                  {application?.schoolName}
                </Text>
              </LabeledRow>
              <LabeledRow label="Region:">
                <Text s loading={loading}>
                  {' '}
                  {application?.schoolRegionDetails.name}
                </Text>
              </LabeledRow>
              <LabeledRow label="Comuna:">
                <Text s loading={loading}>
                  {' '}
                  {application?.schoolCommuneDetails.name}
                </Text>
              </LabeledRow>
            </Box>
            <Box className={classes.box}>
              <Typography variant="h6" className={classes.title}>
                Carrera
              </Typography>
              <LabeledRow label="Nombre:">
                <Text loading={loading}> {application?.career.name}</Text>
              </LabeledRow>
              <LabeledRow label="Tipo:">
                <Text s loading={loading}>
                  {' '}
                  {application?.career.type}
                </Text>
              </LabeledRow>
              <LabeledRow label="Puntaje PTU:">
                <Text loading={loading}> {application?.psuScore}</Text>
              </LabeledRow>
            </Box>
          </Box>
          <Box>
            <StatusTimeline />
          </Box>
        </Grid>

        <Grid item xs={12} lg={6} className={classes.files}>
          <Box p={2}>
            <Typography variant="h6" className={classes.title}>
              Archivos
            </Typography>

            {application?.attachments.map((item, index) => (
              <Box mb="20px" key={index}>
                <Typography style={{ marginBottom: '10px' }}>
                  {formatText.capitalizeString(item.name)}
                </Typography>
                <FileThumbnail
                  bgWhite
                  fileSize={item.fileSize}
                  date={item.uploadDate}
                  fileName={item.fileName}
                  onView={() => {
                    toggleOpenVisor()
                    setCurrentFile(item)
                  }}
                  onDownload={() => {
                    dispatch(files.downloadFile(item.fileUrl))
                  }}
                />
              </Box>
            ))}
          </Box>
        </Grid>

        {openVisor && currentFile && (
          <FileVisor
            open={openVisor}
            onClose={toggleOpenVisor}
            src={currentFile.fileUrl}
            filename={currentFile.fileName}
          />
        )}
      </Grid>
    </Box>
  )
}

export default PostulationDetails
