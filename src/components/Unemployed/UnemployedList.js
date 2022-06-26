import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Box, Grid, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { Button, Wrapper, SearchInput, ActionsTable } from '../UI'
import { DataTable } from '../Shared'
import { formatDate, formatSearchWithRut } from '../../formatters'
import UnemployedModal from './UnemployedModal'
import unemployedActions from '../../state/actions/unemployed'
import { useToggle } from '../../hooks'
import MultiplePaymentDialog from './Payment/MultipleDialog'

const useStyles = makeStyles(() => ({
  main: {}
}))

const UnemployedList = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [filters, setFilters] = useState({
    page: 1,
    skip: 0,
    size: 10,
    search: ''
  })
  const { unemployedList, totalUnemployed } = useSelector(
    (state) => state.unemployed
  )
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { open: openPayment, toggleOpen: toggleOpenPayment } = useToggle()

  const fetchUnemployed = () => {
    setLoading(true)
    dispatch(
      unemployedActions.getUnemployed({
        ...filters,
        search: filters.search.trim()
      })
    ).then(() => {
      setLoading(false)
    })
  }
  const searchButton = () => {
    fetchUnemployed()
  }
  const handleStateChange = (e) => {
    setFilters({
      ...filters,
      skip: 0,
      search: formatSearchWithRut(e.target.value)
    })
  }

  const onRowClick = (row) => {
    history.push(`/unemployed/${row.id}/details`)
  }

  const registerMultiplePayment = (values) =>
    dispatch(
      unemployedActions.registerMultiplePayment({
        ...values,
        date: new Date().toISOString()
      })
    )

  useEffect(() => {
    fetchUnemployed()
  }, [])

  return (
    <Box className={classes.main}>
      <Wrapper>
        <Box px={2} pt={1}>
          <Grid container spacing={2} alignItems="center">
            <Grid container spacing={1}>
              <Grid item xs={12} md={7}>
                <SearchInput
                  value={filters.search || ''}
                  onChange={handleStateChange}
                  placeholder="Buscar por: RUT O NOMBRE DE TRABAJADOR"
                >
                  <IconButton onClick={searchButton}>
                    <SearchIcon color="primary" fontSize="large" />
                  </IconButton>
                </SearchInput>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Button variant="outlined" onClick={toggleOpenPayment}>
                    Registrar pago
                  </Button>
                  <Button onClick={() => setOpen(true)}>Nuevo</Button>
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
            },
            {
              name: 'Fecha',
              selector: (row) => formatDate(row.date)
            },
            {
              name: '',
              right: true,
              selector: (row) => <ActionsTable onView={() => onRowClick(row)} />
            }
          ]}
          data={unemployedList}
          pagination
          onRowClicked={onRowClick}
          paginationRowsPerPageOptions={[10, 20, 30, 40]}
          paginationServer={true}
          paginationPerPage={50}
          paginationTotalRows={totalUnemployed}
          onChangeRowsPerPage={(limit) => {
            setFilters({ ...filters, size: limit })
          }}
          onChangePage={(page) => {
            setFilters({ ...filters, page })
          }}
        />
      </Wrapper>
      <UnemployedModal open={open} onClose={() => setOpen(false)} />
      {openPayment && (
        <MultiplePaymentDialog
          open={openPayment}
          onClose={toggleOpenPayment}
          submitFunction={registerMultiplePayment}
          successMessage={'Pagos guardados'}
        />
      )}
    </Box>
  )
}

export default UnemployedList
