import PropTypes from 'prop-types'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: ({ p }) => ({
    backgroundColor: theme.palette.common.white,
    marginBottom: 15,
    borderRadius: 5,
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(p)
    }
  })
}))

const Wrapper = ({ children, p }) => {
  const classes = useStyles({ p })
  return (
    <Box className={classes.root} p={p} boxShadow={1}>
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
