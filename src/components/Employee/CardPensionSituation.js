import {
  Box,
  Card,
  IconButton,
  CardContent,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import { StatusChip } from '../UI'
import { formatCurrency } from '../../formatters'

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative'
  },
  btnMore: {
    position: 'absolute',
    top: 0,
    right: 15
  }
}))

const CardSituation = ({ data, onEdit, onDelete }) => {
  const classes = useStyles()

  return (
    <Grid item xs={12} md={12}>
      <Card>
        <CardContent className={classes.root}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={onEdit}>
              <Edit />
            </IconButton>

            <IconButton onClick={onDelete}>
              <Delete />
            </IconButton>
          </Box>
          <Box p={2}>
            <Typography>AFP/ISP: {data.afp_isp.description}</Typography>

            <Typography>
              Nombre ISAPRE/Tramo FONASA: {data.isapre_fonasa.description}
            </Typography>
            <Typography>
              Nombre ISP / Tramo Fonasa: {data.isapre_fonasa_name}
            </Typography>
            <Box marginBottom="10px">
              <StatusChip label={`Pensionado: ${data.is_pensioner}`} />
            </Box>
            <Box marginBottom="10px">
              <StatusChip
                label={`Pertenece a reconocer: ${data.belongs_to_recognize}`}
              />
            </Box>
            <Typography>
              Monto de pensión:{' '}
              {data.pension_amount
                ? formatCurrency(data.pension_amount)
                : 'Sin pensión'}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

CardSituation.propTypes = {}

export default CardSituation
