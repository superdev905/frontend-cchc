import { useEffect } from 'react'
import { Box, Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import approvedActions from '../../state/actions/approvedScholarship'
import ApprovedCard from './Card'
import { formatCurrency } from '../../formatters'

const Statistics = () => {
  const dispatch = useDispatch()
  const { idApproved } = useParams()
  const { approvedStats: stats } = useSelector(
    (state) => state.approvedScholarship
  )

  useEffect(() => {
    dispatch(approvedActions.getApprovedStats(idApproved))
  }, [])

  return (
    <Box p={1}>
      <Grid container spacing={2}>
        <ApprovedCard
          label="Monto total"
          number={formatCurrency(stats.amount)}
        />
        <ApprovedCard label="Beneficios" number={stats.total} />
      </Grid>
    </Box>
  )
}

export default Statistics
