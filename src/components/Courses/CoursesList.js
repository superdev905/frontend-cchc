import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Box, Grid, Typography } from '@material-ui/core'
import { ActionsTable, Button, SearchInput, Select, Wrapper } from '../UI'
import { formatSearchWithRut } from '../../formatters'
import { useToggle, useSuccess } from '../../hooks'
import Can from '../Can'
import { scholarshipConfig } from '../../config'
import coursesActions from '../../state/actions/courses'
import CreateCourse from './CreateCourse'
import { ConfirmDelete, DataTable } from '../Shared'
import OtherDocuments from '../Course/Docs/OtherDocuments'

const CoursesList = () => {
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
  const { open: openDoc, toggleOpen: toggleOpenDoc } = useToggle()

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

  const fetchCourses = () => {
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

  const createCourse = (values) => {
    dispatch(
      coursesActions.createCourse({
        ...values
      })
    )
      .then(() => {
        setLoading(false)
        changeSuccess(true)
        toggleOpenAdd()
        fetchCourses()
        enqueueSnackbar('Curso creado correctamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }
  const updateCourse = (values) => {
    dispatch(
      coursesActions.updateCourse(currentCourse.id, {
        ...values,
        createdBy: currentCourse.createdBy
      })
    )
      .then(() => {
        setLoading(false)
        changeSuccess(true)
        toggleOpenUpdate()
        fetchCourses()
        enqueueSnackbar('Curso actualizado correctamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const deleteCourses = (id) => {
    dispatch(
      coursesActions.patchCourse(id, {
        state: 'DELETED'
      })
    )
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        toggleOpenDelete()
        fetchCourses()
        enqueueSnackbar('Curso eliminado exitosamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setDeleting(false)
      })
  }

  useEffect(() => {
    fetchCourses()
  }, [filters])

  const createDoc = (values) => {
    dispatch(
      coursesActions.createCourseDoc({
        ...values
      })
    )
      .then(() => {
        setLoading(false)
        changeSuccess(true)
        toggleOpenAdd()
        fetchCourses()
        enqueueSnackbar('Documento agregado correctamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }

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
              placeholder="Buscar por: Trabajador, curso, empresa"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="flex-end">
              <Can
                availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
                yes={() => <Button onClick={toggleOpenAdd}>Nuevo curso</Button>}
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
            name: 'Código',
            selector: (row) => row.code
          },
          {
            name: 'Nombre',
            selector: (row) => row.name,
            hide: 'md'
          },
          {
            name: 'OTEC',
            selector: (row) => row.otec?.businessName,
            hide: 'md'
          },
          {
            name: 'Relator',
            selector: (row) => row.instructorId,
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
      <Button onClick={toggleOpenDoc}> Otros documentos </Button>
      <CreateCourse
        successMessage="Curso creado"
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createCourse}
      />
      {currentCourse && openUpdate && (
        <CreateCourse
          type="UPDATE"
          open={openUpdate}
          onClose={toggleOpenUpdate}
          data={currentCourse}
          submitFunction={updateCourse}
          successFunction={fetchCourses}
        />
      )}

      {currentCourse && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          onConfirm={() => deleteCourses(currentCourse.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar este curso?
            </Typography>
          }
          loading={deleting}
          success={success}
        />
      )}

      <OtherDocuments
        successMessage="Otro documento creado"
        open={openDoc}
        onClose={toggleOpenDoc}
        submitFunction={createDoc}
      />
    </Wrapper>
  )
}

export default CoursesList
