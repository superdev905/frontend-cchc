import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Box } from '@material-ui/core'
import { startOfMonth, endOfMonth, startOfDay, endOfDay } from 'date-fns'
import scholarshipsActions from '../../../state/actions/scholarships'
import { PageHeading, Button } from '../../UI'
import GraphPie from './PieChart'
import { useMenu } from '../../../hooks'
import FiltersMenu from '../FilterMenu'
import Cards from './Cards'
import { formatQuery } from '../../../formatters'

const ScholarshipGraphs = () => {
  const [currentDate] = useState(new Date())
  const {
    open: openfilters,
    handleOpen: handleOpenfilters,
    handleClose: handleClosefilters,
    anchorEl: anchorElfilters
  } = useMenu()
  const [filters, setFilters] = useState({
    scholarshipType: '',
    startDate: startOfMonth(currentDate),
    endDate: endOfMonth(currentDate),
    status: ''
  })

  const dispatch = useDispatch()
  const { stats, summary } = useSelector((state) => state.scholarships)

  const getDistributionByType = () => {
    dispatch(
      scholarshipsActions.getStatsByType({
        startDate: startOfDay(filters.startDate).toISOString(),
        endDate: endOfDay(filters.endDate).toISOString()
      })
    )
  }

  const getSummary = () => {
    const cleanQuery = formatQuery(filters)
    dispatch(
      scholarshipsActions.getSummary({
        ...cleanQuery,
        startDate: startOfDay(filters.startDate).toISOString(),
        endDate: endOfDay(filters.endDate).toISOString()
      })
    )
  }

  useEffect(() => {
    getDistributionByType()
    getSummary()
  }, [filters])

  return (
    <Box>
      <Box display={'flex'} justifyContent={'space-between'}>
        <PageHeading>Reportes becas</PageHeading>
        <Button onClick={handleOpenfilters}>Filtros</Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Cards data={summary} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <GraphPie data={stats} />
        </Grid>
      </Grid>
      <FiltersMenu
        open={openfilters}
        onClose={handleClosefilters}
        anchorEl={anchorElfilters}
        filters={filters}
        setFilters={setFilters}
      />
    </Box>
  )
}

export default ScholarshipGraphs
