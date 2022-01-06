import { Avatar, Box, makeStyles, Typography } from '@material-ui/core'
import { COLORS } from '../../utils/generateColor'

const useStyles = makeStyles((theme) => ({
  root: {
    border: `2px solid ${theme.palette.gray.gray200}`,
    borderRadius: theme.spacing(1),
    width: '100%'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 14
  },
  avatar: ({ avatarColor }) => ({
    marginRight: '10px',
    width: 55,
    height: 55,
    backgroundColor: avatarColor
  })
}))

const Card = ({ user, avatarColor = COLORS[3] }) => {
  const classes = useStyles({ avatarColor })
  return (
    <Box p={2} className={classes.root}>
      <Box display="flex" alignItems="center">
        <Avatar className={classes.avatar}>
          {`${user.names.charAt(0)}${user.paternalSurname.charAt(
            0
          )}`.toUpperCase()}
        </Avatar>
        <Box>
          <Typography className={classes.name}>
            {`${user.names} ${user.paternalSurname}`.toLocaleUpperCase()}
          </Typography>
          <Typography
            className={classes.info}
          >{`Correo: ${user.email}`}</Typography>
          <Typography className={classes.info}>{`Cargo: ${
            user.charge || 'Sin cargo'
          }`}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Card
