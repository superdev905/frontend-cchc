import React from 'react'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import ViewIcon from '@material-ui/icons/Visibility'
import { Skeleton } from '@material-ui/lab'
import { useSelector } from 'react-redux'
import { formatDate } from '../../formatters'

const useStyles = makeStyles((theme) => ({
  root: ({ isMobile }) => ({
    marginBottom: theme.spacing(2),
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    cursor: isMobile ? 'pointer' : 'inherit'
  }),
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  user: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  timeStamp: {
    fontSize: 14,
    opacity: 0.7
  },
  infoWrapper: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    marginBottom: 5,
    [theme.breakpoints.up('md')]: {
      marginBottom: 0
    }
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  },
  headingRoot: {
    marginBottom: 10
  },
  loaderUser: {
    width: 'calc(100% - 50px)',
    marginLeft: 10
  },
  pollTitle: {
    marginLeft: 'calc(50% - 50px)',
    fontSize: '20px'
  }
}))

const Heading = () => {
  const classes = useStyles()

  return (
    <Box className={classes.headingRoot}>
      <Grid container>
        <Grid item xs={12} md={4}>
          Nombres y Apellidos
        </Grid>
        <Grid item xs={12} md={3} className={classes.infoWrapper}>
          Cargo
        </Grid>
        <Grid item xs={12} md={3} className={classes.infoWrapper}>
          Fecha de respuesta
        </Grid>
      </Grid>
    </Box>
  )
}
const AnswerRow = ({ answer, loader, onView }) => {
  const { isMobile } = useSelector((state) => state.ui)
  const classes = useStyles({ isMobile })

  return (
    <Box
      className={classes.root}
      onClick={() => {
        if (isMobile) {
          onView()
        }
      }}
    >
      <Box p={2}>
        {loader ? (
          <Grid container>
            <Grid item xs={12} md={4}>
              <Box display="flex">
                <Skeleton
                  animation="wave"
                  variant="circle"
                  width={40}
                  height={40}
                />
                <Box className={classes.loaderUser}>
                  <Skeleton
                    variant="h3"
                    width="80%"
                    animation="wave"
                  ></Skeleton>
                  <Skeleton width="60%" animation="wave"></Skeleton>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3} className={classes.infoWrapper}>
              <Skeleton width="80%" animation="wave"></Skeleton>
            </Grid>
            <Grid item xs={12} md={3} className={classes.infoWrapper}>
              <Skeleton width="80%" animation="wave"></Skeleton>
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid item xs={12} md={4}>
              <Box display="flex">
                <Box className={classes.center} marginRight="10px">
                  <Avatar>{answer.userFullName.charAt(0).toUpperCase()}</Avatar>
                </Box>
                <Box>
                  <Typography className={classes.user}>
                    {answer.userFullName}
                  </Typography>
                  <Typography className={classes.timeStamp}>
                    {answer.created_timestamp}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3} className={classes.infoWrapper}>
              <Typography>{answer.user_charge} </Typography>
            </Grid>
            <Grid item xs={12} md={3} className={classes.infoWrapper}>
              {formatDate(answer.date)}
            </Grid>
            {!isMobile && (
              <Grid item xs={12} md={2}>
                <Box className={classes.actions}>
                  <IconButton>
                    <ViewIcon onClick={onView} />
                  </IconButton>
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </Box>
  )
}

AnswerRow.defaultProps = {
  answer: {
    userFullName: `Meredith Volkov Smith`,
    charge: 'Asistente social',
    createdStamp: 'Hace 1 hora',
    date: new Date()
  }
}

AnswerRow.propTypes = {
  answer: PropTypes.object
}

AnswerRow.Heading = Heading

export default AnswerRow
