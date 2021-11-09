import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import { endOfWeek } from 'date-fns'
import startOfWeek from 'date-fns/startOfWeek'
import commonActions from '../../state/actions/common'
import assistanceActions from '../../state/actions/assistance'
import usersActions from '../../state/actions/users'
import { LabeledRow, StatusChip, Text, Wrapper, Button } from '../UI'
import { formatDate, formatHours } from '../../formatters'
import { useMenu, useSuccess, useToggle } from '../../hooks'
import ReportModal from './Report/ReportModal'
import { ConfirmDelete, FileVisor } from '../Shared'
import constructionsActions from '../../state/actions/constructions'
import MapModal from '../Constructions/MapModal'

const useStyles = makeStyles(() => ({
  Cancel: {
    backgroundColor: '#E74C3C'
  },
  Complete: {
    backgroundColor: '#81d88d'
  },
  Start: {
    backgroundColor: '#f6e68f'
  }
}))

const Details = ({ fetching, fetchDetails }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useSelector((state) => state.auth)
  const { visit } = useSelector((state) => state.assistance)
  const [loading, setLoading] = useState(false)
  const [currentDate] = useState(new Date())
  const [shiftDetails, setShiftDetails] = useState(null)
  const [consDetails, setConsDetails] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const { open: openReport, toggleOpen: toggleOpenReport } = useToggle()
  const { open: openViewReport, toggleOpen: toggleOpenViewReport } = useToggle()
  const { open: openEditReport, toggleOpen: toggleOpenEditReport } = useToggle()

  const createReport = (values) => {
    const data = {
      user_name: `${user.names} ${user.paternal_surname} ${user?.maternal_surname}`,
      user_email: user.email,
      user_phone: '---',
      date: `${formatDate(new Date(), { weekday: 'long' })} ${formatDate(
        new Date()
      )} a las ${formatHours(new Date())}`,
      contacts: [{ contact_id: '', contact_names: '', contact_email: '' }],
      ...values
    }
    return dispatch(assistanceActions.createVisitReport(visit.id, data))
  }

  const { handleClose } = useMenu()
  const { open: openCancel, toggleOpen: toggleOpenCancel } = useToggle()
  const { open: openFinish, toggleOpen: toggleOpenFinish } = useToggle()
  const { open: openStart, toggleOpen: toggleOpenStart } = useToggle()
  const { open: openView, toggleOpen: toggleOpenView } = useToggle()

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
          fetchDetails()
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
          fetchDetails()
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
          fetchDetails()
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
      dispatch(
        constructionsActions.getConstruction(visit.construction_id)
      ).then((result) => {
        setConsDetails(result)
        setLoading(false)
      })
    }
  }, [visit])

  useEffect(() => {
    if (openView) {
      dispatch(
        constructionsActions.getConstruction(visit.construction_id)
      ).then((result) => {
        setConsDetails(result)
        setLoading(false)
      })
    }
  }, [openView])

  useEffect(() => {
    fetchEvents(filters)
  }, [filters])

  const updateReport = (values) =>
    dispatch(
      assistanceActions.updateVisitReport(visit.id, {
        ...visit.report,
        ...values,
        date: `${formatDate(new Date(), { weekday: 'long' })} ${formatDate(
          new Date()
        )} a las ${formatHours(new Date())}`
      })
    )

  return (
    <Wrapper>
      <Box p={1} display="flex" justifyContent="flex-end">
        <Button
          onClick={toggleOpenStart}
          disabled={
            visit?.status === 'CANCELADA' ||
            visit?.status === 'TERMINADA' ||
            visit?.status === 'INICIADA'
          }
        >
          Iniciar visita
        </Button>
        {visit && visit.report ? (
          <Box>
            <Button
              disabled={visit?.status === 'TERMINADA'}
              onClick={toggleOpenEditReport}
            >
              Actualizar reporte
            </Button>
            <Button onClick={toggleOpenViewReport}>Ver documento</Button>
          </Box>
        ) : (
          <Button disabled={Boolean(visit?.report)} onClick={toggleOpenReport}>
            Informar
          </Button>
        )}
        <Button
          onClick={toggleOpenFinish}
          disabled={Boolean(visit?.status !== 'INICIADA')}
        >
          Completar visita
        </Button>
        <Button
          danger
          onClick={toggleOpenCancel}
          disabled={Boolean(visit?.status === 'CANCELADA')}
          disabled={Boolean(visit?.status === 'TERMINADA')}
        >
          Cancelar
        </Button>

        {visit && openViewReport && (
          <FileVisor
            open={openViewReport}
            onClose={toggleOpenViewReport}
            src={visit.report.report_url}
            filename={visit.report.report_key}
          />
        )}

        {visit?.report && openEditReport && (
          <ReportModal
            type="UPDATE"
            open={openEditReport}
            onClose={toggleOpenEditReport}
            data={visit.report}
            submitFunction={updateReport}
            successFunction={fetchDetails}
            successMessage={'Reporte actualizado'}
          />
        )}
      </Box>
      <Box p={1}>
        <Typography
          style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}
        >
          {`Detalles de ${visit?.type_id === 1 ? ' Visita' : ' Tarea'}`}
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
            <LabeledRow label="Dirección:">
              <Text loading={loading || fetching}>{consDetails?.address} </Text>
              <Button size="small" onClick={toggleOpenView}>
                Ver Ubicación
              </Button>
            </LabeledRow>
          </Grid>
        </Grid>
      </Box>
      {visit && openReport && (
        <ReportModal
          open={openReport}
          onClose={toggleOpenReport}
          submitFunction={createReport}
          successFunction={fetchDetails}
        />
      )}

      {visit && openCancel && (
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
              <strong>{visit.title}</strong>?
              <Box>
                <Text className={classes.Cancel}>CANCELAR</Text>
              </Box>
            </span>
          }
        />
      )}

      {visit && openFinish && (
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
              <strong>{` ${visit.title}`}</strong>?
              <Box>
                <Text className={classes.Complete}>COMPLETAR</Text>
              </Box>
            </span>
          }
        />
      )}

      {visit && openStart && (
        <ConfirmDelete
          event="START"
          confirmText="Aceptar"
          open={openStart}
          success={success}
          onClose={toggleOpenStart}
          loading={loading}
          onConfirm={() => onStartEvent()}
          message={
            <span>
              ¿Estás seguro de iniciar este evento:
              <strong>{` ${visit.title}`}</strong>?
              <Box>
                <Text className={classes.Start}>INICIAR</Text>
              </Box>
            </span>
          }
        />
      )}

      {visit?.construction && openView && (
        <MapModal
          open={openView}
          onClose={toggleOpenView}
          successFunction={fetchDetails}
        />
      )}
    </Wrapper>
  )
}

export default Details
