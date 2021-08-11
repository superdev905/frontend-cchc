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
  },
  btnMore2: {
    position: 'absolute',
    top: 0,
    right: -5
  }
}))

const CardSituation = ({ data, onEdit, onDelete }) => {
  const classes = useStyles()

  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardContent className={classes.root}>
          <IconButton className={classes.btnMore} onClick={onEdit}>
            <Edit />
          </IconButton>

          <IconButton className={classes.btnMore2} onClick={onDelete}>
            <Delete />
          </IconButton>
          <Box p={2}>
            <Typography>AFP/ISP: {data.afp_isp.description}</Typography>
            <Typography>
              ISAPRE/FONASA: {data.isapre_fonasa.description}
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
