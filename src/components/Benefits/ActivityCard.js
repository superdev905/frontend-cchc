import { Box, Grid, makeStyles } from '@material-ui/core'
import { formatCurrency, formatDate } from '../../formatters'
import { LabeledRow } from '../UI'

const useStyles = makeStyles((theme) => ({
  root: { borderRadius: 5, border: `1px solid ${theme.palette.gray.gray400}` }
}))

const ActivityCard = ({ activity }) => {
  const classes = useStyles()

  return (
    <Box p={2} className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LabeledRow label={'Nombre'}>{activity.name}</LabeledRow>
          <LabeledRow label={'Descripción'}>{activity.description}</LabeledRow>
        </Grid>
        <Grid item xs={6}>
          <LabeledRow label={'Fecha de inicio'}>
            {formatDate(activity.startDate)}
          </LabeledRow>
          <LabeledRow label={'Fecha de termino'}>
            {formatDate(activity.endDate)}
          </LabeledRow>
          <LabeledRow label={'Estado'}>
            {`${activity.isActive ? 'Vigente' : 'No vigente'}`}
          </LabeledRow>

          <LabeledRow label={'Cantidad de reutilización'}>
            {activity.reuseQuantity}
          </LabeledRow>
        </Grid>
        <Grid item xs={6}>
          <LabeledRow label={'Cupos Anuales:'} width={200}>
            {activity.annualAmount}
          </LabeledRow>
          <LabeledRow label={'Cupos del beneficio'} width={200}>
            {formatCurrency(activity.benefitCost)}
          </LabeledRow>
          <LabeledRow label={'Ejecución'}>{`${activity.executeSchedule} ${
            activity.executeSchedule > 0 ? 'meses' : 'mes'
          }`}</LabeledRow>
          <LabeledRow label={'Temporalidad'}>{activity.temporality}</LabeledRow>
        </Grid>
      </Grid>
    </Box>
  )
}

ActivityCard.propTypes = {}

export default ActivityCard
