import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Typography, makeStyles } from '@material-ui/core'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@material-ui/lab'
import { FaAward, FaLock, FaRegCalendarCheck } from 'react-icons/fa'
import { formatDate } from '../../formatters'
import benefitsActions from '../../state/actions/benefits'

const useStyles = makeStyles(() => ({
  root: {
    '&::before': {
      display: 'none'
    }
  },
  item: {
    backgroundColor: '#F6F6F6',
    borderRadius: 5,
    marginBottom: 20
  }
}))

const ActivityTimeLine = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { benefitId } = useParams()
  const [activities, setActivities] = useState([])
  const { benefitDetails: benefit } = useSelector((state) => state.benefits)

  const fetchActivities = () => {
    dispatch(benefitsActions.getActivities(benefitId)).then((result) => {
      setActivities(result.items)
    })
  }

  useEffect(() => {
    fetchActivities()
  }, [benefit])

  return (
    <Timeline position="alternate" className={classes.root}>
      {activities.map((item) => (
        <>
          <TimelineItem className={classes.item}>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {`${formatDate(item.endDate)}`}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <FaLock />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Fin del termino cumplido
              </Typography>
              <Typography>
                Beneficio bloqueado ya no se puede seguir postulando
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem className={classes.item}>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              variant="body2"
              color="text.secondary"
            >
              {item.annualAmount}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <FaAward />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Cupos actualizados
              </Typography>
              <Typography>Se inscribio un nuevo trabajdor al curso</Typography>
              <Typography>Trabajador: {item.employeeName} </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem className={classes.item}>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {`${formatDate(item.startDate)}`}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <FaRegCalendarCheck />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                Beneficio Creado
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </>
      ))}
    </Timeline>
  )
}

export default ActivityTimeLine
