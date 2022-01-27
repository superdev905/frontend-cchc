import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Alert } from '@material-ui/lab'
import { Box, Grid, Typography } from '@material-ui/core'
import { AttachFile as AttachFileIcon } from '@material-ui/icons'
import { ActionsTable, Button, Wrapper } from '../../UI'
import { formatCurrency, formatDate } from '../../../formatters'
import { useToggle, useSuccess } from '../../../hooks'
import { ConfirmDelete, DataTable, FileVisor } from '../../Shared'
import Can from '../../Can'
import benefitsActions from '../../../state/actions/benefits'
import coursesActions from '../../../state/actions/courses'
import WorkerRegistration from './WorkerRegistration'
import EmployeeDialog from './Dialog'

const EmployeesRegistrationList = () => {
  const dispatch = useDispatch()
  const { idCourse } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [currentStudent, setCurrentStudent] = useState(null)
  const [loading, setLoading] = useState(false)
  const { success, changeSuccess } = useSuccess()
  const { benefitDetails: benefit } = useSelector((state) => state.benefits)
  const { studentsCourse, courseDetails: course } = useSelector(
    (state) => state.courses
  )
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { open: openView, toggleOpen: toggleOpenView } = useToggle()
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()

  const fetchEmployees = () => {
    setLoading(true)
    dispatch(coursesActions.getStudentsCourse(idCourse)).then(() => {
      setLoading(false)
    })
  }

  const createEmployeeRegistration = (values) =>
    dispatch(
      coursesActions.enrollEmployee({
        ...values
      })
    )

  const unenrollEmployee = () => {
    dispatch(
      coursesActions.unenrollEmployee({
        courseId: idCourse,
        employeeId: currentStudent.student.id
      })
    )
      .then(() => {
        setLoading(false)
        changeSuccess(true)
        toggleOpenDelete()
        fetchEmployees()
        enqueueSnackbar('Estudiante eliminado de este curso', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (course) {
      dispatch(benefitsActions.getBenefitDetails(course.benefitId))
    }
  }, [course])

  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <Wrapper>
      <Box>
        <Grid container spacing={1} alignItems="center">
          <Box width="100%">
            {benefit?.usersQuantity === studentsCourse.length && (
              <Alert severity="warning">
                Ya no se puede inscribir mas trabajadores.{' '}
                <strong>Cupo de usuarios cumplido</strong>
              </Alert>
            )}
          </Box>
          <Grid item xs={12} md={12}>
            <Box display="flex" justifyContent="flex-end">
              <Can
                availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
                yes={() => (
                  <Box>
                    <Button
                      disabled={
                        benefit?.usersQuantity === studentsCourse.length
                      }
                      onClick={toggleOpenAdd}
                    >
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
            name: 'Fecha de inscripción',
            selector: (row) => formatDate(row.enrollDate)
          },
          {
            name: 'N° Comprobante',
            selector: (row) => row.entryNumber
          },
          {
            name: 'Monto',
            selector: (row) => formatCurrency(row.amount)
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
                moreOptions={[
                  {
                    icon: <AttachFileIcon color="black" />,
                    disabled: !row.file,
                    onClick: () => {
                      setCurrentStudent(row)
                      toggleOpenVisor()
                    }
                  }
                ]}
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
        successMessage="Trabajador Registrado"
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createEmployeeRegistration}
        successFunction={fetchEmployees}
      />

      {currentStudent && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          onConfirm={() => unenrollEmployee(currentStudent.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar este estudiante?
            </Typography>
          }
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
      {currentStudent && openVisor && (
        <FileVisor
          src={currentStudent.file.fileUrl}
          filename={currentStudent.file.fileName}
          open={openVisor}
          onClose={toggleOpenVisor}
        />
      )}
    </Wrapper>
  )
}

export default EmployeesRegistrationList
