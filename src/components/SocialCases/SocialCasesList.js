import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Box } from '@material-ui/core'
import { ActionsTable, SearchInput, Button, Wrapper } from '../UI'
import { formatDate } from '../../formatters'
import { DataTable } from '../Shared'
import FiltersMenu from './FiltersMenu'

import { useMenu } from '../../hooks'

const useStyles = makeStyles(() => ({
  main: {}
}))

const SocialCasesList = () => {
  const caseList = [
    {
      id: 1,
      estado: 'activo',
      fecha: '2021-11-25T15:00:14.449000',
      rut: '00.000.000-0',
      nombres: 'test test',
      apellidos: 'test test test',
      empresa: 'test',
      oficina: 'test'
    }
  ]
  const totalCases = 0

  const { open, handleOpen, handleClose, anchorEl } = useMenu()

  const classes = useStyles()
  const [loading, setLoading] = useState(false)
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

  const fetchSocialCases = () => {
    setLoading(true)
    console.log(filters) /* dispach para consultar el store */
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const onRowClick = (row) => {
    alert(row)
  }

  const handleCompanySelected = (e) => {
    setFilters({ ...filters, state: e.target.value })
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
            selector: (row) => row.estado
          },
          {
            name: 'Fecha',
            selector: (row) => formatDate(row.fecha),
            hide: 'md'
          },
          {
            name: 'Rut',
            selector: (row) => row.rut,
            hide: 'md'
          },
          {
            name: 'Nombres',
            selector: (row) => row.nombres,
            hide: 'md'
          },
          {
            name: 'Apellidos',
            selector: (row) => row.apellidos,
            hide: 'md'
          },
          {
            name: 'Empresa',
            selector: (row) => row.empresa,
            hide: 'md'
          },
          {
            name: 'Oficina',
            selector: (row) => row.oficina,
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
        data={caseList}
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
        paginationTotalRows={totalCases}
      />
      <FiltersMenu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        handleCompanyChange={handleCompanySelected}
      />
    </Wrapper>
  )
}

export default SocialCasesList
