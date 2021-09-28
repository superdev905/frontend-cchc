import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { Wrapper } from '../../UI'
import useStyles from './styles'
import Actions from '../../Companies/Create/Actions'
import { useToggle } from '../../../hooks'
import scholarshipsActions from '../../../state/actions/scholarships'
import files from '../../../state/actions/files'
import { FileThumbnail, FileVisor } from '../../Shared'

const StepOneFiles = () => {
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

  const goBack = () => {
    dispatch(
      scholarshipsActions.updateCreate({ ...create, step: create.step - 1 })
    )
  }

  return (
    <Box className={classes.form}>
      <Box>
        <Typography align="center" className={classes.subtitle}>
          Postulación a <span> {application.scholarshipType.name}</span>
        </Typography>
      </Box>

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

      {openVisor && currentFile && (
        <FileVisor
          open={openVisor}
          onClose={toggleOpenVisor}
          src={currentFile.fileUrl}
          filename={currentFile.fileName}
        />
      )}
      <Actions
        showBackIcon={true}
        handleBack={goBack}
        backText="Anterior"
        handleNext={handleNext}
      />
    </Box>
  )
}

export default StepOneFiles
