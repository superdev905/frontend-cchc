import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, withRouter } from 'react-router-dom'
import { Box, Grid } from '@material-ui/core'
import { Button, PageHeading, SearchInput, Select, Wrapper } from '../UI'
import { formatSearchWithRut, formatDate } from '../../formatters'
import scholarshipsActions from '../../state/actions/scholarships'
import CreateDialog from './Create/CreateDialog'
import { DataTable } from '../Shared'
import Can from '../Can'
import { scholarshipConfig } from '../../config'
import PostulationChip from './Chip'

const PostulationList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    page: 1,
    size: 30,
    search: '',
    status: ''
  })
  const { showCreateModal } = useSelector((state) => state.scholarships)
  const { total, applicationsList } = useSelector((state) => state.scholarships)

  const toggleCreateModal = () => {
    dispatch(scholarshipsActions.toggleCreateModal(showCreateModal))
  }

  const addButtonClick = () => {
    dispatch(scholarshipsActions.toggleCreateModal(showCreateModal))
  }

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

  const onRowClick = (row) => {
    history.push(`/postulations/${row.id}`)
  }

  const fetchPostulations = () => {
    setLoading(true)
    dispatch(
      scholarshipsActions.getPostulations({
        ...filters,
        search: filters.search.trim()
      })
    ).then(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchPostulations()
  }, [filters])

  return (
    <Wrapper>
      <Box>
        <PageHeading>Postulaciones</PageHeading>
      </Box>
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
              placeholder="Buscar por: Trabajador, benecifiario, empresa"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="flex-end">
              <Can
                availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
                yes={() => (
                  <Button onClick={addButtonClick}>Nueva postulación</Button>
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
            : 'no hay postulaciones'
        }
        highlightOnHover
        pointerOnHover
        columns={[
          {
            name: 'Trabajador',
            selector: (row) => row.employeeNames
          },
          {
            name: 'Beneficiario',
            selector: (row) => row.beneficiaryNames,
            hide: 'md'
          },
          {
            name: 'Empresa',
            selector: (row) => row.businessName,
            hide: 'md'
          },
          {
            name: 'Fecha de inicio',
            selector: (row) => formatDate(row.startDate, {}),
            hide: 'md'
          },
          {
            name: 'Fecha de fin',
            selector: (row) => formatDate(row.endDate, {}),
            hide: 'md'
          },
          {
            name: 'Estado',
            cell: (row) => (
              <PostulationChip label={row.revisionName} status={row.status} />
            )
          }
        ]}
        data={applicationsList}
        pagination
        onRowClicked={onRowClick}
        paginationRowsPerPageOptions={[30, 40]}
        paginationPerPage={filters.size}
        paginationServer={true}
        onChangeRowsPerPage={(limit) => {
          setFilters({ ...filters, size: limit })
        }}
        onChangePage={(page) => {
          setFilters({ ...filters, skip: page })
        }}
        paginationTotalRows={total}
      />

      <CreateDialog open={showCreateModal} onClose={toggleCreateModal} />
    </Wrapper>
  )
}

export default withRouter(PostulationList)
