import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid } from '@material-ui/core'
import { Button, Wrapper, SearchInput, ActionsTable } from '../UI'
import { DataTable } from '../Shared'
import { formatDate, formatSearchWithRut, formatQuery } from '../../formatters'
import migrantsActions from '../../state/actions/migrants'
import MigrateModal from './MigrateModal'
import DetailsDrawer from './Details'
import { useToggle } from '../../hooks'

const MigrantList = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(null)
  const { migrantsList, totalDocs, filters } = useSelector(
    (state) => state.migrants
  )
  const { open: openDetails, toggleOpen: toggleOpenDetails } = useToggle()

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
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

  const updateFilters = (values) => {
    dispatch(migrantsActions.setFilters(values))
  }

  const onSearchChange = (e) => {
    const { value } = e.target

    dispatch(
      migrantsActions.setFilters({
        ...filters,
        search: formatSearchWithRut(value.toString())
      })
    )
  }

  useEffect(() => {
    fetchMigrants()
  }, [filters])
  return (
    <Box>
      <Wrapper>
        <Box px={2} pt={1}>
          <Grid container spacing={2} alignItems="center">
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <SearchInput
                  value={filters.search}
                  onChange={onSearchChange}
                  placeholder="Buscar por: RUT O NOMBRE DE TRABAJADOR"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" justifyContent="flex-end">
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
          pagination
          paginationRowsPerPageOptions={[30, 40]}
          paginationServer={true}
          paginationTotalRows={totalDocs}
          paginationPerPage={filters.size}
          paginationServer={true}
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
