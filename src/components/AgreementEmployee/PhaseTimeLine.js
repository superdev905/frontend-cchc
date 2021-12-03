import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { FiLock as LockedIcon, FiEdit as EditIcon } from 'react-icons/fi'
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator
} from '@material-ui/lab'
import { formatDate } from '../../formatters'
import housingActions from '../../state/actions/housing'
import { useToggle } from '../../hooks'
import PhaseDialog from './PhaseDialog'

const useStyles = makeStyles((theme) => ({
  item: {
    borderRadius: 5,
    '&::before': {
      display: 'none'
    }
  },
  timelineContent: {
    backgroundColor: '#F6F6F6',
    borderRadius: 5,
    position: 'relative'
  },
  date: {
    fontSize: 15
  },
  editButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    color: theme.palette.primary.main
  },
  timelineDot: {
    height: 20,
    width: 20
  },
  heading: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  lockedText: {
    fontSize: 14,
    opacity: 0.8
  }
}))

const HousingWorker = ({ employeeId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [phases, setPhases] = useState([])
  const { open, toggleOpen } = useToggle()
  const [currentPhase, setCurrentPhase] = useState(null)

  const updatePhaseData = (values) =>
    dispatch(
      housingActions.updatePhase(currentPhase.id, {
        ...currentPhase,
        ...values
      })
    )

  const getPhases = () => {
    dispatch(housingActions.getEmployeePhases({ employeeId })).then((res) => {
      setPhases(res.items)
    })
  }

  useEffect(() => {
    if (employeeId) {
      getPhases()
    }
  }, [employeeId])
  return (
    <Box>
      <Box>
        <Box>
          <Timeline position="alternate">
            {phases.map((item, index) => (
              <>
                <TimelineItem className={classes.item}>
                  <TimelineSeparator>
                    <TimelineDot
                      className={classes.timelineDot}
                      color="primary"
                    ></TimelineDot>
                    {index < phases.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box p={2} className={classes.timelineContent}>
                      <Typography className={classes.heading}>
                        {item.name}
                      </Typography>

                      <IconButton
                        className={classes.editButton}
                        onClick={() => {
                          setCurrentPhase(item)
                          toggleOpen()
                        }}
                      >
                        <EditIcon />
                      </IconButton>

                      {item.isLocked === 'locked' ? (
                        <Box textAlign="center">
                          <LockedIcon fontSize="24px" />
                          <Typography className={classes.lockedText}>
                            Bloqueado
                          </Typography>
                        </Box>
                      ) : (
                        <Box>
                          <Typography>Estado: {item.status || '--'}</Typography>
                          <Box>
                            <Typography className={classes.date}>
                              {item.startDate &&
                                `Fecha de inicio: ${formatDate(item.startDate, {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}`}
                            </Typography>
                            <Typography className={classes.date}>
                              {item.endDate &&
                                `Fecha de fin: ${formatDate(item.endDate, {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}`}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              </>
            ))}
          </Timeline>
          {open && currentPhase && (
            <PhaseDialog
              open={open}
              onClose={toggleOpen}
              data={currentPhase}
              submitFunction={updatePhaseData}
              successFunction={getPhases}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}
export default HousingWorker
