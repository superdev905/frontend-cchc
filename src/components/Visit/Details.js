import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import { endOfWeek } from 'date-fns'
import startOfWeek from 'date-fns/startOfWeek'
import { LabeledRow, StatusChip, Text, Wrapper, Button } from '../UI'
import { formatDate, formatHours } from '../../formatters'
import { useMenu, useSuccess, useToggle } from '../../hooks'
import commonActions from '../../state/actions/common'
import usersActions from '../../state/actions/users'
import assistanceActions from '../../state/actions/assistance'

const useStyles = makeStyles(() => ({
  buttonYellow: {
    '&:hover': {
      backgroundColor: '#f6e68f',
      border: 'none'
    }
  },
  buttonCancel: {
    '&:hover': {
      backgroundColor: '#FFEBF6',
      border: 'none'
    }
  },
  buttonFinish: {
    '&:hover': {
      backgroundColor: '#90EE90',
      border: 'none'
    }
  }
}))

const Details = ({ fetching }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useSelector((state) => state.auth)
  const { visit } = useSelector((state) => state.assistance)
  const [loading, setLoading] = useState(false)
  const [currentDate] = useState(new Date())
  const [shiftDetails, setShiftDetails] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const [currentEvent] = useState(null)
  const { handleClose } = useMenu()
  const { open: openCancel, toggleOpen: toggleOpenCancel } = useToggle()
  const { open: openFinish, toggleOpen: toggleOpenFinish } = useToggle()
  const { open: openStart, toggleOpen: toggleOpenStart } = useToggle()
  const { success, changeSuccess } = useSuccess()
  const [filters] = useState({
    start_date: startOfWeek(currentDate),
    end_date: endOfWeek(currentDate)
  })

  const fetchEvents = (query) => {
    dispatch(
      assistanceActions.getCalendarEvents({
        ...query,
        start_date: query.start_date
          ? new Date(query.start_date).toISOString()
          : null,
        end_date: query.end_date
          ? new Date(query.end_date).toISOString()
          : null,
        user_id: user?.id || null
      })
    )
  }

  const onCancelEvent = () => {
    setLoading(true)
    dispatch(assistanceActions.patchEvent(visit.id, { status: 'CANCELADA' }))
      .then(() => {
        setLoading(false)
        fetchEvents(filters)
        changeSuccess(true, () => {
          enqueueSnackbar('Evento cancelado', { variant: 'success' })
          handleClose()
          toggleOpenCancel()
          console.log('cancelado')
        })
      })
      .catch((err) => {
        setLoading(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const onFinishedEvent = () => {
    setLoading(true)
    dispatch(assistanceActions.patchEvent(visit.id, { status: 'TERMINADA' }))
      .then(() => {
        setLoading(false)
        fetchEvents(filters)
        changeSuccess(true, () => {
          enqueueSnackbar('Evento terminado', { variant: 'success' })
          handleClose()
          toggleOpenFinish()
          console.log('finalizado')
        })
      })
      .catch((err) => {
        setLoading(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const onStartEvent = () => {
    setLoading(true)
    dispatch(assistanceActions.patchEvent(visit.id, { status: 'INICIADA' }))
      .then(() => {
        setLoading(false)
        fetchEvents(filters)
        changeSuccess(true, () => {
          enqueueSnackbar('Evento actualizado a iniciado', {
            variant: 'success'
          })
          handleClose()
          toggleOpenStart()
          console.log('iniciado')
        })
      })
      .catch((err) => {
        setLoading(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const onPauseEvent = () => {
    setLoading(true)
    dispatch(assistanceActions.patchEvent(visit.id, { status: 'PAUSA' }))
      .then(() => {
        setLoading(false)
        fetchEvents(filters)
        changeSuccess(true, () => {
          enqueueSnackbar('Evento pausado', {
            variant: 'success'
          })
          handleClose()
          toggleOpenStart()
          console.log('pausado')
        })
      })
      .catch((err) => {
        setLoading(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  useEffect(() => {
    if (visit) {
      setLoading(true)
      dispatch(commonActions.getShiftDetails(visit.shift_id)).then((result) => {
        setShiftDetails(result)
        setLoading(false)
      })
      dispatch(usersActions.getUserDetails(visit.assigned_id)).then(
        (result) => {
          setLoading(false)
          setUserDetails(result)
        }
      )
    }
  }, [visit])

  useEffect(() => {
    fetchEvents(filters)
  }, [filters])

  return (
    <Wrapper>
      <Box
        p={1}
        display="flex"
        justifyContent="flex-end"
        className={classes.box}
      >
        <Button
          size="small"
          variant="outlined"
          // disabled={event.status === 'INICIADA'}
          onClick={onStartEvent}
          className={classes.buttonYellow}
        >
          Iniciar Visita
        </Button>
        <Button
          size="small"
          variant="outlined"
          // disabled={event.status === 'PAUSA'}
          onClick={onPauseEvent}
          className={classes.buttonYellow}
        >
          Pausar Visita
        </Button>
        <Button
          size="small"
          variant="outlined"
          // disabled={event.status === 'CANCELADA'}
          onClick={onCancelEvent}
          className={classes.buttonCancel}
        >
          Cancelar
        </Button>
        <Button
          size="small"
          variant="outlined"
          // disabled={event.status === 'TERMINADA'}
          onClick={onFinishedEvent}
          className={classes.buttonFinish}
        >
          Completar visita
        </Button>
        <Button>Atender trabajadores</Button>
      </Box>
      <Box p={1}>
        <Typography
          style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}
        >
          Detalles de visita
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <LabeledRow label="Título:">
              <Text loading={fetching}>{visit?.title}</Text>
            </LabeledRow>
            <LabeledRow label="Empresa:">
              <Text loaderWidth="80%" loading={fetching}>
                {visit?.business_name}
              </Text>
            </LabeledRow>
            <LabeledRow label="Obra:">
              <Text loaderWidth="80%" loading={fetching}>
                {visit?.construction_name}
              </Text>
            </LabeledRow>
            <LabeledRow label="Jornada:">
              <Text loading={loading || fetching}>{shiftDetails?.name} </Text>
            </LabeledRow>
            <LabeledRow label="Estado:">
              <Text loaderWidth="80%" loading={fetching}>
                {visit ? <StatusChip success label={visit.status} /> : ''}
              </Text>
            </LabeledRow>
          </Grid>
          <Grid item xs={12} md={6}>
            <LabeledRow label="Fecha:">
              <Text loading={fetching} loaderWidth="70%">
                {visit ? formatDate(visit.date) : ''}
              </Text>
            </LabeledRow>
            <LabeledRow label="Inicio:">
              <Text loading={fetching}>
                {visit ? formatHours(visit.start_date) : ''}
              </Text>
            </LabeledRow>
            <LabeledRow label="Fin:">
              <Text loading={fetching}>
                {visit ? formatHours(visit.end_date) : ''}
              </Text>
            </LabeledRow>{' '}
            <LabeledRow label="Profesional:">
              <Text loading={loading || fetching}>
                {userDetails
                  ? `${userDetails?.names} ${userDetails?.paternal_surname} ${userDetails?.maternal_surname}`
                  : ''}
              </Text>
            </LabeledRow>
          </Grid>
        </Grid>
      </Box>

      {currentEvent && openCancel && (
        <ConfirmDelete
          event="CANCEL"
          confirmText="Aceptar"
          open={openCancel}
          success={success}
          onClose={toggleOpenCancel}
          loading={loading}
          onConfirm={() => onCancelEvent()}
          message={
            <span>
              ¿Estás seguro de cancelar este evento:
              <strong>{currentEvent.title}</strong>?
            </span>
          }
        />
      )}

      {currentEvent && openFinish && (
        <ConfirmDelete
          event="FINISH"
          confirmText="Aceptar"
          open={openFinish}
          success={success}
          onClose={toggleOpenFinish}
          loading={loading}
          onConfirm={() => onFinishedEvent()}
          message={
            <span>
              ¿Estás seguro de completar este evento:
              <strong>{` ${currentEvent.title}`}</strong>?
            </span>
          }
        />
      )}

      {currentEvent && openStart && (
        <ConfirmDelete
          event="START"
          confirmText="Aceptar"
          open={openStart}
          success={success}
          onClose={toggleOpenFinish}
          loading={loading}
          onConfirm={() => onStartEvent()}
          message={
            <span>
              ¿Estás seguro de iniciar este evento:
              <strong>{` ${currentEvent.title}`}</strong>?
            </span>
          }
        />
      )}
    </Wrapper>
  )
}

export default Details
