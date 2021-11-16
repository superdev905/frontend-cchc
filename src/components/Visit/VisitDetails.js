import { useEffect, useState } from 'react'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import usersActions from '../../state/actions/users'
import { LabeledRow, StatusChip, Text, Wrapper } from '../UI'
import { formatDate, formatHours } from '../../formatters'

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  }
}))

const VisitDetails = ({ fetching }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { visit } = useSelector((state) => state.assistance)
  const [loading, setLoading] = useState(false)
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    if (visit) {
      setLoading(true)
      dispatch(usersActions.getUserDetails(visit.assigned_id)).then(
        (result) => {
          setLoading(false)
          setUserDetails(result)
        }
      )
    }
  }, [visit])
  return (
    <Wrapper>
      <Box p={1}>
        <Typography className={classes.title}>Detalles de visita</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {visit && (
              <LabeledRow label="Título:">
                <Text loading={fetching}>{visit?.title}</Text>
              </LabeledRow>
            )}
            <LabeledRow label="Título:">
              <Text loading={fetching}>{visit?.title}</Text>
            </LabeledRow>
            <LabeledRow label="Empresa:">
              <Text loaderWidth="80%" loading={fetching}>
                {visit?.business_name}
              </Text>
            </LabeledRow>
            <LabeledRow label="Obra:">
              <Text loaderWidth="80%" loading={fetching}>
                {visit?.construction_name}
              </Text>
            </LabeledRow>
            <LabeledRow label="Jornada:">
              <Text loading={loading || fetching}>{visit?.shift?.name} </Text>
            </LabeledRow>
            <LabeledRow label="Estado:">
              <Text loaderWidth="80%" loading={fetching}>
                {visit ? <StatusChip success label={visit.status} /> : ''}
              </Text>
            </LabeledRow>
          </Grid>
          <Grid item xs={12} md={6}>
            <LabeledRow label="Fecha:">
              <Text loading={fetching} loaderWidth="70%">
                {visit ? formatDate(visit.date) : ''}
              </Text>
            </LabeledRow>
            <LabeledRow label="Inicio:">
              <Text loading={fetching}>
                {visit ? formatHours(visit.start_date) : ''}
              </Text>
            </LabeledRow>
            <LabeledRow label="Fin:">
              <Text loading={fetching}>
                {visit ? formatHours(visit.end_date) : ''}
              </Text>
            </LabeledRow>{' '}
            <LabeledRow label="Profesional:">
              <Text loading={loading || fetching}>
                {userDetails
                  ? `${userDetails?.names} ${userDetails?.paternal_surname} ${userDetails?.maternal_surname}`
                  : ''}
              </Text>
            </LabeledRow>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography className={classes.title}>
          Cantidad de trabajadores
        </Typography>
      </Box>
    </Wrapper>
  )
}

export default VisitDetails
