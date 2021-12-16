import { useHistory } from 'react-router-dom'
import { Box, Chip, makeStyles, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { formatDate, formatHours } from '../../formatters'

const useStyles = makeStyles((theme) => ({
  root: ({ asCard }) => ({
    border: asCard ? `2px solid ${theme.palette.gray.gray300}` : 'None',
    borderRadius: theme.spacing(1),
    cursor: 'pointer',
    [theme.breakpoints.up('lg')]: {
      display: 'flex'
    }
  }),
  numberWrapper: {
    width: 120,
    borderRadius: 3,
    border: '1px solid ',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    [theme.breakpoints.up('lg')]: {
      width: 140
    }
  },
  numberWrapperLoader: {
    width: 120
  },

  content: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.up('lg')]: {
      width: '100%',
      paddingLeft: theme.spacing(2),
      marginTop: 0
    }
  },
  chip: {
    fontSize: 15,
    marginRight: 5
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold'
  },
  pLoader: {
    height: 17
  }
}))

const Loader = ({ asCard }) => {
  const classes = useStyles({ asCard })
  return (
    <Box p={2} className={classes.root} width="100%">
      <Box className={classes.numberWrapperLoader}>
        <Skeleton width="100%" style={{ fontSize: 18 }} />
      </Box>
      <Box className={classes.content}>
        <Box width="100%">
          <Box>
            <Skeleton width="20%" animation="wave"></Skeleton>
          </Box>
          <Box>
            <Skeleton
              width="40%"
              animation="wave"
              style={{ fontSize: 22 }}
            ></Skeleton>
          </Box>

          <Box>
            <Skeleton
              width="100%"
              animation="wave"
              className={classes.pLoader}
            ></Skeleton>
            <Skeleton
              width="100%"
              animation="wave"
              className={classes.pLoader}
            ></Skeleton>
            <Skeleton
              width="100%"
              animation="wave"
              className={classes.pLoader}
            ></Skeleton>
            <Skeleton
              width="30%"
              animation="wave"
              className={classes.pLoader}
            ></Skeleton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const QuestionCard = ({ question, asCard, children, hideNumber }) => {
  const classes = useStyles({ asCard })
  const history = useHistory()

  const handleClick = (number) => {
    history.push(`/consultas-web/preguntas/${number}`)
  }

  return (
    <Box
      p={2}
      className={classes.root}
      onClick={() => handleClick(question.number)}
    >
      {hideNumber && (
        <Box className={classes.numberWrapper}>{`N° ${question.number}`}</Box>
      )}
      <Box className={classes.content}>
        <Typography style={{ fontSize: 14 }}>
          {`${formatDate(new Date(question.createdDate))} - ${formatHours(
            new Date(question.createdDate)
          )}`}
        </Typography>
        <Box my={1}>
          <Typography className={classes.title}>{question.title}</Typography>
          <Typography>{question.question}</Typography>
        </Box>
        <Box display="flex">
          <Chip
            className={classes.chip}
            variant="oulined"
            label={`Estado: ${question.status}`}
            size="medium"
          />
          <Chip
            className={classes.chip}
            variant="oulined"
            label={`Area: ${question.areaName}`}
            size="medium"
          />
        </Box>
        {children && <Box mt={2}>{children}</Box>}
      </Box>
    </Box>
  )
}

QuestionCard.defaultProps = {
  asCard: true
}

QuestionCard.Loader = Loader

export default QuestionCard
