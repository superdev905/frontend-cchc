import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSuccess, useToggle } from '../../../hooks'
import scholarshipsActions from '../../../state/actions/scholarships'
import { ConfirmDelete, Dialog } from '../../Shared'
import { SubmitButton, TextArea } from '../../UI'
import StatusTimeline from '../StatusTimeline'
import Chip from '../Chip'

const useStyles = makeStyles((theme) => ({
  status: {
    fontSize: 20,
    padding: `${theme.spacing(2)}px 0px`
  },
  timeline: {
    backgroundColor: theme.palette.gray.gray100,
    borderRadius: 5
  },
  chip: {
    fontSize: 22,
    marginLeft: 8
  }
}))

const RevisionDialog = ({ open, onClose, successFunction }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { idPostulation } = useParams()
  const [comments, setComments] = useState('')
  const [loading, setLoading] = useState(false)
  const { isMobile } = useSelector((state) => state.ui)
  const { application } = useSelector((state) => state.scholarships)
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const { open: openApprove, toggleOpen: toggleOpenApprove } = useToggle()
  const { open: openReject, toggleOpen: toggleOpenReject } = useToggle()
  const { open: openReview, toggleOpen: toggleOpenReview } = useToggle()
  const {
    open: openCompleteDocuments,
    toggleOpen: toggleOpenCompleteDocuments
  } = useToggle()
  const {
    open: openAssignedScholarship,
    toggleOpen: toggleOpenAssignedScholarship
  } = useToggle()

  const handleRevisionError = (err, toggleFunction) => {
    setLoading(false)
    enqueueSnackbar(err, { variant: 'error' })
    toggleFunction()
    setComments('')
  }

  const handleAction = (state, name, successMessage, toggleFunction) => {
    setLoading(true)
    dispatch(
      scholarshipsActions.postulationChangeStatus(idPostulation, {
        status: state,
        name,
        date: new Date(),
        comments
      })
    )
      .then(() => {
        setLoading(false)

        changeSuccess(true, () => {
          toggleFunction()
          enqueueSnackbar(successMessage, {
            variant: 'success'
          })
          onClose()
          successFunction()
        })
      })
      .catch((err) => {
        handleRevisionError(err, toggleFunction)
      })
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
    >
      <Typography
        align="center"
        style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}
      >
        Flujo de revisión postulación
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={7}>
          <Box> Estado Actual</Box>
          <Box>
            <Typography align="center" className={classes.status}>
              {application && (
                <Chip
                  label={application.revisionStatus.name}
                  status={application.revisionStatus.status}
                  className={classes.chip}
                  iconSize={24}
                />
              )}
            </Typography>
          </Box>
          <Box>
            <TextArea
              label="Comentarios"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </Box>
          <Box textAlign="center">
            <SubmitButton variant="outlined" onClick={toggleOpenReview}>
              Solicitar Revisión
            </SubmitButton>
            <SubmitButton
              variant="outlined"
              onClick={toggleOpenCompleteDocuments}
            >
              Documentación Completa
            </SubmitButton>
            <SubmitButton
              variant="outlined"
              onClick={toggleOpenAssignedScholarship}
            >
              Beca Asignada
            </SubmitButton>
          </Box>
          <Box textAlign="center">
            <SubmitButton danger onClick={toggleOpenReject}>
              Rechazar
            </SubmitButton>
            <SubmitButton onClick={toggleOpenApprove}>Aprobar</SubmitButton>
          </Box>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Box p={2} className={classes.timeline}>
            <StatusTimeline />
          </Box>
        </Grid>
      </Grid>
      {openApprove && (
        <ConfirmDelete
          event="APPROVE"
          open={openApprove}
          success={success}
          confirmText="Aprobar"
          onClose={toggleOpenApprove}
          loading={loading}
          message={<span>¿Estás seguro de aprobar esta postulación? </span>}
          onConfirm={() =>
            handleAction(
              'BECA_APROBADA',
              'Beca aprobada',
              'Postulación aprobada con éxito',
              toggleOpenApprove
            )
          }
        />
      )}

      {openReject && (
        <ConfirmDelete
          open={openReject}
          success={success}
          confirmText="Rechazar"
          onClose={toggleOpenReject}
          message={<span>¿Estás seguro de rechazar esta postulación? </span>}
          onConfirm={() =>
            handleAction(
              'RECHAZADA',
              'Rechazada',
              'Postulación rechazada',
              toggleOpenReject
            )
          }
        />
      )}

      {openReview && (
        <ConfirmDelete
          event="REVIEW"
          open={openReview}
          success={success}
          confirmText="Solicitar revisión"
          onClose={toggleOpenReview}
          message={
            <span>
              ¿Estás seguro de solicitar revisión de esta postulación?{' '}
            </span>
          }
          onConfirm={() =>
            handleAction(
              'REVISION',
              'Revisión',
              'Se solicitó revisón de la postulación',
              toggleOpenReject
            )
          }
        />
      )}

      {openCompleteDocuments && (
        <ConfirmDelete
          event="COMPLETEDOCUMENTS"
          open={openCompleteDocuments}
          success={success}
          confirmText="Documentación Completa"
          onClose={toggleOpenCompleteDocuments}
          message={<span>¿La documentación se encuentra completa? </span>}
          onConfirm={() =>
            handleAction(
              'DOCUMENTACION_COMPLETA',
              'Documentación completa',
              'Se solicitó revisón de la postulación',
              toggleOpenReject
            )
          }
        />
      )}

      {openAssignedScholarship && (
        <ConfirmDelete
          event="ASSIGNEDSCHOLARSHIP"
          open={openAssignedScholarship}
          success={success}
          confirmText="Asignar Beca"
          onClose={toggleOpenAssignedScholarship}
          message={<span>¿Está seguro de asignar ésta beca? </span>}
          onConfirm={() =>
            handleAction(
              'BECA_ASIGNADA',
              'Beca asignada',
              'Beca asignada exitosamente',
              toggleOpenReject
            )
          }
        />
      )}
    </Dialog>
  )
}

export default RevisionDialog
