import { useEffect, useState } from 'react'
import { Box, Checkbox, Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Button, SubmitButton, TextField } from '../../UI'
import coursesActions from '../../../state/actions/courses'
import { ConfirmDelete, DataTable, Dialog } from '../../Shared'
import { useSuccess, useToggle } from '../../../hooks'
import { formatDate } from '../../../formatters'

const AssistanceDialog = ({
  open,
  onClose,
  idCourse,
  lecture,
  successFunction
}) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { isMobile } = useSelector((state) => state.ui)
  const [loading, setLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [list, setList] = useState([])
  const { studentsCourse: studentList } = useSelector((state) => state.courses)
  const { success, changeSuccess } = useSuccess()
  const { open: openConfirm, toggleOpen: toggleOpenConfirm } = useToggle()

  const fetchStudentList = () => {
    dispatch(coursesActions.getAttendance(idCourse))
    dispatch(coursesActions.getStudentsCourse(idCourse)).then(() => {
      setLoading(false)
    })
  }

  const handleChangePresent = (value, studentId) => {
    const updatedList = list.map((item) =>
      item.studentId === studentId ? { ...item, isPresent: value } : item
    )
    setList(updatedList)
  }

  const registerAttendance = () => {
    const data = list.map((item) => ({
      isPresent: item.isPresent,
      studentId: item.studentId
    }))
    setIsSubmitting(true)
    dispatch(coursesActions.createAttendance(lecture.id, { students: data }))
      .then(() => {
        setIsSubmitting(false)
        changeSuccess(true, () => {
          toggleOpenConfirm()
          onClose()
          enqueueSnackbar('Asistencia registrada', { variant: 'success' })
          successFunction()
        })
      })
      .catch((err) => {
        setIsSubmitting(false)
        toggleOpenConfirm()
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  useEffect(() => {
    setList(
      studentList.map((item) => ({
        isPresent: true,
        studentId: item.student.id,
        ...item
      }))
    )
  }, [studentList])

  useEffect(() => {
    if (open) {
      fetchStudentList()
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Box>
        <Box>
          <Typography
            align="center"
            style={{
              marginBottom: '15px',
              fontWeight: 'bold',
              fontSize: '18px'
            }}
          >
            Asistencia
          </Typography>
        </Box>
        <Box>
          <Box p={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label="Fecha" value={formatDate(new Date())} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label={'Clase'}
                  value={lecture.name}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <DataTable
              columns={[
                {
                  name: 'Nombres y apellidos',
                  selector: (row) => row.student.employeeName
                },
                {
                  right: true,
                  name: 'Asistencia',
                  cell: (row) => (
                    <Box>
                      <Checkbox
                        checked={row.isPresent}
                        onChange={(__, value) =>
                          handleChangePresent(value, row.studentId)
                        }
                        color="primary"
                      />
                    </Box>
                  )
                }
              ]}
              data={list}
              progressPending={loading}
              emptyMessage={'Aún no hay trabajadores inscritos'}
            />
          </Box>
        </Box>
        <Box p={2} textAlign="center">
          <Button onClick={onClose} variant="outlined">
            Cancelar
          </Button>
          <SubmitButton onClick={toggleOpenConfirm}>
            Registrar asistencia
          </SubmitButton>
        </Box>
        {openConfirm && (
          <ConfirmDelete
            event={'CREATE'}
            open={openConfirm}
            onClose={toggleOpenConfirm}
            onConfirm={registerAttendance}
            confirmText={'Aceptar'}
            message={
              <Typography variant="h6">
                ¿Estás seguro de registrar asistencia?
              </Typography>
            }
            loading={isSubmitting}
            success={success}
          />
        )}
      </Box>
    </Dialog>
  )
}

export default AssistanceDialog
