import CountUp from 'react-countup'
import { useHistory } from 'react-router-dom'
import { Box, Chip, Grid, makeStyles, Typography } from '@material-ui/core'
import CalendarIcon from '@material-ui/icons/CalendarToday'
import { Skeleton } from '@material-ui/lab'
import { useSnackbar } from 'notistack'
import { FiAlertCircle } from 'react-icons/fi'
import { formatDate, formatText } from '../../formatters'
import { StatusChip } from '../UI'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  flex: {
    display: 'flex'
  },
  center: {
    display: 'flex',
    alignItems: 'center'
  },
  paper: ({ completed }) => ({
    border: `1px solid ${theme.palette.gray.gray400}`,
    borderRadius: 8,
    backgroundColor: completed ? '#def3de' : `transparent`,
    cursor: completed ? 'inherit' : 'pointer',
    [theme.breakpoints.up('md')]: {
      minHeight: 170
    }
  }),
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  answers: {
    fontSize: 38,
    fontWeight: 'bold'
  },
  answersTag: {
    fontSize: 14,
    opacity: 0.7
  },
  answersWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end'
    }
  },
  tagLoader: {
    marginRight: 10
  },
  calendarIcon: {
    color: theme.palette.gray.gray500,
    marginRight: '5px'
  },
  mandatoryStatus: {
    marginTop: 5
  }
}))

const PollCard = ({ loader, poll, onClick, showAnswers, isAnswered }) => {
  const classes = useStyles({ completed: isAnswered })
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  const handleOnClick = () => {
    if (onClick) {
      onClick(poll)
      if (poll.questions.length === 0) {
        enqueueSnackbar('Esta encuesta aún no tiene preguntas', {
          variant: 'info'
        })
      }
    } else {
      history.push(`/polls/${poll.id}`)
    }
  }

  return (
    <Box className={classes.root}>
      <Box
        className={classes.paper}
        onClick={() => {
          if (!isAnswered) {
            handleOnClick()
          }
        }}
      >
        {loader ? (
          <>
            <Grid container>
              <Grid item xs={12} md={10}>
                <Box p={2}>
                  <Box display="flex" marginBottom="10px">
                    {[...Array(3).keys()].map((__, index) => (
                      <Skeleton
                        key={`tag-loader-${index}`}
                        className={classes.tagLoader}
                        width="8%"
                      ></Skeleton>
                    ))}
                  </Box>
                  <Box>
                    <Skeleton
                      width="60%"
                      variant="h3"
                      style={{ margin: '18px 0px 5px' }}
                    ></Skeleton>
                    <Skeleton width="20%"></Skeleton>
                  </Box>
                  <Box marginTop="10px">
                    <Skeleton
                      className={classes.tagLoader}
                      width="10%"
                    ></Skeleton>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={2} className={classes.answersWrapper}>
                <Skeleton
                  className={classes.tagLoader}
                  width="20%"
                  height="20px"
                ></Skeleton>
              </Grid>
            </Grid>
          </>
        ) : (
          <Box p={2} display="flex" alignItems="center">
            <Grid container>
              <Grid item xs={12} md={10}>
                <Box marginBottom="10px">
                  {poll.modules.map((item, index) => (
                    <Chip
                      style={{ marginRight: '5px' }}
                      color="primary"
                      key={`module-chip-${item.id}-${index}`}
                      label={formatText.capitalizeString(item.module_name)}
                    />
                  ))}
                </Box>
                <Box>
                  <Typography className={classes.title}>
                    {poll.title}
                  </Typography>
                </Box>
                <Box>
                  <Typography className={classes.center}>
                    <CalendarIcon className={classes.calendarIcon} />
                    Fecha de fin: {formatDate(poll.end_date)}
                  </Typography>
                </Box>
                <Box marginTop="10px">
                  <StatusChip
                    icon={<FiAlertCircle />}
                    label={
                      poll.is_mandatory === false
                        ? 'NO OBLIGATORIO'
                        : 'OBLIGATORIO'
                    }
                    success={poll.is_mandatory !== true}
                    error={poll.is_mandatory !== false}
                  />
                </Box>

                <Box marginTop="10px">
                  <StatusChip
                    label={
                      poll.status === 'NO_VIGENTE' ? 'No vigente' : 'Vigente'
                    }
                    success={poll.status !== 'NO_VIGENTE'}
                    error={poll.status !== 'VIGENTE'}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={2} className={classes.answersWrapper}>
                {showAnswers && (
                  <Box display="flex" justifyContent="flex-end">
                    <Box>
                      <Typography className={classes.answers} align="center">
                        <CountUp
                          duration={0.5}
                          start={0}
                          end={poll.responses.length}
                        ></CountUp>
                      </Typography>
                      <Typography className={classes.answersTag} align="center">
                        Respuestas
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  )
}

PollCard.defaultProps = {
  showAnswers: true
}

export default PollCard
