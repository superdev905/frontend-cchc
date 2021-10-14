import { useEffect, useState } from 'react'
import { Box, Checkbox, Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Select, SubmitButton } from '../../UI'
import coursesActions from '../../../state/actions/courses'
import { DataTable, DatePicker, Dialog } from '../../Shared'
import { useSuccess } from '../../../hooks'

const AssistanceDialog = ({
  open,
  onClose,
  idCourse
  // data,
  // submitFunction,
  // successFunction,
  // successMessage
}) => {
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const [loading, setLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [list, setList] = useState([])
  const [lectures, setLectures] = useState([])
  const [lectureId, setLectureId] = useState('')
  const { studentsCourse: studentList } = useSelector((state) => state.courses)
  const { success, changeSuccess } = useSuccess()

  const fetchStudentList = () => {
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

  const getCourseClasses = () => {
    dispatch(coursesActions.getClasses({ courseId: idCourse })).then(
      (result) => {
        setLectures(result.items)
      }
    )
  }

  const registerAttendance = () => {
    const data = list.map((item) => ({
      isPresent: item.isPresent,
      studentId: item.studentId
    }))
    setIsSubmitting(true)
    dispatch(
      coursesActions.createAttendance(lectureId, { students: data })
    ).then(() => {
      setIsSubmitting(false)

      success(true)
      changeSuccess(false, () => {
        onClose()
      })
    })
  }

  useEffect(() => {
    setList(
      studentList.map((item) => ({
        isPresent: false,
        studentId: item.student.id,
        ...item
      }))
    )
  }, [studentList])

  useEffect(() => {
    if (open) {
      fetchStudentList()
      getCourseClasses()
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
            Registrar asistencia
          </Typography>
        </Box>
        <Box>
          <Box p={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Fecha"
                  value={new Date()}
                  onChange={(date) => {
                    console.log(date)
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Select
                  label={'Clase'}
                  required
                  value={lectureId}
                  onChange={(e) => {
                    setLectureId(e.target.value)
                  }}
                >
                  <option value="">Seleccione clase</option>
                  {lectures.map((item) => (
                    <option key={`classes-option-${item.id}`} value={item.id}>
                      {`${item.name}: ${item.title}`}
                    </option>
                  ))}
                </Select>
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
          <SubmitButton
            success={success}
            loading={isSubmitting}
            onClick={registerAttendance}
          >
            Registrar asistencia
          </SubmitButton>
        </Box>
      </Box>
    </Dialog>
  )
}

export default AssistanceDialog
