import { useEffect, useState } from 'react'
import { Box, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import approvedActions from '../../state/actions/approvedScholarship'
import ApprovedCard from './Card'
import { formatCurrency } from '../../formatters'

const Statistics = () => {
  const dispatch = useDispatch()
  const [stats, setStats] = useState({ total: 0, amount: 0 })
  const { idApproved } = useParams()

  useEffect(() => {
    dispatch(approvedActions.getApprovedStats(idApproved)).then((result) => {
      setStats(result)
    })
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
