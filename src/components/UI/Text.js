import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Box, makeStyles, Typography } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles(() => ({
  text: {
    fontSize: 16
  }
}))

const Text = ({ loading, loaderWidth, children, className }) => {
  const classes = useStyles()
  return (
    <Box>
      {loading ? (
        <LinearProgress width={loaderWidth} />
      ) : (
        <Typography className={clsx(classes.text, className)}>
          {children}
        </Typography>
      )}
    </Box>
  )
}

Text.defaultProps = {
  loaderWidth: '50%'
}

Text.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}

export default Text
