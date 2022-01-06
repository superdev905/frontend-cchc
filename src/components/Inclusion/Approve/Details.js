import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import inclusionActions from '../../../state/actions/inclusion'
import { UserCard } from '../../Users'
import { LabeledRow, Text } from '../../UI'
import { formatDate } from '../../../formatters'
import { FileThumbnail, FileVisor } from '../../Shared'
import { useToggle } from '../../../hooks'

const useStyles = makeStyles(() => ({
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5
  }
}))

const Details = ({ caseNumber }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [currentFile, setCurrentFile] = useState(null)
  const { approbation } = useSelector((state) => state.inclusion)
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  const fetchApprobationDetails = () => {
    setLoading(true)
    dispatch(inclusionActions.getApprobationDetails(caseNumber)).then(() => {
      setLoading(false)
    })
  }
  useEffect(() => {
    fetchApprobationDetails()
  }, [])
  return (
    <Box>
      {loading ? (
        <>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
        </>
      ) : (
        <Box>
          {approbation && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box>
                    <LabeledRow label={'Fecha: '}>
                      <Text loading={loading}>
                        {formatDate(approbation.date)}
                      </Text>
                    </LabeledRow>
                    <LabeledRow label={'Comentarios: '}>
                      <Text loading={loading}>{approbation.comments}</Text>
                    </LabeledRow>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Typography className={classes.label}>
                      Archivos adjuntos
                    </Typography>
                    {approbation.attachments.map((item) => (
                      <>
                        <Box>
                          <Typography>
                            Nombre de archivo:{' '}
                            <strong>{item.attachmentName}</strong>
                          </Typography>
                          <FileThumbnail
                            key={`approbation-file-${item.attachment.id}`}
                            fileName={item.attachment.fileName}
                            date={item.attachment.uploadDate}
                            fileSize={item.attachment.fileSize}
                            onView={() => {
                              setCurrentFile(item.attachment)
                              toggleOpenVisor()
                            }}
                          />
                        </Box>
                      </>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.label}>
                    Analista de casos
                  </Typography>

                  <UserCard user={approbation.analyst} />
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      )}
      {openVisor && currentFile && (
        <FileVisor
          open={openVisor}
          onClose={toggleOpenVisor}
          src={currentFile.fileUrl}
          filename={currentFile.fileName}
        />
      )}
    </Box>
  )
}

export default Details
