import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { Skeleton } from '@material-ui/lab'
import { ConfirmDelete, FilePostulation, FileVisor } from '../../Shared'
import { formatDate } from '../../../formatters'
import { useToggle, useSuccess } from '../../../hooks'
import coursesActions from '../../../state/actions/courses'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    marginBottom: 10
  },
  paper: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  },
  info: {
    fontWeight: 'bold'
  }
}))

const DocsCard = ({ loader }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { idCourse } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [deleting, setDeleting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentDocument, setCurrentDocument] = useState(null)
  const { success, changeSuccess } = useSuccess()
  const { coursesDocs } = useSelector((state) => state.courses)
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const fetchDocuments = () => {
    setLoading(true)
    dispatch(coursesActions.getCoursesDocs({ courseId: idCourse })).then(() => {
      setLoading(false)
    })
  }

  console.log(loading)

  const deleteDocument = (id) => {
    dispatch(
      coursesActions.patchCourseDoc(id, {
        state: 'DELETED'
      })
    )
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        toggleOpenDelete()
        fetchDocuments()
        enqueueSnackbar('Pago eliminado exitosamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setDeleting(false)
      })
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  return (
    <Box className={classes.root}>
      <Box>
        {loader ? (
          <Box display="flex" marginBottom="10px">
            <Skeleton width="30px"></Skeleton>
            <Skeleton width="40%" style={{ marginLeft: '10px' }}></Skeleton>
          </Box>
        ) : (
          <Grid container spacing={2}>
            <>
              {coursesDocs.map((item, index) => (
                <Box
                  key={`card--${index}`}
                  border="1px solid"
                  borderRadius={'8px'}
                  width="70%"
                >
                  <Box p={2}>
                    <Box
                      p={2}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    ></Box>
                    <FilePostulation.PDFPreview
                      bgWhite
                      fileName={item.file.fileName}
                      fileSize={item.fileSize}
                      onView={() => {
                        setCurrentDocument(item)
                        toggleOpenVisor()
                      }}
                      onRemove={() => {
                        setCurrentDocument(item)
                        toggleOpenDelete()
                      }}
                    />
                    <Grid container>
                      <Grid item xs={9} md={9} lg={9}>
                        <Typography className={classes.date}>
                          {formatDate(new Date())}
                        </Typography>
                      </Grid>
                      <Grid item xs={3} md={3} lg={3}>
                        <Typography>{item.file.fileSize}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              ))}
            </>
          </Grid>
        )}
      </Box>
      {openVisor && currentDocument && (
        <FileVisor
          open={openVisor}
          onClose={toggleOpenVisor}
          src={currentDocument.file.fileUrl}
          filename={currentDocument.file.fileName}
        />
      )}

      {currentDocument && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          onConfirm={() => deleteDocument(currentDocument.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar este pago?
            </Typography>
          }
          loading={deleting}
          success={success}
        />
      )}
    </Box>
  )
}

export default DocsCard
