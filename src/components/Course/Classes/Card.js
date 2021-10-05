import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { FiPlus } from 'react-icons/fi'
import { formatDate } from '../../../formatters'

const Container = ({ children }) => (
  <Grid container spacing={3}>
    {children}
  </Grid>
)

const useStyles = makeStyles((theme) => ({
  root: ({ completed }) => ({
    borderRadius: 5,
    backgroundColor: completed ? theme.palette.primary.main : 'transparent',
    display: 'flex',
    height: 200,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    color: completed ? theme.palette.common.white : theme.palette.common.black,
    border: `1px solid ${
      completed ? 'transparent' : theme.palette.common.black
    }`
  }),
  addRoot: {
    height: 200,
    borderRadius: 5,
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    border: `2px dashed ${theme.palette.gray.gray500}`
  },
  tag: {
    textTransform: 'uppercase',
    fontSize: 15
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  date: {
    fontSize: 15
  }
}))

const ClassesCard = ({ completed }) => {
  const classes = useStyles({ completed })
  return (
    <Grid item xs={6} md={4} lg={3}>
      <Box p={2} className={classes.root}>
        <Typography className={classes.tag}>Clase 1</Typography>
        <Typography className={classes.title}>
          Introducción a la clase
        </Typography>
        <Typography className={classes.date}>
          {formatDate(new Date(), {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </Typography>
      </Box>
    </Grid>
  )
}

const AddCard = ({ onClick }) => {
  const classes = useStyles()
  return (
    <Grid item xs={6} md={4} lg={3}>
      <Box p={2} className={classes.addRoot} onClick={onClick}>
        <FiPlus fontSize={40} opacity={0.7} />
      </Box>
    </Grid>
  )
}

ClassesCard.Container = Container
ClassesCard.AddCard = AddCard

export default ClassesCard
