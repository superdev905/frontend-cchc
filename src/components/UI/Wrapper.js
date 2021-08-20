import PropTypes from 'prop-types'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.common.white,
    marginBottom: 15,
    borderRadius: 5
  }
}))

const Wrapper = ({ children, p }) => {
  const classes = useStyles()
  return (
    <Box className={classes.root} p={p}>
      {children}
    </Box>
  )
}

Wrapper.defaultProps = {
  p: 2
}

Wrapper.propTypes = {
  children: PropTypes.element,
  p: PropTypes.number
}

export default Wrapper
