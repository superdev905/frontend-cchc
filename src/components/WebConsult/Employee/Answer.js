import { MdQuestionAnswer as MessageIcon } from 'react-icons/md'
import { Avatar, Box, makeStyles, Typography } from '@material-ui/core'
import { formatDate, formatHours } from '../../../formatters'
import { COLORS } from '../../../utils/generateColor'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.gray.gray100,
    borderRadius: theme.spacing(1)
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    fontSize: 30,
    color: theme.palette.success.main,
    marginRight: 5
  },
  footer: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  },
  avatar: {
    backgroundColor: COLORS[2],
    marginRight: 5
  },
  user: {
    fontWeight: 'bold'
  }
}))
const Answer = ({ answer }) => {
  const classes = useStyles()
  return (
    <Box p={2} className={classes.root}>
      <Box>
        <Box mb={1}>
          <Typography className={classes.heading}>
            <MessageIcon className={classes.icon} />
            Respuesta
          </Typography>
        </Box>
        <Box my={1}>
          <Typography>{answer.answer}</Typography>
        </Box>
        <Box mt={2} className={classes.footer}>
          <Box display="flex" alignItems="center">
            <Avatar className={classes.avatar}>
              {answer.professional.userNames.charAt(0)}
            </Avatar>
            <Typography className={classes.user}>
              {answer.professional.userNames}
            </Typography>
          </Box>
          <Typography>
            {`${formatDate(answer.date)} - ${formatHours(answer.date)}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

Answer.defaultProps = {
  answer: {
    answer: `It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here'`,
    professional: {
      id: 1,
      names: 'Jhon',
      paternalSurname: 'Doe',
      maternalSurname: 'Doe'
    },
    date: new Date()
  }
}
export default Answer
