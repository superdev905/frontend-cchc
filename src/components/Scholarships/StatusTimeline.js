import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@material-ui/lab'
import { Box, Typography } from '@material-ui/core'
import scholarshipsActions from '../../state/actions/scholarships'
import { formatHours, formatDate } from '../../formatters'

const StatusTimeline = () => {
  const dispatch = useDispatch()
  const { idPostulation } = useParams()
  const [revisions, setRevisions] = useState([])
  const { application } = useSelector((state) => state.scholarships)
  const fetchRevisions = () => {
    dispatch(scholarshipsActions.getApplicationRevisions(idPostulation)).then(
      (result) => {
        setRevisions(result)
      }
    )
  }

  useEffect(() => {
    fetchRevisions()
  }, [application])
  return (
    <Box>
      <Typography style={{ fontSize: '18px', fontWeight: 'bold' }}>
        Historial de revisiones
      </Typography>
      <Timeline align="alternate">
        {revisions.map((item, index) => (
          <>
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {`${formatDate(item.date)}-${formatHours(item.date)}`}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color={item.isActive ? 'primary' : 'secondary'} />
                {index < revisions.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Box p={1}>
                  <Typography style={{ fontSize: '14px', opacity: 0.7 }}>
                    {`Por: ${item.approver.names} ${item.approver.paternalSurname}`}
                  </Typography>
                  <Typography>{item.name}</Typography>
                  <Box mt={2}>
                    <Typography style={{ opacity: 0.8, fontStyle: 'italic' }}>
                      {item.comments}
                    </Typography>
                  </Box>
                </Box>
              </TimelineContent>
            </TimelineItem>
          </>
        ))}
      </Timeline>
    </Box>
  )
}

export default StatusTimeline
