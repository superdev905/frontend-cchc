import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { Button, Wrapper, SearchInput, ActionsTable, Select } from '../UI'
import { DataTable } from '../Shared'
import { formatDate, formatSearchWithRut, formatQuery } from '../../formatters'
import migrantsActions from '../../state/actions/migrants'
import MigrateModal from './MigrateModal'
import DetailsDrawer from './Details'
import { useToggle } from '../../hooks'

const MigrantList = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [years, setYears] = useState([])
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(null)
  const { migrantsList, totalDocs } = useSelector((state) => state.migrants)
  const { open: openDetails, toggleOpen: toggleOpenDetails } = useToggle()
  const [filters, setFilters] = useState({
    page: 1,
    skip: 0,
    size: 10,
    search: '',
    state: ''
  })

  const getYears = () => {
    const currentYear = new Date().getFullYear()
    const minYear = currentYear - 6
    const yearsList = []
    for (let i = currentYear; i >= minYear; i -= 1) {
      yearsList.push(i)
    }
    return yearsList
  }

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const handleChange = (event) => {
    const { value } = event.target
    dispatch(
      migrantsActions.setFilters({
        ...filters,
        period: value
      })
    )
  }

  const fetchMigrants = () => {
    setLoading(true)
    dispatch(migrantsActions.getMigrants(formatQuery(filters)))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  const searchButton = () => {
    fetchMigrants()
  }

  const updateFilters = (values) => {
    dispatch(migrantsActions.setFilters(values))
  }

  const onSearchChange = (e) => {
    setFilters({
      ...filters,
      skip: 0,
      search: formatSearchWithRut(e.target.value)
    })
  }

  useEffect(() => {
    fetchMigrants()
  }, [])
  useEffect(() => {
    setYears(getYears)
  }, [])
  return (
    <Box>
      <Wrapper>
        <Box px={2} pt={1}>
          <Grid container spacing={2} alignItems="center">
            <Grid container spacing={1}>
              <Grid item xs={12} md={7}>
                <Grid container spacing={1}>
                  <Grid item xs={6} md={4}>
                    {' '}
                    <Select onChange={handleChange}>
                      <option value="">Todos</option>
                      {years.map((item) => (
                        <option key={`option-period-${item}`} value={item}>
                          {item}
                        </option>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    <SearchInput
                      value={filters.search}
                      onChange={onSearchChange}
                      placeholder="Buscar por: RUT O NOMBRE DE TRABAJADOR"
                    >
                      <IconButton onClick={searchButton}>
                        <SearchIcon color="primary" fontSize="large" />
                      </IconButton>
                    </SearchInput>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box display={'flex'} justifyContent={'flex-end'}>
                  <Button onClick={openModal}>Registrar</Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Wrapper>
      <Wrapper>
        <DataTable
          progressPending={loading}
          highlightOnHover
          pointerOnHover
          columns={[
            {
              name: 'Run',
              selector: (row) => row.employee.rut,
              sortable: true
            },
            {
              name: 'Nombres y apellidos',
              selector: (row) => row.employee.fullName
            },
            {
              name: 'Periodo',
              selector: (row) => row.period
            },
            {
              name: 'Fecha de Ingreso a Chile',
              selector: (row) => formatDate(row.entryDate),
              hide: 'md'
            },
            {
              name: '',
              right: true,
              selector: (row) => (
                <ActionsTable
                  onView={() => {
                    setCurrent(row)
                    toggleOpenDetails()
                  }}
                />
              )
            }
          ]}
          data={migrantsList}
          onRowClicked={(row) => {
            setCurrent(row)
            toggleOpenDetails()
          }}
          pagination
          paginationRowsPerPageOptions={[10, 20, 30, 40]}
          paginationServer={true}
          paginationTotalRows={totalDocs}
          paginationPerPage={filters.size}
          onChangeRowsPerPage={(limit) => {
            updateFilters({ ...filters, size: limit })
          }}
          onChangePage={(page) => {
            updateFilters({ ...filters, page })
          }}
        />
      </Wrapper>
      <MigrateModal open={open} onClose={closeModal} />
      {openDetails && current && (
        <DetailsDrawer
          open={openDetails}
          onClose={toggleOpenDetails}
          migrantId={current.id}
        />
      )}
    </Box>
  )
}

export default MigrantList
