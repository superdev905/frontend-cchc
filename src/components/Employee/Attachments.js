import { Box, Grid, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useToggle } from '../../hooks'
import employees from '../../state/actions/employees'
import files from '../../state/actions/files'
import { FileThumbnail, FileVisor } from '../Shared'
import { EmptyState, Wrapper } from '../UI'

const Attachments = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [attachments, setAttachments] = useState([])
  const [currentFile, setCurrentFile] = useState(null)
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  const { idEmployee } = useParams()
  useEffect(() => {
    setLoading(true)
    dispatch(employees.getAttachments(idEmployee)).then((result) => {
      setLoading(false)
      setAttachments(result)
    })
  }, [])
  return (
    <Wrapper>
      <Box mb={2}>
        <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
          Archivos adjuntos
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {loading ? (
          <>
            <Grid item xs={12} md={6}>
              <FileThumbnail.Loader />
            </Grid>
            <Grid item xs={12} md={6}>
              <FileThumbnail.Loader />
            </Grid>
            <Grid item xs={12} md={6}>
              <FileThumbnail.Loader />
            </Grid>
          </>
        ) : (
          <>
            {attachments.length === 0 ? (
              <EmptyState message="Este trabajador no tiene archivos adjuntos" />
            ) : (
              attachments.map((item) => (
                <Grid item xs={12} md={6} item={`file-thumbnail-${item.id}`}>
                  <FileThumbnail
                    fileName={item.fileName}
                    date={item.uploadDate}
                    fileSize={item.fileSize}
                    label={item.module}
                    onView={() => {
                      setCurrentFile(item)
                      toggleOpenVisor()
                    }}
                    onDownload={() => {
                      dispatch(files.downloadFile(item.fileUrl, item.fileName))
                    }}
                  />
                </Grid>
              ))
            )}
          </>
        )}
      </Grid>
      {currentFile && openVisor && (
        <FileVisor
          open={openVisor}
          onClose={toggleOpenVisor}
          filename={currentFile.fileName}
          src={currentFile.fileUrl}
        />
      )}
    </Wrapper>
  )
}

export default Attachments
