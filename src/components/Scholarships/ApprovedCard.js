import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import CalendarIcon from '@material-ui/icons/CalendarToday'
import { Skeleton } from '@material-ui/lab'

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
  }
}))

const ApprovedCard = ({ loader, application }) => {
  const classes = useStyles({ completed: application?.is_answered })

  return (
    <Box className={classes.root}>
      <Box className={classes.paper}>
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
                <Box marginBottom="10px">Fecha</Box>
                <Box>
                  <Typography className={classes.title}>Beca: </Typography>
                </Box>
                <Box>
                  <Typography className={classes.center}>
                    <CalendarIcon className={classes.calendarIcon} />
                    Descripción:
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  )
}

ApprovedCard.defaultProps = {
  showAnswers: true
}

export default ApprovedCard
