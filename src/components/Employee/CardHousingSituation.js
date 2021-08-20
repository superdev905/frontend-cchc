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
  title: {
    fontSize: 18,
    fontWeight: 'bold'
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
            <Typography>
              Tipo de vivienda: {data.type_home.description}
            </Typography>
            <Typography>
              Propiedad de la vivienda: {data.property_home.description}
            </Typography>
            <Typography>
              Tipo de subsidio: {data.type_subsidy.description}
            </Typography>
            <Typography>Descripción: {data.description}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

CardSituation.propTypes = {}

export default CardSituation
