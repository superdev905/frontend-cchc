import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { useToggle, useSuccess } from '../../../hooks'
import coursesActions from '../../../state/actions/courses'
import DocsCard from './Card'

const DocumentList = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [deleting, setDeleting] = useState(false)
  const [currentDocument] = useState(null)
  const { success, changeSuccess } = useSuccess()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

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
        enqueueSnackbar('Documento eliminado exitosamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setDeleting(false)
      })
  }

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
      <Grid container>
        <DocsCard />
      </Grid>

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
