import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Typography, makeStyles } from '@material-ui/core'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@material-ui/lab'
import { formatDate } from '../../formatters'
import benefitsActions from '../../state/actions/benefits'

const useStyles = makeStyles(() => ({
  root: {
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
      console.log(result.items)
    })
  }

  useEffect(() => {
    fetchActivities()
  }, [benefit])

  return (
    <Timeline>
      {activities.map((item, index) => (
        <>
          <TimelineItem className={classes.root}>
            {item.id}
            {item.createdBy}
            <TimelineSeparator>
              <TimelineDot color={item.isActive ? 'primary' : 'secondary'} />
              {index < activities.length - 1 && <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent>
              <Box>
                <Typography style={{ fontWeight: 'bold' }}>
                  Cupos actualizados
                </Typography>
                <Box p={1}>
                  <Typography> {item.annualAmount}</Typography>
                  <Typography> </Typography>
                </Box>
              </Box>
              <Box>
                <Typography style={{ fontWeight: 'bold' }}>
                  Beneficio creado
                </Typography>
                <Box p={1}>
                  <Typography> {`${formatDate(item.createdDate)}`}</Typography>
                  <Typography> </Typography>
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
