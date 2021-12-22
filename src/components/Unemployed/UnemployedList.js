import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Box, Grid } from '@material-ui/core'
import { Button, Wrapper, SearchInput } from '../UI'
import { DataTable } from '../Shared'
import UnemployedModal from './UnemployedModal'

const useStyles = makeStyles(() => ({
  main: {}
}))

const UnemployedList = () => {
  const history = useHistory()
  const filters = { Page: 1, Size: 50 }
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const unemployed = [
    {
      id: 1,
      run: '24.150.582-0',
      names: 'test',
      oficine: 'Arica',
      period: '2021',
      status: 'pendiente'
    }
  ]

  const fetchUnemployed = () => {
    setLoading(true)
    /* dispatch(migrantsActions.getMigrants(formatQuery(filters)))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      }) */
    console.log('fetch')
  }

  const onRowClick = (row) => {
    history.push(`/unemployed/${row.id}/details`)
  }

  const onSearchChange = (e) => {
    const { value } = e.target
    console.log(value)

    /* dispatch(
      migrantsActions.setFilters({
        ...filters,
        search: formatSearchWithRut(value.toString())
      })
    ) */
  }

  const updateFilters = (values) => {
    /* dispatch(migrantsActions.setFilters(values)) */
    console.log(values)
  }

  useEffect(() => {
    fetchUnemployed()
    setLoading(false)
  }, [filters])

  return (
    <Box className={classes.main}>
      <Wrapper>
        <Box px={2} pt={1}>
          <Grid container spacing={2} alignItems="center">
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <SearchInput
                  value={'vacio'}
                  onChange={onSearchChange}
                  placeholder="Buscar por: RUT O NOMBRE DE TRABAJADOR"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Button onClick={() => setOpen(true)}>Registrar</Button>
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
              selector: (row) => row.run,
              sortable: true
            },
            {
              name: 'Nombres y apellidos',
              selector: (row) => row.names
            },
            {
              name: 'Oficina',
              selector: (row) => row.oficine
            },
            {
              name: 'Periodo',
              selector: (row) => row.period
            },
            {
              name: 'Estado de Solicitud',
              selector: (row) => row.status
            }
          ]}
          data={unemployed}
          pagination
          onRowClicked={onRowClick}
          paginationRowsPerPageOptions={[30, 40]}
          paginationServer={true}
          paginationTotalRows={10}
          paginationPerPage={50}
          paginationServer={true}
          onChangeRowsPerPage={(limit) => {
            updateFilters({ ...filters, size: limit })
          }}
          onChangePage={(page) => {
            updateFilters({ ...filters, page })
          }}
        />
      </Wrapper>
      <UnemployedModal open={open} onClose={() => setOpen(false)} />
    </Box>
  )
}

export default UnemployedList
