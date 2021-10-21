import PropTypes from 'prop-types'
import { Box, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: ({ color }) => ({
    borderRadius: '8px',
    position: 'relative',
    minHeight: '60px',
    backgroundColor: color.bg,
    color: color.main
  }),
  iconWrapper: ({ color }) => ({
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.light,
    marginRight: '10px',
    fontSize: 24
  }),
  data: {
    fontSize: 22,
    fontWeight: 'bold'
  }
}))

const colors = {
  purple: {
    bg: '#F6F4FF',
    light: '#DAD3FE',
    main: '#6453BA'
  },
  primary: {
    bg: '#E6F6FF',
    light: '#BAE7FE',
    main: '#3A72F1'
  }
}

const CardIcon = ({ icon, data, color }) => {
  const classes = useStyles({ color: colors[color] })
  return (
    <Box p={2} className={classes.root}>
      <Box display={'flex'} justifyContent={'center'}>
        <Box display={'flex'} alignItems={'center'}>
          <Box className={classes.iconWrapper}>{icon}</Box>
          <Box>
            <Typography className={classes.data}>{data}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

CardIcon.defaultProps = {
  color: 'primary'
}
CardIcon.propTypes = {
  color: PropTypes.oneOf(['primary', 'purple'])
}

export default CardIcon
