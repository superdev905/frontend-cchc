import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Box, Drawer, IconButton, Typography } from '@material-ui/core'
import { FiArrowLeft as BackIcon } from 'react-icons/fi'
import { formatDate } from '../../../../formatters'
import { Button, EmptyState, LabeledRow, Text } from '../../../UI'
import { useToggle, useSuccess } from '../../../../hooks'
import useStyles from './styles'
import PaymentCard from '../../ExtraPayments/Card'
import ScoreCard from '../Score/ScoreCard'
import courses from '../../../../state/actions/courses'
import EmployeeTracking from '../../EmployeeTracking'
import AddScore from '../Score/AddScore'
import CourseStatus from '../Status/CourseStatus'
import StatusList from '../Status/List'
import { ConfirmDelete } from '../../../Shared'

const EmployeeDialog = ({ open, onClose, idEmployee }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { idCourse } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [student, setStudent] = useState(null)
  const [currentScore, setCurrentScore] = useState(null)
  const { isMobile } = useSelector((state) => state.ui)
  const { scoresList } = useSelector((state) => state.courses)
  const { success, changeSuccess } = useSuccess()
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openAddScore, toggleOpen: toggleOpenAddScore } = useToggle()
  const { open: openStatus, toggleOpen: toggleOpenStatus } = useToggle()
  const { open: openEditScore, toggleOpen: toggleOpenEditScore } = useToggle()
  const { open: openDeleteScore, toggleOpen: toggleOpenDeleteScore } =
    useToggle()

  const fetchDetails = () => {
    setLoading(true)
    dispatch(courses.getStudentDetails(idCourse, idEmployee))
      .then((result) => {
        setLoading(false)
        setStudent(result)
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
    dispatch(courses.getScores({ courseId: idCourse })).then(() => {
      setLoading(false)
    })
  }

  const fetchStatus = () => {
    setLoading(true)
    dispatch(courses.getStatus({ courseId: idCourse })).then(() => {
      setLoading(false)
    })
  }

  const addScore = (values) => {
    dispatch(
      courses.createScore({
        ...values,
        studentId: student.studentId
      })
    )
      .then(() => {
        setLoading(false)
        changeSuccess(true)
        toggleOpenAddScore()
        fetchScores()
        enqueueSnackbar('Nota agregada exitosamente', {
          autoHideDuration: 1800,
          variant: 'success'
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const addStatus = (values) => {
    dispatch(
      courses.createStatus({
        ...values,
        studentId: student.student.id
      })
    )
      .then(() => {
        setLoading(false)
        changeSuccess(true)
        toggleOpenStatus()
        fetchStatus()
        enqueueSnackbar('Estado agregado exitosamente', {
          autoHideDuration: 1800,
          variant: 'success'
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const updateScore = (values) => {
    dispatch(
      courses.updateScore(currentScore.id, {
        ...values,
        studentId: student.student.id
      })
    )
      .then(() => {
        setLoading(false)
        changeSuccess(true)
        toggleOpenEditScore()
        fetchScores()
        enqueueSnackbar('Nota actualizada correctamente', {
          autoHideDuration: 1800,
          variant: 'success'
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const deleteScore = (id) => {
    dispatch(
      courses.patchScore(id, {
        state: 'DELETED'
      })
    )
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        toggleOpenDeleteScore()
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

  useEffect(() => {
    if (open) {
      fetchDetails()
      fetchScores()
      fetchStatus()
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
        <Box>
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
          <LabeledRow label={'Inscrito por:'}>
            <Text loaderWidth={'30%'} loading={loading}>
              {student &&
                `${student.createdBy.names} ${student.createdBy.paternalSurname} ${student.createdBy.maternalSurname}`}
            </Text>
          </LabeledRow>
        </Box>
        <Box>
          <Box className={classes.centeredSpaced}>
            <Typography>Porcentaje de inasistencias</Typography>
          </Box>
          <Box
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px solid red',
              fontSize: '18px',
              fontWeight: 'bold'
            }}
          >
            {student && `${student.absencesPercentage}`}
          </Box>
        </Box>
        <Box>
          <Box className={classes.centeredSpaced}>
            <Typography>Pagos</Typography>
            <Button size="small" onClick={toggleOpenAdd}>
              Agregar
            </Button>
          </Box>
          <Box>
            <PaymentCard.Container>
              <PaymentCard.Loader size={12} />
              <PaymentCard.Loader size={12} />
            </PaymentCard.Container>
          </Box>
        </Box>
        <Box>
          <Box marginBottom={2} className={classes.centeredSpaced}>
            <Typography>Notas</Typography>
            <Button size="small" onClick={toggleOpenAddScore}>
              Agregar
            </Button>
          </Box>
          <Box>
            {scoresList.length === 0 ? (
              <EmptyState
                message="Aún no hay notas"
                actionMessage="Nueva nota"
                event={toggleOpenAddScore}
              />
            ) : (
              <ScoreCard.Container>
                {scoresList.map((item) => (
                  <ScoreCard
                    key={`score-i-${item.id}`}
                    score={item.score}
                    avg={item.average}
                    onEdit={() => {
                      setCurrentScore(item)
                      toggleOpenEditScore()
                    }}
                    onDelete={() => {
                      setCurrentScore(item)
                      toggleOpenDeleteScore()
                    }}
                  />
                ))}
              </ScoreCard.Container>
            )}
          </Box>
        </Box>
        <Box>
          <Box marginTop={2} className={classes.centeredSpaced}>
            <Typography>Estado de curso</Typography>
            <Button size="small" onClick={toggleOpenStatus}>
              Agregar
            </Button>
          </Box>
          <StatusList />
        </Box>
      </Box>

      <EmployeeTracking open={openAdd} onClose={toggleOpenAdd} />

      <AddScore
        open={openAddScore}
        onClose={toggleOpenAddScore}
        submitFunction={addScore}
        successFunction={fetchScores}
      />

      {currentScore && openEditScore && (
        <AddScore
          type="UPDATE"
          open={openEditScore}
          onClose={toggleOpenEditScore}
          data={currentScore}
          submitFunction={updateScore}
          successFunction={fetchScores}
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
