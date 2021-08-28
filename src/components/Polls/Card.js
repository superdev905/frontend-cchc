import { Box, Chip, Grid, makeStyles, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { formatDate } from '../../formatters'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  paper: {
    border: `1px solid ${theme.palette.gray.gray400}`,
    borderRadius: 8,
    minHeight: 150,
    cursor: 'pointer'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  answers: {
    fontSize: 38,
    fontWeight: 'bold'
  },
  answersTag: {
    fontSize: 12,
    opacity: 0.7
  },
  tagLoader: {
    marginRight: 10
  }
}))

const PollCard = ({ loader, poll }) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.paper}>
        {loader ? (
          <>
            <Grid container>
              <Grid item xs={7}>
                <Box p={2}>
                  <Box display="flex" marginBottom="10px">
                    <Skeleton
                      className={classes.tagLoader}
                      width="5%"
                      height="20px"
                    ></Skeleton>
                    <Skeleton
                      className={classes.tagLoader}
                      width="5%"
                      height="20px"
                    ></Skeleton>
                    <Skeleton
                      className={classes.tagLoader}
                      width="5%"
                      height="20px"
                    ></Skeleton>
                  </Box>
                  <Box>
                    <Skeleton width="50%" height="20px"></Skeleton>
                    <Skeleton width="20%" height="20px"></Skeleton>
                  </Box>
                  <Box>
                    <Skeleton
                      className={classes.tagLoader}
                      width="5%"
                      height="20px"
                    ></Skeleton>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={5}>
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
              <Grid item xs={7}>
                <Box marginBottom="10px">
                  {poll.modules.map((item) => (
                    <Chip label={item.module_name} />
                  ))}
                </Box>
                <Box>
                  <Typography className={classes.title}>
                    {poll.title}
                  </Typography>
                </Box>
                <Box>
                  <Typography>
                    Fecha de fin: {formatDate(poll.end_date)}
                  </Typography>
                </Box>
                <Box>
                  <Chip label={poll.status} />
                </Box>
              </Grid>
              <Grid item xs={5}>
                <Box display="flex" justifyContent="flex-end">
                  <Box>
                    <Typography className={classes.answers} align="center">
                      10
                    </Typography>
                    <Typography className={classes.answersTag} align="center">
                      respuestas
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default PollCard
