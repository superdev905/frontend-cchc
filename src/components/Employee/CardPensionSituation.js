import {
  Box,
  Card,
  IconButton,
  CardContent,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { StatusChip } from '../UI'
import { useMenu } from '../../hooks'
import { OptionsMenu } from '../Shared'

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative'
  },
  btnMore: {
    position: 'absolute',
    top: 15,
    right: 15
  }
}))

const CardSituation = ({ data, onEdit, onDelete }) => {
  const classes = useStyles()
  const { open, anchorEl, handleOpen, handleClose } = useMenu()
  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardContent className={classes.root}>
          <IconButton className={classes.btnMore} onClick={handleOpen}>
            <MoreVertIcon />
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
              Monto de pensión: {data.pension_amount || 'Sin pensión'}
            </Typography>
          </Box>
        </CardContent>
        <OptionsMenu
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Card>
    </Grid>
  )
}

CardSituation.propTypes = {}

export default CardSituation
