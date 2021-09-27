import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { LabeledRow, Text, Wrapper } from '../../UI'
import useStyles from './styles'
import Actions from '../../Companies/Create/Actions'
import { useToggle } from '../../../hooks'
import scholarshipsActions from '../../../state/actions/scholarships'
import files from '../../../state/actions/files'
import { FileThumbnail, FileVisor } from '../../Shared'

const StepOne = ({ onClose }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { application, create } = useSelector((state) => state.scholarships)
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  const [currentFile, setCurrentFile] = useState(null)

  const getPostulationDetails = (id) => {
    dispatch(scholarshipsActions.getPostulationDetails(id))
  }

  useEffect(() => {
    getPostulationDetails()
  }, [])

  const handleNext = () => {
    dispatch(
      scholarshipsActions.updateCreate({ ...create, step: create.step + 1 })
    )
  }

  return (
    <Box className={classes.form}>
      <Box>
        <Typography align="center" className={classes.subtitle}>
          Postulación a <span> {application.scholarshipType.name}</span>
        </Typography>
      </Box>
      <Box className={classes.box}>
        <Grid xs={8} md={8} lg={8} className={classes.infoBox}>
          <Box className={classes.info}>
            <LabeledRow label="Beneficiario">
              <Text> {application.beneficiaryNames}</Text>
            </LabeledRow>
          </Box>
          <Box className={classes.info}>
            <LabeledRow label="Rut Beneficiario">
              <Text>{application.beneficiaryRut}</Text>
            </LabeledRow>
          </Box>

          <Box className={classes.info}>
            <LabeledRow label="Trabajador">
              <Text> {application.employeeNames}</Text>
            </LabeledRow>
          </Box>

          <Box className={classes.info}>
            <LabeledRow label="Rut Trabajador">
              <Text> {application.employeeRut}</Text>
            </LabeledRow>
          </Box>

          <Box className={classes.info}>
            <LabeledRow label="Empresa">
              <Text> {application.businessName}</Text>
            </LabeledRow>
          </Box>

          <Box className={classes.info}>
            <LabeledRow label="Rut Empresa">
              <Text> {application.businessRut}</Text>
            </LabeledRow>
          </Box>

          <Box className={classes.info}>
            <LabeledRow label="Carrera">
              <Text>{application.career.name}</Text>
            </LabeledRow>
          </Box>
          <Box className={classes.info}>
            <LabeledRow label="Institucion">
              <Text>{application.schoolName}</Text>
            </LabeledRow>
          </Box>

          <Box className={classes.info}>
            <LabeledRow label="Región">
              <Text>{application.schoolRegionDetails.name}</Text>
            </LabeledRow>
          </Box>

          <Box className={classes.info}>
            <LabeledRow label="Comuna">
              <Text> {application.schoolCommuneDetails.name}</Text>
            </LabeledRow>
          </Box>
        </Grid>
        <Box className={classes.files}>
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
      </Box>
      {openVisor && currentFile && (
        <FileVisor
          open={openVisor}
          onClose={toggleOpenVisor}
          src={currentFile.fileUrl}
          filename={currentFile.fileName}
        />
      )}
      <Actions
        showBackIcon={false}
        handleBack={onClose}
        backText="Cancelar"
        handleNext={handleNext}
      />
    </Box>
  )
}

export default StepOne
