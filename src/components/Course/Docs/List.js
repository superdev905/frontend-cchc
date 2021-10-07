import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { FiPlus } from 'react-icons/fi'
import { useToggle, useSuccess } from '../../../hooks'
import OtherDocuments from './OtherDocuments'
import coursesActions from '../../../state/actions/courses'
import DocsCard from './Card'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    marginBottom: 10
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

const DocumentList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [currentDocument] = useState(null)
  const { success, changeSuccess } = useSuccess()
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  console.log(loading)

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
        <Grid item xs={6} md={4} lg={3}>
          <Box p={2} mr={3} className={classes.addRoot} onClick={toggleOpenAdd}>
            <FiPlus fontSize={40} opacity={0.7} />
          </Box>
        </Grid>

        <DocsCard />
      </Grid>

      <OtherDocuments
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createDoc}
      />

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
