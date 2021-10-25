import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FiArrowRight as NextIcon } from 'react-icons/fi'
import { Box, Grid } from '@material-ui/core'
import benefitsActions from '../../state/actions/benefits'
import { DataTable } from '../Shared'
import {
  ActionsTable,
  Button,
  SearchInput,
  Select,
  StatusChip,
  Wrapper
} from '../UI'
import { formatDate } from '../../formatters'
import Can from '../Can'
import CreateDialog from './Create/CreateDialog'

const BenefitList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    size: 30,
    page: 1,
    search: ''
  })
  const {
    benefits,
    t6tal: totalBenefits,
    showCreateModal
  } = useSelector((state) => state.benefits)

  const toggleCreateModal = () => {
    dispatch(benefitsActions.toggleCreateModal(showCreateModal))
  }

  const addButtonClick = () => {
    dispatch(benefitsActions.toggleCreateModal(showCreateModal))
  }

  const fetchBenefits = () => {
    setLoading(true)
    dispatch(
      benefitsActions.getBenefits({ ...filters, search: filters.search.trim() })
    ).then(() => {
      setLoading(false)
    })
  }
  const onRowClick = (row) => {
    history.push(`/benefits/${row.id}`)
  }
  const onSearchChange = (e) => {
    const { value } = e.target

    setFilters({
      ...filters,
      search: value.toString(),
      page: 1
    })
  }
  const handleStatusChange = (e) => {
    const { value } = e.target
    const newFilters = { ...filters }

    if (value === '') {
      delete newFilters.isActive
    } else {
      newFilters.isActive = value === 'VIGENTE'
    }

    setFilters(newFilters)
  }

  useEffect(() => {
    fetchBenefits()
  }, [filters])
  return (
    <Wrapper>
      <Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={2}>
            <Select name="status" onChange={handleStatusChange}>
              <option value="">Todos</option>
              {[
                { key: 'VIGENTE', name: 'Vigente' },
                { key: 'NO_VIGENTE', name: 'No vigente' }
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
              placeholder="Buscar por: Código, Nombre"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="flex-end">
              <Can
                availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
                yes={() => (
                  <Button onClick={addButtonClick}>Crear beneficio</Button>
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
            : 'Aún no hay cursos'
        }
        highlightOnHover
        pointerOnHover
        columns={[
          {
            name: 'Código',
            selector: (row) => row.code,
            width: '100px'
          },
          {
            name: 'Nombre',
            selector: (row) => row.name
          },
          {
            name: 'Cupos anuales',
            selector: (row) => row.usersQuantity
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
            selector: (row) => (
              <StatusChip
                label={`${row.isActive ? 'Vigente' : 'No vigente'}`}
                success={row.isActive}
                error={!row.isActive}
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
        data={benefits}
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
        paginationTotalRows={totalBenefits}
      />

      <CreateDialog
        open={showCreateModal}
        onClose={toggleCreateModal}
        successFunction={fetchBenefits}
      />
    </Wrapper>
  )
}

export default BenefitList
