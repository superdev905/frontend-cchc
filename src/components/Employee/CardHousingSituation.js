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
            <Typography>
              Tipo de vivienda: {data.type_home.description}
            </Typography>
            <Typography>
              Propiedad de la vivienda: {data.property_home.description}
            </Typography>
            <Typography>
              Tipo de subsidio: {data.type_subsidy.description}
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
