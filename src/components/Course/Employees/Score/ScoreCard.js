import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import { FiEdit2 as EditIcon, FiTrash2 as DeleteIcon } from 'react-icons/fi'
import { formatDate } from '../../../../formatters'

const Container = ({ children }) => (
  <Grid container spacing={2}>
    {children}
  </Grid>
)

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid',
    borderRadius: 5,
    display: 'flex',
    height: 200,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  infoBox: {
    backgroundColor: theme.palette.gray.gray100
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  date: {
    marginBottom: 10,
    fontSize: 14
  },
  deleteIcon: { color: theme.palette.error.main },
  actions: {
    top: 10,
    right: 10,
    '& button': {
      padding: 5,
      color: theme.palette.primary.main
    }
  }
}))

const ScoreCard = ({ score, avg, onEdit, onDelete }) => {
  const classes = useStyles()
  return (
    <Grid item xs={6} md={6}>
      <Box p={2} className={classes.root}>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          className={classes.actions}
        >
          <IconButton onClick={onEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={onDelete}>
            <DeleteIcon className={classes.deleteIcon} />
          </IconButton>
        </Box>
        <Box className={classes.date}>{`Fecha: ${formatDate(new Date())}`}</Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box className={classes.infoBox} py={2}>
              <Typography align="center" className={classes.number}>
                {score}
              </Typography>
              <Typography align="center">Nota</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className={classes.infoBox} py={2}>
              <Typography align="center" className={classes.number}>
                {avg}
              </Typography>
              <Typography align="center">Promedio</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}

ScoreCard.Container = Container

export default ScoreCard
