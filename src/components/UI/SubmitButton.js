import { CircularProgress } from '@material-ui/core'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Check as CheckIcon } from '@material-ui/icons'
import Button from './CustomButton'

const useStyles = makeStyles(() => ({
  iconMargin: {
    marginRight: 4
  }
}))

const SubmitButton = ({
  loading,
  success,
  children,
  disabled,
  onClick,
  size,
  fullWidth,
  ...props
}) => {
  const classes = useStyles()

  return (
    <Button
      disabled={disabled || loading}
      color="primary"
      variant="contained"
      onClick={onClick}
      size={size}
      fullWidth={fullWidth}
      {...props}
    >
      {loading && (
        <CircularProgress
          size={24}
          color="inherit"
          className={classes.iconMargin}
        />
      )}
      {success && (
        <CheckIcon
          color="inherit"
          className={classes.iconMargin}
          style={{ fontSize: 24 }}
        />
      )}
      {children}
    </Button>
  )
}
SubmitButton.defaultProps = {
  fullWidth: false
}

SubmitButton.propTypes = {
  loading: PropTypes.bool
}

export default SubmitButton
