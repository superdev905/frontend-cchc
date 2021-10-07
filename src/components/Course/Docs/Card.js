import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { FiPlus } from 'react-icons/fi'
import { useSnackbar } from 'notistack'
import { Skeleton } from '@material-ui/lab'
import { ConfirmDelete, FilePostulation, FileVisor } from '../../Shared'
import { formatDate } from '../../../formatters'
import { useToggle, useSuccess } from '../../../hooks'
import OtherDocuments from './OtherDocuments'
import coursesActions from '../../../state/actions/courses'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    marginBottom: 10,
    border: '1px solid black'
  },
  paper: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  },
  info: {
    fontWeight: 'bold'
  },
  addRoot: {
    minHeight: 200,
    borderRadius: 5,
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    border: `2px dashed ${theme.palette.gray.gray500}`
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
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const fetchDocuments = () => {
    setLoading(true)
    dispatch(coursesActions.getCoursesDocs({ courseId: idCourse })).then(() => {
      setLoading(false)
    })
  }

  const createDoc = (values) => {
    dispatch(
      coursesActions.createCourseDoc({
        ...values
      })
    )
      .then(() => {
        setLoading(false)
        changeSuccess(true)
        toggleOpenAdd()
        enqueueSnackbar('Documento agregado exitosamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
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
    <Box>
      <Box>
        {loader ? (
          <Box display="flex" marginBottom="10px">
            <Skeleton></Skeleton>
            <Skeleton style={{ marginLeft: '10px' }}></Skeleton>
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={6} md={4} lg={3}>
              <Box
                p={2}
                mr={3}
                className={classes.addRoot}
                onClick={toggleOpenAdd}
              >
                <FiPlus fontSize={40} opacity={0.7} />
              </Box>
            </Grid>

            <>
              {coursesDocs.map((item, index) => (
                <Grid item xs={6} md={4} lg={4}>
                  <Box key={`card--${index}`} className={classes.root} p={2}>
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
                </Grid>
              ))}
            </>
          </Grid>
        )}
      </Box>

      <OtherDocuments
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createDoc}
      />

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
