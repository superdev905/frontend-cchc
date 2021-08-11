import {
  Box,
  Card,
  IconButton,
  CardContent,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core'
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'

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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
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
      </Card>
    </Grid>
  )
}

CardSituation.propTypes = {}

export default CardSituation
