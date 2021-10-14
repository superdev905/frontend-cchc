import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { ActionsTable, Button, Wrapper } from '../../UI'
import { formatDate } from '../../../formatters'
import { useToggle, useSuccess } from '../../../hooks'
import { ConfirmDelete, DataTable } from '../../Shared'
import Can from '../../Can'
import coursesActions from '../../../state/actions/courses'
import WorkerRegistration from './WorkerRegistration'
import EmployeeDialog from './Dialog'
import { AssistanceDialog } from '../Attendance'

const EmployeesRegistrationList = () => {
  const dispatch = useDispatch()
  const { idCourse } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [currentStudent, setCurrentStudent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { success, changeSuccess } = useSuccess()
  const { studentsCourse } = useSelector((state) => state.courses)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { open: openView, toggleOpen: toggleOpenView } = useToggle()
  const { open: openAssistance, toggleOpen: toggleOpenAssistance } = useToggle()

  const fetchEmployees = () => {
    setLoading(true)
    dispatch(coursesActions.getStudentsCourse(idCourse)).then(() => {
      setLoading(false)
    })
  }

  const createEmployeeRegistration = (values) => {
    dispatch(
      coursesActions.enrollEmployee({
        ...values
      })
    )
      .then(() => {
        setLoading(false)
        changeSuccess(true)
        toggleOpenAdd()
        fetchEmployees()
        enqueueSnackbar('Trabajador inscrito correctamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const deleteEmployeeRegistration = () => {
    dispatch(coursesActions.unenrollEmployee(currentStudent))
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        toggleOpenDelete()
        fetchEmployees()
        enqueueSnackbar('Estudiante eliminado de este curso', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setDeleting(false)
      })
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <Wrapper>
      <Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={12}>
            <Box display="flex" justifyContent="flex-end">
              <Can
                availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
                yes={() => (
                  <Box>
                    <Button onClick={toggleOpenAssistance}>
                      Registrar asistencia
                    </Button>
                    <Button onClick={toggleOpenAdd}>
                      Inscribir trabajador
                    </Button>
                  </Box>
                )}
                no={() => null}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <DataTable
        progressPending={loading}
        emptyMessage={'Aún no hay trabajadores inscritos'}
        highlightOnHover
        pointerOnHover
        columns={[
          {
            name: 'Nombre',
            selector: (row) => row.student.employeeName
          },
          {
            name: 'Fecha',
            selector: (row) => formatDate(row.enrollDate)
          },
          {
            name: 'Estado',
            selector: (row) => row.state
          },
          {
            name: '',
            right: true,
            cell: (row) => (
              <ActionsTable
                {...row}
                disabledDelete={row.state === 'DELETED'}
                onDelete={() => {
                  setCurrentStudent(row)
                  toggleOpenDelete()
                }}
                onView={() => {
                  setCurrentStudent(row)
                  toggleOpenView()
                }}
              />
            )
          }
        ]}
        onRowClicked={(row) => {
          setCurrentStudent(row)
          toggleOpenView()
        }}
        data={studentsCourse}
        pagination
        paginationRowsPerPageOptions={[20, 30]}
        paginationServer={true}
      />

      <WorkerRegistration
        successMessage="Curso creado"
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createEmployeeRegistration}
      />

      {currentStudent && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          onConfirm={() => deleteEmployeeRegistration(currentStudent.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar este estudiante?
            </Typography>
          }
          loading={deleting}
          success={success}
        />
      )}
      {currentStudent && openView && (
        <EmployeeDialog
          open={openView}
          onClose={toggleOpenView}
          idEmployee={currentStudent.studentId}
        />
      )}
      {openAssistance && (
        <AssistanceDialog
          open={openAssistance}
          onClose={toggleOpenAssistance}
          idCourse={idCourse}
        />
      )}
    </Wrapper>
  )
}

export default EmployeesRegistrationList
