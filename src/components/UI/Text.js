import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

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
        <Skeleton
          width={loaderWidth}
          variant="text"
          className={classes.text}
        ></Skeleton>
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
