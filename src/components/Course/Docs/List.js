import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'
import { useToggle, useSuccess } from '../../../hooks'
import coursesActions from '../../../state/actions/courses'
import OtherDocsCard from './Card'
import { EmptyState } from '../../UI'
import OtherDocuments from './OtherDocuments'
import { ConfirmDelete, FileVisor } from '../../Shared'

const DocumentList = () => {
  const dispatch = useDispatch()
  const { idCourse } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [deleting, setDeleting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentDocument, setCurrentDocument] = useState(null)
  const [currentFile, setCurrentFile] = useState(null)
  const { coursesDocs } = useSelector((state) => state.courses)
  const { success, changeSuccess } = useSuccess()
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
        fetchDocuments()
        enqueueSnackbar('Documento agregado exitosamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const deleteDoc = (id) => {
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
        enqueueSnackbar('Documento eliminado exitosamente', {
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
      <Box
        mb={2}
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}
        >
          Otros Documentos
        </Typography>
      </Box>
      <Box>
        {loading ? (
          <>
            <OtherDocsCard.Loader />
            <OtherDocsCard.Loader />
          </>
        ) : (
          <OtherDocsCard.Container>
            <OtherDocsCard.AddCard onClick={toggleOpenAdd} />
            {coursesDocs.length === 0 ? (
              <EmptyState message="Aún no hay documentos" />
            ) : (
              coursesDocs.map((item) => (
                <OtherDocsCard
                  doc={item}
                  key={`doc-card-${item.id}`}
                  onView={(file) => {
                    setCurrentFile(file)
                    toggleOpenVisor()
                  }}
                  onRemove={() => {
                    setCurrentDocument(item)
                    toggleOpenDelete()
                  }}
                />
              ))
            )}
          </OtherDocsCard.Container>
        )}
      </Box>

      <OtherDocuments
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createDoc}
      />

      {currentFile && openVisor && (
        <FileVisor
          open={openVisor}
          onClose={toggleOpenVisor}
          filename={currentFile.fileName}
          src={currentFile.fileUrl}
        />
      )}

      {currentDocument && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          onConfirm={() => deleteDoc(currentDocument.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar este documento?
            </Typography>
          }
          loading={deleting}
          success={success}
        />
      )}
    </Box>
  )
}
export default DocumentList
