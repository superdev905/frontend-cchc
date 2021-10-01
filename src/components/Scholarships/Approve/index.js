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

  const getDisabledStatus = (status) => {
    if (status === 'POR_REVISAR') return false
    if (status === 'CREADA') return false
    return true
  }

  const handleRevisionError = (err, toggleFunction) => {
    setLoading(false)
    enqueueSnackbar(err, { variant: 'error' })
    toggleFunction()
    setComments('')
  }

  const getAction = (type) => {
    const actions = {
      APPROVE: scholarshipsActions.postulationApprove,
      REJECT: scholarshipsActions.postulationApprove,
      REVIEW: scholarshipsActions.postulationRevision
    }
    return actions[type]
  }

  const handleAction = (type, state, successMessage, toggleFunction) => {
    setLoading(true)
    dispatch(
      getAction(type)(idPostulation, {
        state,
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
              readOnly={getDisabledStatus(application.revisionStatus.status)}
            />
          </Box>
          <Box textAlign="center">
            <SubmitButton
              variant="outlined"
              disabled={Boolean(!comments) || comments.length < 50}
              onClick={toggleOpenReview}
            >
              Solicitar Revisión
            </SubmitButton>
            <SubmitButton
              danger
              onClick={toggleOpenReject}
              disabled={getDisabledStatus(application.revisionStatus.status)}
            >
              Rechazar
            </SubmitButton>
            <SubmitButton
              disabled={getDisabledStatus(application.revisionStatus.status)}
              onClick={toggleOpenApprove}
            >
              Aprobar
            </SubmitButton>
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
              'APPROVE',
              'APROBADA',
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
              'REJECT',
              'RECHAZADA',
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
              'REVIEW',
              'POR REVISAR',
              'Se solicitó revisón de la postulación',
              toggleOpenReject
            )
          }
        />
      )}
    </Dialog>
  )
}

export default RevisionDialog
