import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Box, Grid } from '@material-ui/core'
import { Button, Wrapper, SearchInput } from '../UI'
import { DataTable } from '../Shared'
import { formatQuery, formatSearchWithRut } from '../../formatters'
import UnemployedModal from './UnemployedModal'
import unemployedActions from '../../state/actions/unemployed'

const useStyles = makeStyles(() => ({
  main: {}
}))

const UnemployedList = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { queryUnemployed, unemployedList, totalUnemployed } = useSelector(
    (state) => state.unemployed
  )
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchUnemployed = () => {
    setLoading(true)
    dispatch(
      unemployedActions.getUnemployed(formatQuery(queryUnemployed))
    ).then(() => {
      setLoading(false)
    })
  }

  const onRowClick = (row) => {
    history.push(`/unemployed/${row.id}/details`)
  }

  const onSearchChange = (e) => {
    const { value } = e.target
    dispatch(
      unemployedActions.setQueryUnemployed({
        ...queryUnemployed,
        search: formatSearchWithRut(value.toString())
      })
    )
  }

  const updateFilters = (values) => {
    /* dispatch(migrantsActions.setFilters(values)) */
    console.log(values)
  }

  useEffect(() => {
    fetchUnemployed()
    setLoading(false)
  }, [queryUnemployed])

  return (
    <Box className={classes.main}>
      <Wrapper>
        <Box px={2} pt={1}>
          <Grid container spacing={2} alignItems="center">
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <SearchInput
                  value={queryUnemployed?.search || ''}
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
              selector: (row) => row.employeeRut,
              sortable: true
            },
            {
              name: 'Nombres y apellidos',
              selector: (row) => row.employeeNames
            },
            {
              name: 'Oficina',
              selector: (row) => row.office
            },
            {
              name: 'Periodo',
              selector: (row) => row.period
            }
            /* {
              name: 'Estado de Solicitud',
              selector: (row) => row.status
            } */
          ]}
          data={unemployedList}
          pagination
          onRowClicked={onRowClick}
          paginationRowsPerPageOptions={[30, 40]}
          paginationServer={true}
          paginationTotalRows={10}
          paginationPerPage={50}
          paginationServer={true}
          paginationTotalRows={totalUnemployed}
          onChangeRowsPerPage={(limit) => {
            updateFilters({ ...queryUnemployed, size: limit })
          }}
          onChangePage={(page) => {
            updateFilters({ ...queryUnemployed, page })
          }}
        />
      </Wrapper>
      <UnemployedModal open={open} onClose={() => setOpen(false)} />
    </Box>
  )
}

export default UnemployedList
