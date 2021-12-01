import { useState } from 'react'
import { Typography, makeStyles, Box } from '@material-ui/core'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@material-ui/lab'

import { formatDate, formatHours } from '../../formatters'

const useStyles = makeStyles((theme) => ({
  item: {
    borderRadius: 5,
    '&::before': {
      display: 'none'
    }
  },
  timelineContent: {
    backgroundColor: '#F6F6F6',
    borderRadius: 8
  },
  date: {
    fontSize: 14
  },
  timelineDot: {
    height: 20,
    width: 20,
    backgroundColor: theme.palette.error.main
  },
  heading: {
    fontSize: 17,
    fontWeight: 'bold'
  }
}))

const BenefitTimeLine = () => {
  const classes = useStyles()
  const [activities] = useState([
    { name: 'CODDJD-SNASUJSNB', date: new Date() },
    { name: 'CODDJD-SNASUJSNB', date: new Date() }
  ])

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
                <Typography className={classes.heading}>
                  Nombre: {item.name}
                </Typography>

                <Box>
                  <Typography className={classes.date} align="right">
                    {`${formatDate(item.date, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} - ${formatHours(item.date)}`}
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

export default BenefitTimeLine
