import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { LabeledRow, Text, Wrapper } from '../UI'
import { formatDate } from '../../formatters'
import { useToggle } from '../../hooks'
import { FileThumbnail, FileVisor } from '../Shared'

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
    marginBottom: '15px',
    marginTop: '5px'
  },
  files: {
    backgroundColor: theme.palette.gray.gray100
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
        <Grid item xs={12} md={6}>
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
            </Box>
            <Box>
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
            <Box>
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
            <Box>
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
            <Box>
              <Typography variant="h6" className={classes.title}>
                Comentarios
              </Typography>
              <Text loading={loading}> </Text>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} className={classes.files}>
          <Box p={3}>
            <Typography variant="h6" className={classes.title}>
              Archivos
            </Typography>

            <Wrapper>
              {application?.attachments.map((item, index) => (
                <Box mb="15px" key={index}>
                  <Typography> {item.name} </Typography>
                  <FileThumbnail
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
            </Wrapper>
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
