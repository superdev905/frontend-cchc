import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Grid, Box } from '@material-ui/core'
import { ActionsTable, SearchInput, Button, Wrapper } from '../UI'
import { formatDate, formatQuery, formatSearchWithRut } from '../../formatters'
import { DataTable } from '../Shared'
import FiltersMenu from './FiltersMenu'
import TagsList from './TagsList'
import socialCaseActions from '../../state/actions/socialCase'
import { useMenu } from '../../hooks'

const SocialCasesList = () => {
  const dispatch = useDispatch()
  const { open, handleOpen, handleClose, anchorEl } = useMenu()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const { totalCases, casesList, filters } = useSelector(
    (state) => state.socialCase
  )
  const { user } = useSelector((state) => state.auth)

  const onSearchChange = (e) => {
    const { value } = e.target

    dispatch(
      socialCaseActions.setFilters({
        ...filters,
        search: formatSearchWithRut(value.toString()),
        page: 1
      })
    )
  }

  const fetchSocialCases = () => {
    setLoading(true)
    const formattedFilters = { ...filters }

    if (formattedFilters.startDate) {
      formattedFilters.startDate = new Date(filters.startDate).toISOString()
    }
    if (formattedFilters.endDate) {
      formattedFilters.endDate = new Date(filters.endDate).toISOString()
    }
    dispatch(
      socialCaseActions.getSocialCases(
        formatQuery(formatQuery(formattedFilters))
      )
    ).then(() => {
      setLoading(false)
    })
  }

  const onRowClick = (row) => {
    history.push(`/social-case/${row.id}/details`)
  }

  useEffect(() => {
    fetchSocialCases()
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
                  placeholder="Buscar por: EMPRESA, RUT O NOMBRE DE TRABAJADOR"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" justifyContent="flex-end">
                  <Button onClick={(e) => handleOpen(e)}>Filtros</Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TagsList />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Wrapper>
      <Wrapper>
        <DataTable
          progressPending={loading}
          emptyMessage={
            filters.search
              ? `No se encontraron resultados para: ${filters.search}`
              : 'Lista vacía'
          }
          highlightOnHover
          pointerOnHover
          columns={[
            {
              name: 'N°',
              width: '100px',
              sortable: true,
              center: true,
              selector: (row) => row.id
            },
            {
              name: 'Estado',
              selector: (row) => row.state
            },
            {
              name: 'Fecha',
              selector: (row) => formatDate(row.createdDate, {}),
              hide: 'md'
            },
            {
              name: 'Rut',
              selector: (row) => row.employeeRut,
              hide: 'md'
            },
            {
              name: 'Nombres y apellidos',
              selector: (row) => row.employeeNames
            },
            {
              name: 'Empresa',
              selector: (row) => row.businessName,
              hide: 'md'
            },
            {
              name: 'Asistente',
              selector: (row) => row.assistanceId
            },
            {
              name: '',
              right: true,
              cell: (row) => (
                <ActionsTable
                  onView={() => {
                    onRowClick(row)
                  }}
                />
              )
            }
          ]}
          data={casesList}
          pagination
          onRowClicked={onRowClick}
          paginationRowsPerPageOptions={[10, 20, 30, 40]}
          paginationPerPage={filters.size}
          paginationServer={true}
          onChangeRowsPerPage={(limit) => {
            dispatch(
              socialCaseActions.setFilters({
                ...filters,
                size: limit
              })
            )
          }}
          onChangePage={(page) => {
            dispatch(
              socialCaseActions.setFilters({
                ...filters,
                page
              })
            )
          }}
          paginationTotalRows={totalCases}
        />
        <FiltersMenu open={open} onClose={handleClose} anchorEl={anchorEl} />
      </Wrapper>
    </Box>
  )
}

export default SocialCasesList
