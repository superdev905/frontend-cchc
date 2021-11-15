import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography, makeStyles, Chip } from '@material-ui/core'
import { LabeledRow, Text } from '../UI'
import { formatDate, formatText } from '../../formatters'
import { useToggle } from '../../hooks'
import { FileThumbnail, FileVisor } from '../Shared'
import StatusCard from './StatusCard'
import StatusTimeline from './StatusTimeline'

import files from '../../state/actions/files'

const useStyles = makeStyles((theme) => ({
  files: {
    backgroundColor: theme.palette.gray.gray100
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '17px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center'
  }
}))

const PostulationDetails = ({ loading }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { application } = useSelector((state) => state.scholarships)
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  const [currentFile, setCurrentFile] = useState(null)

  return (
    <Box p={2}>
      <Grid spacing={2} container>
        <Grid item xs={12} lg={6}>
          <Box>
            <Box>
              <LabeledRow label="Fecha:">
                <Text loading={loading}>
                  {application ? formatDate(application.date) : ''}
                </Text>
              </LabeledRow>
              <LabeledRow label="Tipo de beca">
                <Text loading={loading}>
                  <Chip
                    color="primary"
                    label={application?.scholarshipType.name}
                  ></Chip>
                </Text>
              </LabeledRow>
              {application && application.state === 'DELETED' && (
                <LabeledRow label="Estado">
                  <Text loading={loading}>
                    <Chip
                      color="error"
                      label={'Esta postulacion fue eliminada'}
                    ></Chip>
                  </Text>
                </LabeledRow>
              )}

              <LabeledRow label="Creado por">
                <Text loading={loading}>
                  {`${application?.createdBy.names} ${application?.createdBy.paternalSurname}`}
                </Text>
              </LabeledRow>
            </Box>
            <Box width="100%" mt={3}>
              <Typography className={classes.heading}>
                Estado de postulación
              </Typography>
              {application && (
                <StatusCard status={application?.revisionStatus} />
              )}
            </Box>

            <Box mt={2}>
              <Typography className={classes.heading}>
                Detalles de empresa
              </Typography>
              <LabeledRow label="Rut:">
                <Text loading={loading}> {application?.business.rut}</Text>
              </LabeledRow>
              <LabeledRow label="Razón social:">
                <Text loading={loading}>
                  {application?.business.businessName}
                </Text>
              </LabeledRow>
              <LabeledRow label="Dirección:">
                <Text loading={loading}>{application?.business.address}</Text>
              </LabeledRow>
              <LabeledRow label="Correo:">
                <Text loading={loading}>{application?.business.email}</Text>
              </LabeledRow>
            </Box>
            {application && application.relatedBusiness && (
              <Box mt={2}>
                <Typography className={classes.heading}>
                  Detalles de empresa relacionada
                </Typography>
                <LabeledRow label="Rut:">
                  <Text loading={loading}>
                    {' '}
                    {application?.relatedBusiness.rut}
                  </Text>
                </LabeledRow>
                <LabeledRow label="Razón social:">
                  <Text loading={loading}>
                    {application?.relatedBusiness.businessName}
                  </Text>
                </LabeledRow>
                <LabeledRow label="Dirección:">
                  <Text loading={loading}>
                    {application?.relatedBusiness.address}
                  </Text>
                </LabeledRow>
                <LabeledRow label="Correo:">
                  <Text loading={loading}>
                    {application?.relatedBusiness.email}
                  </Text>
                </LabeledRow>
              </Box>
            )}
            <Box mt={2}>
              <Typography className={classes.heading}>Trabajador</Typography>
              <LabeledRow label="Nombres:">
                <Text loading={loading}>
                  {`${application?.employee.names} ${application?.employee.paternalSurname} ${application?.employee.maternalSurname}`}
                </Text>
              </LabeledRow>
              <LabeledRow label="Run:">
                <Text loading={loading}>{application?.employee.run}</Text>
              </LabeledRow>
            </Box>
            <Box mt={2}>
              <Typography className={classes.heading}>Beneficiario</Typography>
              <LabeledRow label="Nombres:">
                <Text loading={loading}>
                  {`${application?.beneficiary.names} ${application?.beneficiary.paternalSurname} ${application?.beneficiary.maternalSurname}`}
                </Text>
              </LabeledRow>
              <LabeledRow label="Run:">
                <Text loading={loading}>
                  {application?.beneficiary?.run || 'Sin run'}
                </Text>
              </LabeledRow>
              {application &&
              application.beneficiary &&
              application.beneficiary.isRelative ? (
                <LabeledRow label="Parentesco">
                  <Text loading={loading}>
                    {formatText.capitalizeString(
                      application?.beneficiary.relationship
                    )}
                  </Text>
                </LabeledRow>
              ) : (
                <Chip
                  color="primary"
                  label="EL trabajador es beneficiario"
                ></Chip>
              )}
            </Box>
            <Box mt={2}>
              <Typography className={classes.heading}>
                Universidad o Instituto
              </Typography>
              <LabeledRow label="Nombre:">
                <Text s loading={loading}>
                  {application?.schoolName}
                </Text>
              </LabeledRow>
              <LabeledRow label="Región:">
                <Text s loading={loading}>
                  {application?.schoolRegionDetails.name}
                </Text>
              </LabeledRow>
              <LabeledRow label="Comuna:">
                <Text s loading={loading}>
                  {application?.schoolCommuneDetails.name}
                </Text>
              </LabeledRow>
            </Box>
            <Box mt={2}>
              <Typography className={classes.heading}>Carrera</Typography>
              <LabeledRow label="Nombre:">
                <Text loading={loading}> {application?.career.name}</Text>
              </LabeledRow>
              <LabeledRow label="Tipo:">
                <Text s loading={loading}>
                  {application &&
                    formatText.capitalizeString(application?.career.type)}
                </Text>
              </LabeledRow>
              <LabeledRow label="Puntaje PTU:">
                <Text loading={loading}> {application?.psuScore}</Text>
              </LabeledRow>
            </Box>
          </Box>
          <Box mt={2}>
            <StatusTimeline />
          </Box>
        </Grid>

        <Grid item xs={12} lg={6} className={classes.files}>
          <Box p={1}>
            <Typography className={classes.heading}>Archivos</Typography>

            {application?.attachments.map((item, index) => (
              <Box mb="20px" key={index}>
                <Typography style={{ marginBottom: '10px' }}>
                  {formatText.capitalizeString(item.displayName)}
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
                    dispatch(files.downloadFile(item.fileUrl, item.fileName))
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
