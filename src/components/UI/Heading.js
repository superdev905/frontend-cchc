import PropTypes from 'prop-types'
import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  }
})

const Heading = ({ children, align }) => {
  const classes = useStyles()
  return (
    <Typography className={classes.heading} align={align}>
      {children}
    </Typography>
  )
}

Heading.defaultProps = {
  align: 'left'
}

Heading.propTypes = {
  children: PropTypes.string.isRequired
}

export default Heading
