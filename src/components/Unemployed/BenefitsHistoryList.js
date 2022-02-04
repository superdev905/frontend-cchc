import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { Box, Grid, Chip } from '@material-ui/core'
import { HighlightOff } from '@material-ui/icons'
import { Wrapper, Button } from '../UI'
import { DataTable } from '../Shared'
import Filter from './Filter'
import unemployedActions from '../../state/actions/unemployed'

const useStyles = makeStyles(() => ({
  main: {}
}))

const BenefitsHistoryList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { filters, query } = useSelector((state) => state.unemployed)
  const [loading, setLoading] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const benefitsList = [
    {
      id: 1,
      run: '00.000.000-0',
      names: 'test 1',
      causal: 'test 2',
      date: '12/12/12',
      year: '2021',
      status: 'Finalizado'
    }
  ]

  const fetchBenefitsHistory = () => {
    setLoading(true)
  }

  const updateQuery = () => {}

  const handleDeleteFilter = (key) => {
    const copyLocalQuery = { ...query }
    const copyLocalFilters = { ...filters }
    delete copyLocalFilters[key]
    if (copyLocalQuery[key]) {
      delete copyLocalQuery[key]
    }
    dispatch(unemployedActions.setFilters(copyLocalFilters))
    dispatch(unemployedActions.setQuery(copyLocalQuery))
  }

  useEffect(() => {
    fetchBenefitsHistory()
    setLoading(false)
  }, [filters])
  return (
    <Box className={classes.main}>
      <Wrapper>
        <Grid item xs={12} md={12}>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Button
              onClick={(e) => {
                setOpenFilter(true)
                setAnchorEl(e.currentTarget)
              }}
            >
              Filtros
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box container padding="10px">
            {Object.keys(filters).map(
              (key) =>
                filters[key].date && (
                  <Chip
                    style={{ marginRight: 10 }}
                    color="primary"
                    key={`filter-${key}`}
                    label={`${filters[key].label}: ${filters[key].date}`}
                    deleteIcon={<HighlightOff />}
                    onDelete={() => handleDeleteFilter(key)}
                  />
                )
            )}
          </Box>
        </Grid>
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
              name: 'causal',
              selector: (row) => row.causal
            },
            {
              name: 'date',
              selector: (row) => row.date
            },
            {
              name: 'Año',
              selector: (row) => row.year
            },
            {
              name: 'Estado',
              selector: (row) => row.status
            }
          ]}
          data={benefitsList}
          pagination
          paginationRowsPerPageOptions={[30, 40]}
          paginationServer={true}
          paginationTotalRows={10}
          paginationPerPage={50}
          paginationServer={true}
          onChangeRowsPerPage={(limit) => {
            updateQuery({ ...query, size: limit })
          }}
          onChangePage={(page) => {
            updateQuery({ ...query, page })
          }}
        />
      </Wrapper>
      <Filter
        open={openFilter}
        onClose={() => {
          setOpenFilter(false)
          setAnchorEl(null)
        }}
        anchorEl={anchorEl}
      />
    </Box>
  )
}

export default BenefitsHistoryList
