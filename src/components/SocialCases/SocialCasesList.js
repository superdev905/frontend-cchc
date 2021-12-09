import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Grid, Box } from '@material-ui/core'
import { ActionsTable, SearchInput, Button, Wrapper } from '../UI'
import { formatDate } from '../../formatters'
import { DataTable } from '../Shared'
import FiltersMenu from './FiltersMenu'
import TagsList from './TagsList'
import socialCaseActions from '../../state/actions/socialCase'
import { useMenu } from '../../hooks'

const useStyles = makeStyles(() => ({
  main: {}
}))

const SocialCasesList = () => {
  const dispatch = useDispatch()
  const { open, handleOpen, handleClose, anchorEl } = useMenu()
  const history = useHistory()
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const { totalCases, casesList, filters } = useSelector(
    (state) => state.socialCase
  )

  const onSearchChange = (e) => {
    const { value } = e.target

    dispatch(
      socialCaseActions.setFilters({
        ...filters,
        search: value.toString(),
        page: 1
      })
    )
  }

  const fetchSocialCases = () => {
    setLoading(true)
    const formatedFilter = { ...filters }

    if (!formatedFilter.startDate) {
      delete formatedFilter.startDate
    }
    if (!formatedFilter.endDate) {
      delete formatedFilter.endDate
    }
    if (!formatedFilter.businessId) {
      delete formatedFilter.businessId
    }
    if (!formatedFilter.assistanceId) {
      delete formatedFilter.assistanceId
    }
    if (!formatedFilter.areaId) {
      delete formatedFilter.areaId
    }
    dispatch(socialCaseActions.getSocialCases(formatedFilter)).then(() => {
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
    <Wrapper>
      <Grid container spacing={2} className={classes.main}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <SearchInput
              value={filters.search}
              onChange={onSearchChange}
              placeholder="Buscar por:"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={(e) => handleOpen(e)}>Filtros</Button>
              <Button>Nuevo</Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TagsList />
          </Grid>
        </Grid>
      </Grid>
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
            name: 'Estado',
            selector: (row) => (row.isActive ? 'Activo' : 'Completado')
          },
          {
            name: 'Fecha',
            selector: (row) => formatDate(row.createdDate),
            hide: 'md'
          },
          {
            name: 'Rut',
            selector: (row) => row.employeeRut,
            hide: 'md'
          },
          {
            name: 'Nombres',
            selector: (row) => row.employeeNames,
            hide: 'md'
          },
          {
            name: 'Empresa',
            selector: (row) => row.businessName,
            hide: 'md'
          },
          {
            name: 'Oficina',
            selector: (row) => row.office,
            hide: 'md'
          },
          {
            name: '',
            right: true,
            cell: (row) => (
              <ActionsTable
                {...row}
                onEdit={() => {
                  alert(row.id)
                }}
                onDelete={() => {
                  alert(row.id)
                }}
              />
            )
          }
        ]}
        data={casesList}
        pagination
        onRowClicked={onRowClick}
        paginationRowsPerPageOptions={[15, 30]}
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
        /* onChangePage={(page) => {
          setFilters({ ...filters, skip: page })
        }} */
        paginationTotalRows={totalCases}
      />
      <FiltersMenu open={open} onClose={handleClose} anchorEl={anchorEl} />
    </Wrapper>
  )
}

export default SocialCasesList
