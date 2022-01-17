import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import {
  FaUserLock as CompanyIcon,
  FaUserCog as WorkerIcon
} from 'react-icons/fa'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { endOfWeek } from 'date-fns'
import startOfWeek from 'date-fns/startOfWeek'
import assistanceActions from '../../state/actions/assistance'
import { formatDate, formatHours } from '../../formatters'
import { useSuccess, useToggle } from '../../hooks'
import { LabeledRow, StatusChip, Text, Wrapper, Button, DataCard } from '../UI'
import ReportModal from './Report/ReportModal'
import { ConfirmDelete, FileVisor } from '../Shared'
import MapModal from '../Constructions/MapModal'
import WorkerDialog from './WorkerDialog'

const useStyles = makeStyles(() => ({
  Cancel: {
    backgroundColor: '#E74C3C'
  },
  Complete: {
    backgroundColor: '#81d88d'
  },
  Start: {
    backgroundColor: '#f6e68f'
  },
  dataTitle: {
    fontSize: 15,
    opacity: 0.8,
    marginBottom: 5
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

  const { open: openCancel, toggleOpen: toggleOpenCancel } = useToggle()
  const { open: openStart, toggleOpen: toggleOpenStart } = useToggle()
  const { open: openView, toggleOpen: toggleOpenView } = useToggle()
  const { open: openVisitClose, toggleOpen: toggleOpenVisitClose } = useToggle()
  const { open: openWorkerDialog, toggleOpen: toggleOpenWorkerDialog } =
    useToggle()

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

          toggleOpenCancel()
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

          toggleOpenStart()
          fetchDetails()
        })
      })
      .catch((err) => {
        setLoading(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const onRequestVisitClose = () => {
    setLoading(true)
    dispatch(assistanceActions.requestVisitClose(visit.id))
      .then(() => {
        setLoading(false)
        fetchEvents(filters)
        changeSuccess(true, () => {
          enqueueSnackbar('Solicitud exitosa', {
            variant: 'success'
          })

          toggleOpenVisitClose()
          fetchDetails()
        })
      })
      .catch((err) => {
        setLoading(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const setVisitWorkers = (values) =>
    dispatch(assistanceActions.setWorkersQuantity(visit.id, values))

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
            visit?.status === 'INICIADA' ||
            visit?.is_close
          }
        >
          Iniciar visita
        </Button>
        {visit && visit.report ? (
          <Box>
            <Button
              disabled={visit?.status === 'TERMINADA' || visit?.is_close}
              onClick={toggleOpenEditReport}
            >
              Actualizar reporte
            </Button>
            <Button onClick={toggleOpenViewReport}>Ver reporte</Button>
          </Box>
        ) : (
          <Button
            disabled={Boolean(visit?.report) || visit?.is_close}
            onClick={toggleOpenReport}
          >
            Informar
          </Button>
        )}

        <Button
          onClick={toggleOpenVisitClose}
          disabled={
            visit?.status === 'CANCELADA' ||
            visit?.is_close_pending ||
            visit?.is_close ||
            visit?.is_close_pending
          }
        >
          Enviar reporte y cierre
        </Button>
        <Button
          danger
          onClick={toggleOpenCancel}
          disabled={
            visit?.status === 'CANCELADA' ||
            visit?.status === 'TERMINADA' ||
            visit?.is_close
          }
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
          {visit?.is_close && (
            <Grid item xs={12}>
              <Box>
                <Alert severity="error">Esta visita fue cerrada</Alert>
              </Box>
            </Grid>
          )}
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
              <Text loading={loading || fetching}>{visit?.shift?.name} </Text>
            </LabeledRow>
            <LabeledRow label="Estado:">
              <Text loaderWidth="80%" loading={fetching}>
                {visit ? <StatusChip success label={visit.status} /> : ''}
              </Text>
            </LabeledRow>
          </Grid>
          {openWorkerDialog && visit && (
            <WorkerDialog
              open={openWorkerDialog}
              onClose={toggleOpenWorkerDialog}
              data={{
                company_workers: visit?.company_workers || 0,
                outsourced_workers: visit?.outsourced_workers || 0
              }}
              submitFunction={setVisitWorkers}
              successFunction={fetchDetails}
            />
          )}
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
                {`${visit?.assigned?.names} ${visit?.assigned?.paternal_surname} ${visit?.assigned?.maternal_surname}`}
              </Text>
            </LabeledRow>
            <LabeledRow label="Dirección:">
              <Text loading={loading || fetching}>
                {visit?.construction?.address}{' '}
              </Text>
              <Button size="small" onClick={toggleOpenView}>
                Ver Ubicación
              </Button>
            </LabeledRow>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid item xs={12} md={6}>
          <Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '10px'
                }}
              >
                Trabajadores
              </Typography>
              <Button
                size="small"
                disabled={visit?.is_close}
                onClick={toggleOpenWorkerDialog}
              >
                Actualizar
              </Button>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography className={classes.dataTitle}>
                  Trabajadores de casa:
                </Typography>
                <DataCard
                  icon={<CompanyIcon />}
                  data={visit?.company_workers || 0}
                  color="primary"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.dataTitle}>
                  Trabajadores de subcontrato:
                </Typography>
                <DataCard
                  icon={<WorkerIcon />}
                  data={visit?.outsourced_workers || 0}
                  color="purple"
                />
              </Grid>
            </Grid>
          </Box>
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
      {visit && openVisitClose && (
        <ConfirmDelete
          maxWidth="md"
          event="CLOSE-VISIT"
          confirmText="Solicitar"
          open={openVisitClose}
          success={success}
          onClose={toggleOpenVisitClose}
          loading={loading}
          onConfirm={() => onRequestVisitClose()}
          message={
            <Box>
              <Typography variant="h6">
                ¿Estás seguro de solicitar el cierre para este visita:
                <strong>{` ${visit.title}`}</strong>?
              </Typography>
              <Box mt={2}>
                <Alert severity="warning">
                  Se solicitará el cierre de la visita, al ser aprobada ya no se
                  podrá atender a los trabajadores
                </Alert>
              </Box>
            </Box>
          }
        />
      )}

      {visit?.construction && openView && (
        <MapModal
          open={openView}
          onClose={toggleOpenView}
          successFunction={fetchDetails}
          constructionId={visit?.construction_id}
        />
      )}
    </Wrapper>
  )
}

export default Details
