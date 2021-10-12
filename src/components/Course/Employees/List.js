import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { ActionsTable, Button, SearchInput, Select, Wrapper } from '../../UI'
import { formatSearchWithRut, formatDate } from '../../../formatters'
import { useToggle, useSuccess } from '../../../hooks'
import Can from '../../Can'
import { scholarshipConfig } from '../../../config'
import coursesActions from '../../../state/actions/courses'
import { ConfirmDelete, DataTable } from '../../Shared'
import WorkerRegistration from './WorkerRegistration'

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

  const [filters, setFilters] = useState({
    page: 1,
    size: 30,
    search: '',
    status: ''
  })

  const onSearchChange = (e) => {
    const { value } = e.target

    setFilters({
      ...filters,
      search: formatSearchWithRut(value.toString()),
      page: 1
    })
  }
  const handleStatusChange = (e) => {
    setFilters({ ...filters, status: e.target.value })
  }

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

  const deleteEmployeeRegistration = (id) => {
    dispatch(
      coursesActions.unenrollEmployee(id, {
        state: 'DELETED'
      })
    )
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        toggleOpenDelete()
        fetchEmployees()
        enqueueSnackbar('Trabajador eliminado exitosamente', {
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
  }, [filters])

  console.log(studentsCourse)

  return (
    <Wrapper>
      <Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={2}>
            <Select name="status" onChange={handleStatusChange}>
              <option value="">Todos</option>
              {scholarshipConfig.revisionStatus.map((item) => (
                <option
                  key={`application--filters-${item.key}`}
                  value={item.status}
                >
                  {item.name}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={4}>
            <SearchInput
              value={filters.search}
              onChange={onSearchChange}
              placeholder="Buscar por: Trabajador"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="flex-end">
              <Can
                availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
                yes={() => (
                  <Box>
                    <Button>Registrar Asistencia</Button>
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
        emptyMessage={
          filters.search
            ? `No se encontraron resultados para: ${filters.search}`
            : 'Aún no hay postulaciones'
        }
        highlightOnHover
        pointerOnHover
        columns={[
          {
            name: 'Nombre',
            selector: (row) => row.student.employeeName
          },
          {
            name: 'Fecha',
            selector: (row) => formatDate(row.date)
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
                //  onView={() => { props.history.push(`//${row.id}`)  }}
              />
            )
          }
        ]}
        data={studentsCourse}
        pagination
        paginationRowsPerPageOptions={[30, 40]}
        paginationPerPage={filters.size}
        paginationServer={true}
        onChangeRowsPerPage={(limit) => {
          setFilters({ ...filters, size: limit })
        }}
        onChangePage={(page) => {
          setFilters({ ...filters, skip: page })
        }}
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
              ¿Estás seguro de eliminar este curso?
            </Typography>
          }
          loading={deleting}
          success={success}
        />
      )}
    </Wrapper>
  )
}

export default EmployeesRegistrationList
