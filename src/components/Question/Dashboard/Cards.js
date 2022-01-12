import {
  Box,
  Grid,
  makeStyles,
  Typography,
  IconButton
} from '@material-ui/core'
import { Edit as EditIcon } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Can from '../../Can'
import questionActions from '../../../state/actions/questions'
import EditHoursModal from './EditHoursModal'

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    backgroundColor: theme.palette.common.white,
    textAlign: 'center',
    borderRadius: theme.spacing(1)
  },
  iconButton: {
    padding: '0px',
    margin: '0px 0px 0px 9px'
  },
  data: {
    fontSize: 38,
    fontWeight: 'bold'
  },
  label: {
    opacity: 0.8
  }
}))

const SimpleCard = ({ data, label, showEdit = false, onClick }) => {
  const classes = useStyles()

  return (
    <Box p={2} className={classes.cardRoot}>
      <Box display="flex" justifyContent="center" padding={0} margin={0}>
        <Typography className={classes.data}>{data}</Typography>
        {showEdit ? (
          <IconButton
            color="primary"
            size="small"
            className={classes.iconButton}
            onClick={onClick}
          >
            <EditIcon />
          </IconButton>
        ) : null}
      </Box>
      <Typography className={classes.label}>{label}</Typography>
    </Box>
  )
}

const Cards = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { stats, maxHours } = useSelector((state) => state.questions)
  const [query] = useState({ professionalId: user.id })
  const [open, setOpen] = useState(false)

  const getStats = () => {
    const formattedQuery = { ...query }
    if (user.role.key === 'ADMIN' || user.role.key === 'JEFATURA') {
      delete formattedQuery.professionalId
    }
    dispatch(questionActions.getStats(formattedQuery))
  }
  const getMaxHours = () => {
    dispatch(questionActions.getMaxHours())
  }

  useEffect(() => {
    getStats()
  }, [])

  useEffect(() => {
    getMaxHours()
  }, [maxHours])

  return (
    <Grid container spacing={1}>
      {Object.keys(stats).map((key) => (
        <Grid item xs={6} md={4} lg={2} key={`card-stats-${key}`}>
          <SimpleCard label={stats[key].label} data={stats[key].value} />
        </Grid>
      ))}
      <Can
        availableTo={['ADMIN', 'JEFATURA']}
        yes={() => (
          <SimpleCard
            label={'Horas Máximas Para Responder'}
            data={maxHours ? `${maxHours} Hrs` : '0 Hrs'}
            showEdit={true}
            onClick={() => setOpen(true)}
          />
        )}
        no={() => null}
      />
      <EditHoursModal open={open} onClose={() => setOpen(false)} />
    </Grid>
  )
}

export default Cards
