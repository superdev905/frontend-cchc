import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Box, Drawer, IconButton, Typography } from '@material-ui/core'
import { FiArrowLeft as BackIcon } from 'react-icons/fi'
import { formatCurrency, formatDate, formatText } from '../../../../formatters'
import { ActionsTable, Button, EmptyState, LabeledRow, Text } from '../../../UI'
import { useToggle, useSuccess } from '../../../../hooks'
import useStyles from './styles'
import PaymentCard from '../../ExtraPayments/Card'
import courses from '../../../../state/actions/courses'
import EmployeeTracking from '../../EmployeeTracking'
import AddScore from '../Score/AddScore'
import CourseStatus from '../Status/CourseStatus'
import StatusList from '../Status/List'
import {
  ConfirmDelete,
  DataTable,
  FileThumbnail,
  FileVisor
} from '../../../Shared'
import StudentPaymentCard from '../PaymentCard'

const EmployeeDialog = ({ open, onClose, idEmployee }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { idCourse } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [loadingPayments, setLoadingPayments] = useState(false)
  const [deletingPayment, setDeletingPayment] = useState(false)
  const [studentPayments, setStudentPayments] = useState([])
  const [scores, setScores] = useState([])
  const [currentPayment, setCurrentPayment] = useState(null)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [currentScore, setCurrentScore] = useState(null)
  const { isMobile } = useSelector((state) => state.ui)
  const { studentDetails: student } = useSelector((state) => state.courses)

  const { success, changeSuccess } = useSuccess()
  const {
    success: successDeletePayment,
    changeSuccess: changeSuccessDeletePayment
  } = useSuccess()
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openDeletePayment, toggleOpen: toggleOpenDeletePayment } =
    useToggle()
  const { open: openAddScore, toggleOpen: toggleOpenAddScore } = useToggle()
  const { open: openStatus, toggleOpen: toggleOpenStatus } = useToggle()
  const { open: openEditScore, toggleOpen: toggleOpenEditScore } = useToggle()
  const { open: openDeleteScore, toggleOpen: toggleOpenDeleteScore } =
    useToggle()
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()

  const fetchDetails = () => {
    setLoading(true)
    dispatch(courses.getStudentDetails(idCourse, idEmployee))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setTimeout(() => {
          setLoading(false)
          onClose()
          enqueueSnackbar('Error al obtener datos del estudiante', {
            variant: 'error'
          })
        }, 500)
      })
  }

  const fetchScores = () => {
    setLoading(true)
    dispatch(courses.getScores({ courseId: idCourse })).then((result) => {
      const score_ = result.items.filter(
        (item) => item.studentId === idEmployee
      )
      setScores(score_)
      setLoading(false)
    })
  }

  const fetchStatus = () => {}

  const addScore = (values) =>
    dispatch(
      courses.createScore({
        ...values,
        studentId: student.studentId
      })
    )

  const addStatus = (values) =>
    dispatch(
      courses.createStatus({
        ...values,
        studentId: student.studentId,
        courseId: idCourse
      })
    )

  const updateScore = (values) =>
    dispatch(
      courses.updateScore(currentScore.id, {
        ...values,
        studentId: student.studentId
      })
    )

  const deleteScore = (id) => {
    dispatch(
      courses.patchScore(id, {
        state: 'DELETED',
        studentId: student.studentId,
        courseId: idCourse
      })
    )
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        toggleOpenDeleteScore()
        fetchDetails()
        fetchScores()
        enqueueSnackbar('Nota eliminada exitosamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setDeleting(false)
      })
  }

  const fetchStudentPayments = () => {
    setLoadingPayments(true)
    dispatch(
      courses.getStudentPayments({ courseId: idCourse, studentId: idEmployee })
    ).then((result) => {
      setStudentPayments(result.items)
      setLoadingPayments(false)
    })
  }

  const createStudentPayment = (values) =>
    dispatch(
      courses.createStudentPayment({
        ...values,
        courseId: idCourse,
        studentId: idEmployee
      })
    )
  const deleteStudentPayment = () => {
    setDeletingPayment(true)
    dispatch(
      courses.patchStudentPayment(currentPayment.id, {
        state: 'DELETED'
      })
    )
      .then(() => {
        setDeletingPayment(false)
        changeSuccessDeletePayment(true, () => {
          toggleOpenDeletePayment()
          enqueueSnackbar('Pago eliminado', { variant: 'success' })
          fetchStudentPayments()
        })
      })
      .catch((err) => {
        setDeletingPayment(false)
        enqueueSnackbar(err, { variant: 'success' })
      })
  }
  useEffect(() => {
    if (open) {
      fetchDetails()
      fetchScores()
      fetchStatus()
      fetchStudentPayments()
    }
  }, [open])

  return (
    <Drawer
      classes={{ paper: classes.root }}
      anchor="right"
      fullScreen={isMobile}
      open={open}
      onClose={onClose}
    >
      <Box p={2}>
        <Box display={'flex'} alignItems={'center'} paddingTop={'20px'}>
          <IconButton onClick={onClose}>
            <BackIcon />
          </IconButton>
          <Text loading={loading} className={classes.userTitle}>
            {student &&
              `${student.student.names} ${student.student.paternalSurname} ${student.student.maternalSurname}`}
          </Text>
        </Box>
        <Box px={3}>
          <LabeledRow label={'Rut:'}>
            <Text loaderWidth={'20%'} loading={loading}>
              {student && `${student.student.run}`}
            </Text>
          </LabeledRow>
          <LabeledRow label={'Fecha de inscripción:'}>
            <Text loading={loading}>
              {student &&
                formatDate(student.enrollDate, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
            </Text>
          </LabeledRow>
          <LabeledRow label={'N° comprobante'}>
            <Text loaderWidth={'20%'} loading={loading}>
              {student?.entryNumber}
            </Text>
          </LabeledRow>
          <LabeledRow label={'Monto'}>
            <Text loaderWidth={'50%'} loading={loading}>
              {student && formatCurrency(student.amount)}
            </Text>
          </LabeledRow>
          <LabeledRow label={'Inscrito por:'}>
            <Text loaderWidth={'30%'} loading={loading}>
              {student &&
                `${student.createdBy.names} ${student.createdBy.paternalSurname} ${student.createdBy.maternalSurname}`}
            </Text>
          </LabeledRow>
          {student?.file && (
            <Box mt={1}>
              <Typography className={classes.subHeading}>
                Archivo adjunto
              </Typography>
              <FileThumbnail
                fileName={student.file.fileName}
                fileSize={student.file.fileSize}
                date={student.file.uploadDate}
                onView={() => {
                  toggleOpenVisor()
                }}
              />
              {openVisor && (
                <FileVisor
                  src={student.file.fileUrl}
                  filename={student.file.fileName}
                  open={openVisor}
                  onClose={toggleOpenVisor}
                />
              )}
            </Box>
          )}
        </Box>
        <Box px={3}>
          <Box className={classes.centeredSpaced}>
            <Typography>Porcentaje de asistencia</Typography>
          </Box>
          <Box className={classes.box}>
            {student && `${student.attendancePercentage}`}
          </Box>
        </Box>
        <Box px={3}>
          <Box className={classes.centeredSpaced}>
            <Typography>Pagos</Typography>
            <Button size="small" onClick={toggleOpenAdd}>
              Agregar
            </Button>
          </Box>
          <Box>
            {loadingPayments ? (
              <PaymentCard.Container>
                <PaymentCard.Loader size={12} />
                <PaymentCard.Loader size={12} />
              </PaymentCard.Container>
            ) : (
              <>
                {studentPayments.length === 0 ? (
                  <EmptyState message="Este trabajador no tiene pagos registrados" />
                ) : (
                  <>
                    {studentPayments.map((item) => (
                      <StudentPaymentCard
                        payment={item}
                        key={`payment-card-${item.id}`}
                        onDelete={() => {
                          setCurrentPayment(item)
                          toggleOpenDeletePayment()
                        }}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </Box>
        </Box>

        <Box px={3}>
          <Box marginBottom={2} className={classes.centeredSpaced}>
            <Typography>Notas</Typography>
            <Button size="small" onClick={toggleOpenAddScore}>
              Agregar
            </Button>
          </Box>
          <Box>
            {scores.length === 0 ? (
              <EmptyState
                message="Aún no hay notas"
                actionMessage="Nueva nota"
                event={toggleOpenAddScore}
              />
            ) : (
              <>
                <DataTable
                  data={scores}
                  columns={[
                    { name: 'Fecha', selector: (row) => formatDate(row.date) },
                    { name: 'Nota', selector: (row) => row.score },
                    {
                      name: '',
                      right: true,
                      selector: (row) => (
                        <ActionsTable
                          onEdit={() => {
                            setCurrentScore(row)
                            toggleOpenEditScore()
                          }}
                          onDelete={() => {
                            setCurrentScore(row)
                            toggleOpenDeleteScore()
                          }}
                        />
                      )
                    }
                  ]}
                />
              </>
            )}
          </Box>
        </Box>
        <Box px={3}>
          <Box className={classes.centeredSpaced}>
            <Typography>Promedio</Typography>
          </Box>
          <Box className={classes.box}>
            {student && `${parseFloat(student.average).toFixed(2)}`}
          </Box>
        </Box>
        <Box px={3}>
          <Box marginTop={2} className={classes.centeredSpaced}>
            <Typography>Estado de alumno</Typography>
            <Button
              size="small"
              onClick={toggleOpenStatus}
              disabled={student?.status}
            >
              Agregar
            </Button>
          </Box>
          <StatusList successFunction={fetchDetails} />
        </Box>
      </Box>

      {openAdd && (
        <EmployeeTracking
          open={openAdd}
          submitFunction={createStudentPayment}
          onClose={toggleOpenAdd}
          successFunction={fetchStudentPayments}
          successMessage={'Pago creado'}
        />
      )}
      {openDeletePayment && currentPayment && (
        <ConfirmDelete
          open={openDeletePayment}
          onClose={toggleOpenDeletePayment}
          onConfirm={() => deleteStudentPayment()}
          message={
            <>
              <Typography variant="h6">
                ¿Estás seguro de eliminar este pago?
              </Typography>
              <Typography>
                {`Facturación a: ${formatText.capitalizeString(
                  currentPayment.billedTarget
                )}`}
              </Typography>
              <Typography>
                {`Fecha: ${formatDate(currentPayment.date)}`}
              </Typography>
            </>
          }
          loading={deletingPayment}
          success={successDeletePayment}
        />
      )}

      <AddScore
        open={openAddScore}
        onClose={toggleOpenAddScore}
        submitFunction={addScore}
        successMessage={'Nota creada'}
        successFunction={() => {
          fetchDetails()
          fetchScores()
        }}
      />

      {currentScore && openEditScore && (
        <AddScore
          type="UPDATE"
          open={openEditScore}
          onClose={toggleOpenEditScore}
          data={currentScore}
          submitFunction={updateScore}
          successMessage={'Nota actualizada'}
          successFunction={() => {
            fetchDetails()
            fetchScores()
          }}
        />
      )}

      {currentScore && openDeleteScore && (
        <ConfirmDelete
          open={openDeleteScore}
          onClose={toggleOpenDeleteScore}
          onConfirm={() => deleteScore(currentScore.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar esta nota?
            </Typography>
          }
          loading={deleting}
          success={success}
        />
      )}

      <CourseStatus
        open={openStatus}
        onClose={toggleOpenStatus}
        submitFunction={addStatus}
        successFunction={fetchStatus}
      />
    </Drawer>
  )
}

EmployeeDialog.propTypes = {}

export default EmployeeDialog
