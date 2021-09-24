import { memo } from 'react'
import CountUp from 'react-countup'
import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import CalendarIcon from '@material-ui/icons/CalendarToday'
import { Skeleton } from '@material-ui/lab'
import {
  EditOutlined as EditIcon,
  DeleteOutlineOutlined as DeleteIcon
} from '@material-ui/icons'
import { formatCurrency, formatDate, formatHours } from '../../../formatters'

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
  paper: {
    border: `1px solid ${theme.palette.gray.gray400}`,
    borderRadius: 8,
    [theme.breakpoints.up('md')]: {
      minHeight: 170
    }
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  answers: {
    fontSize: 26,
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
  actions: {
    '& button': {
      padding: 5
    }
  }
}))

const BenefitCard = ({ loader, benefit }) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Box className={classes.paper}>
        {loader ? (
          <>
            <Box p={2}>
              <Box display="flex" marginBottom="10px">
                <Skeleton width="30px"></Skeleton>
                <Skeleton width="40%" style={{ marginLeft: '10px' }}></Skeleton>
              </Box>
              <Grid container>
                <Grid item xs={12} md={10}>
                  <Box>
                    <Box>
                      <Skeleton
                        width="60%"
                        variant="h3"
                        style={{ margin: '18px 0px 5px' }}
                      ></Skeleton>
                      <Skeleton width="20%"></Skeleton>
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
            </Box>
          </>
        ) : (
          <Box p={2}>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Typography className={classes.center}>
                  <CalendarIcon className={classes.calendarIcon} />
                  {`${formatDate(benefit.date)}, ${formatHours(benefit.date)}`}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="flex-end"
                className={classes.actions}
              >
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
            <Grid container>
              <Grid item xs={12} md={10}>
                <Box>
                  <Typography className={classes.title}>
                    {benefit.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography>{benefit.description}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={2} className={classes.answersWrapper}>
                <Box display="flex" justifyContent="flex-end">
                  <Typography className={classes.answers} align="center">
                    <CountUp
                      duration={0.5}
                      start={0}
                      end={benefit.amount}
                      formattingFn={(n) => formatCurrency(n)}
                    ></CountUp>
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

export default memo(BenefitCard)
