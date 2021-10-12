import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { ActionsTable, Button, SearchInput, Select, Wrapper } from '../../UI'
import { formatSearchWithRut } from '../../../formatters'
import { useToggle, useSuccess } from '../../../hooks'
import Can from '../../Can'
import { scholarshipConfig } from '../../../config'
import coursesActions from '../../../state/actions/courses'
import { ConfirmDelete, DataTable } from '../../Shared'
import WorkerRegistration from './WorkerRegistration'

const EmployeesRegistrationList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [currentCourse, setCurrentCourse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { success, changeSuccess } = useSuccess()
  const { totalCourses, coursesList } = useSelector((state) => state.courses)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()
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
    dispatch(
      coursesActions.getCourses({
        ...filters
      })
    ).then(() => {
      setLoading(false)
    })
  }
  const onRowClick = (row) => {
    history.push(`/courses/${row.id}/classes`)
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
  const updateEmployeeRegistration = (values) => {
    dispatch(
      coursesActions.updateEmployeeRegistration(currentCourse.id, {
        ...values,
        createdBy: currentCourse.createdBy
      })
    )
      .then(() => {
        setLoading(false)
        changeSuccess(true)
        toggleOpenUpdate()
        fetchEmployees()
        enqueueSnackbar('Trabajador actualizado correctamente', {
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
      coursesActions.patchCourse(id, {
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
            : 'Aún no hay trabajadores inscritos'
        }
        highlightOnHover
        pointerOnHover
        columns={[
          {
            name: 'Nombre',
            selector: (row) => row.namel,
            hide: 'md'
          },
          {
            name: 'Rut',
            selector: (row) => row.otecl,
            hide: 'md'
          },
          {
            name: 'Fecha de inscripción',
            selector: (row) => row.instructorIdl,
            hide: 'md'
          },
          {
            name: '',
            right: true,
            cell: (row) => (
              <ActionsTable
                {...row}
                disabledDelete={row.state === 'DELETED'}
                onEdit={() => {
                  setCurrentCourse(row)
                  toggleOpenUpdate()
                }}
                onDelete={() => {
                  setCurrentCourse(row)
                  toggleOpenDelete()
                }}
              />
            )
          }
        ]}
        data={coursesList}
        onRowClicked={onRowClick}
        pagination
        onRowClicked={onRowClick}
        paginationRowsPerPageOptions={[15, 30]}
        paginationPerPage={filters.size}
        paginationServer={true}
        onChangeRowsPerPage={(limit) => {
          setFilters({ ...filters, size: limit })
        }}
        onChangePage={(page) => {
          setFilters({ ...filters, skip: page })
        }}
        paginationTotalRows={totalCourses}
      />
      <WorkerRegistration
        successMessage="Curso creado"
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createEmployeeRegistration}
      />
      {currentCourse && openUpdate && (
        <WorkerRegistration
          type="UPDATE"
          open={openUpdate}
          onClose={toggleOpenUpdate}
          data={currentCourse}
          submitFunction={updateEmployeeRegistration}
          successFunction={fetchEmployees}
        />
      )}

      {currentCourse && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          onConfirm={() => deleteEmployeeRegistration(currentCourse.id)}
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
