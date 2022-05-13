import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Typography, makeStyles, Box } from '@material-ui/core'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@material-ui/lab'
import benefitsActions from '../../state/actions/benefits'
import { formatDate, formatHours } from '../../formatters'

const useStyles = makeStyles(() => ({
  item: {
    borderRadius: 5,
    '&::before': {
      display: 'none'
    }
  },
  timelineContent: {
    backgroundColor: '#F6F6F6'
  },
  date: {
    fontSize: 14
  },
  timelineDot: {
    height: 20,
    width: 20
  },
  heading: {
    fontSize: 17,
    fontWeight: 'bold'
  }
}))

const ActivityTimeLine = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { benefitId } = useParams()
  const [activities, setActivities] = useState([])
  const { benefitDetails: benefit } = useSelector((state) => state.benefits)

  const fetchActivities = () => {
    dispatch(benefitsActions.getActivities({ benefitId })).then((result) => {
      setActivities(result.items)
    })
  }

  useEffect(() => {
    fetchActivities()
  }, [benefit])

  return (
    <Timeline position="alternate">
      {activities.map((item, index) => (
        <>
          <TimelineItem className={classes.item}>
            <TimelineSeparator>
              <TimelineDot
                className={classes.timelineDot}
                color="primary"
              ></TimelineDot>
              {index < activities.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Box p={2} className={classes.timelineContent}>
                {/* <Typography className={classes.heading}>
                  Nombre: {item.name}
      </Typography>
                <Typography>{item.description}</Typography> */}
                <Typography>Trabajador: {item.employeeName}</Typography>
                {/* <Typography>Cupos anuales: {item.annualAmount} </Typography>
                <Typography>
                  Costo del beneficio: {item.benefitCost}{' '}
                </Typography>
              <Typography>Financiamento: {item.founding} </Typography>  */}

                <Box>
                  <Typography className={classes.date}>
                    {`${formatDate(item.createdDate, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} - ${formatHours(item.createdDate)}`}
                  </Typography>
                </Box>
              </Box>
            </TimelineContent>
          </TimelineItem>
        </>
      ))}
    </Timeline>
  )
}

export default ActivityTimeLine
