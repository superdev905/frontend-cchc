import { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import commonActions from '../../state/actions/common'
import usersActions from '../../state/actions/users'
import { LabeledRow, Wrapper } from '../UI'
import { formatDate, formatHours } from '../../formatters'

const Details = () => {
  const dispatch = useDispatch()
  const { visit } = useSelector((state) => state.assistance)
  const [shiftDetails, setShiftDetails] = useState(null)
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    if (visit) {
      dispatch(commonActions.getShiftDetails(visit.shift_id)).then((result) => {
        setShiftDetails(result)
      })
      dispatch(usersActions.getUserDetails(visit.assigned_id)).then(
        (result) => {
          setUserDetails(result)
        }
      )
    }
  }, [visit])
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
            <LabeledRow label="Título:">{visit?.title}</LabeledRow>
            <LabeledRow label="Empresa:">{visit?.business_name}</LabeledRow>
            <LabeledRow label="Obra:">{visit?.construction_name}</LabeledRow>

            <LabeledRow label="Jornada:">{shiftDetails?.name}</LabeledRow>
          </Grid>
          <Grid item xs={12} md={6}>
            <LabeledRow label="Fecha:">
              {visit ? formatDate(visit.date) : ''}
            </LabeledRow>
            <LabeledRow label="Inicio:">
              {visit ? formatHours(visit.start_date) : ''}
            </LabeledRow>
            <LabeledRow label="Fin:">
              {visit ? formatHours(visit.end_date) : ''}
            </LabeledRow>
            <LabeledRow label="Profesional:">{`${userDetails?.names} ${userDetails?.paternal_surname} ${userDetails?.maternal_surname}`}</LabeledRow>
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  )
}

export default Details
