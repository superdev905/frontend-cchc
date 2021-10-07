import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiArrowRight as NextIcon } from 'react-icons/fi'
import { Box, Grid } from '@material-ui/core'
import {
  ActionsTable,
  Button,
  SearchInput,
  Select,
  StatusChip,
  Wrapper
} from '../UI'
import { formatDate } from '../../formatters'
import { useToggle } from '../../hooks'
import Can from '../Can'
import coursesActions from '../../state/actions/courses'
import CreateCourse from './CreateCourse'
import { DataTable } from '../Shared'

const CoursesList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const { totalCourses, coursesList } = useSelector((state) => state.courses)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()

  const [filters, setFilters] = useState({
    page: 1,
    size: 30,
    search: '',
    state: ''
  })

  const onSearchChange = (e) => {
    const { value } = e.target

    setFilters({
      ...filters,
      search: value.toString(),
      page: 1
    })
  }
  const handleStatusChange = (e) => {
    setFilters({ ...filters, state: e.target.value })
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

  const createCourse = (values) =>
    dispatch(
      coursesActions.createCourse({
        ...values
      })
    )

  useEffect(() => {
    fetchCourses()
  }, [filters])

  return (
    <Wrapper>
      <Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={2}>
            <Select name="status" onChange={handleStatusChange}>
              <option value="">Todos</option>
              {[
                { key: 'ACTIVE', name: 'Activos' },
                { key: 'DELETED', name: 'Eliminados' }
              ].map((item) => (
                <option
                  key={`application--filters-${item.key}`}
                  value={item.key}
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
              placeholder="Buscar por: Nombre de curso, código"
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
            : 'Aún no hay cursos'
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
            selector: (row) => row.name
          },
          {
            name: 'Fecha de creación',
            selector: (row) => formatDate(row.createDate),
            hide: 'md'
          },
          {
            name: 'Estado',
            selector: (row) => (
              <StatusChip
                label={`${row.state === 'ACTIVE' ? 'Activo' : 'Eliminado'}`}
                success={row.state === 'ACTIVE'}
                error={row.state !== 'ACTIVE'}
              />
            ),
            hide: 'md'
          },
          {
            name: '',
            right: true,
            cell: (row) => (
              <ActionsTable
                {...row}
                moreOptions={[
                  {
                    icon: <NextIcon />,
                    onClick: () => {
                      onRowClick(row)
                    }
                  }
                ]}
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
      <CreateCourse
        successMessage="Curso creado"
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createCourse}
        successMessage="Curso creado correctamente"
        successFunction={fetchCourses}
      />
    </Wrapper>
  )
}

export default CoursesList
