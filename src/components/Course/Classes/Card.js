import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import {
  FiPlus,
  FiEdit2 as EditIcon,
  FiTrash2 as DeleteIcon
} from 'react-icons/fi'
import { formatDate } from '../../../formatters'

const Container = ({ children }) => (
  <Grid container spacing={2}>
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
    }`,
    position: 'relative'
  }),
  actions: {
    position: 'absolute',
    top: 10,
    right: 10,
    '& button': {
      padding: 5,
      color: theme.palette.primary.main
    }
  },
  deleteIcon: { color: theme.palette.error.main },
  addRoot: {
    height: 200,
    borderRadius: 5,
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    border: `2px dashed ${theme.palette.gray.gray500}`
  },
  addText: {
    opacity: 0.7
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

const Loader = () => {
  const classes = useStyles()
  return (
    <Grid item xs={12} md={4} lg={3}>
      <Box p={2} className={classes.root}>
        <Skeleton width="20%"></Skeleton>
        <Skeleton width="40%"></Skeleton>
        <Skeleton width="30%"></Skeleton>
      </Box>
    </Grid>
  )
}

const ClassesCard = ({ completed, item, onDelete, onEdit }) => {
  const classes = useStyles({ completed })
  return (
    <Grid item xs={12} md={4} lg={3}>
      <Box p={2} className={classes.root}>
        <Box className={classes.actions}>
          <IconButton onClick={onEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={onDelete}>
            <DeleteIcon className={classes.deleteIcon} />
          </IconButton>
        </Box>
        <Typography className={classes.tag}>{item.name}</Typography>
        <Typography className={classes.title}>{item.title}</Typography>
        <Typography className={classes.date}>
          {formatDate(new Date(item.date), {
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
    <Grid item xs={12} md={4} lg={3}>
      <Box p={2} className={classes.addRoot} onClick={onClick}>
        <Box textAlign="center">
          <FiPlus fontSize={40} opacity={0.5} />
          <Typography className={classes.addText}>Nueva clase</Typography>
        </Box>
      </Box>
    </Grid>
  )
}

ClassesCard.Container = Container
ClassesCard.AddCard = AddCard
ClassesCard.Loader = Loader

export default ClassesCard
