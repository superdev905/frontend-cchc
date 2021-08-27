import { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import usersActions from '../../state/actions/users'
import { LabeledRow, StatusChip, Text, Wrapper } from '../UI'
import { formatDate } from '../../formatters'
// from Visit Details
const PollDetails = ({ fetching }) => {
  const dispatch = useDispatch()
  const { poll } = useSelector((state) => state.poll)
  const [loading, setLoading] = useState(false)
  const [shiftDetails, setShiftDetails] = useState(null)
  const [userDetails, setUserDetails] = useState(null)

  return (
    <Wrapper>
      <Box p={1}>
        <Typography
          style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}
        >
          Detalles de visita
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <LabeledRow label="Título:">
              <Text loading={fetching}>{poll?.name}</Text>
            </LabeledRow>
            <LabeledRow label="Inicio:">
              <Text loading={fetching}>
                {poll ? formatDate(poll.start_date) : ''}
              </Text>
            </LabeledRow>
            <LabeledRow label="Fin:">
              <Text loading={fetching}>
                {poll ? formatDate(poll.end_date) : ''}
              </Text>
            </LabeledRow>{' '}
            <LabeledRow label="Estado:">
              <Text loaderWidth="80%" loading={fetching}>
                {poll ? <StatusChip success label={poll.status} /> : ''}
              </Text>
            </LabeledRow>
            <LabeledRow label="Modulos:">
              <Text loaderWidth="80%" loading={fetching}>
                {poll?.business_name}
              </Text>
            </LabeledRow>
          </Grid>
          <Grid item xs={12} md={6}>
            <LabeledRow label="Creado por:">
              <Text loading={loading || fetching}>
                {userDetails
                  ? `${userDetails?.names} ${userDetails?.paternal_surname} ${userDetails?.maternal_surname}`
                  : ''}
              </Text>
            </LabeledRow>
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  )
}

export default PollDetails
