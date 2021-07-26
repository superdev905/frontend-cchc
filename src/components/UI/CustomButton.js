import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  button: ({ color, size, variant }) => ({
    textTransform: 'inherit',
    margin: theme.spacing(1),
    padding: size === 'small' ? '7px 10px' : '10px 14px',
    color:
      color === 'primary' && variant === 'contained'
        ? `${theme.palette.common.white} !important`
        : theme.palette.primary.main,
    [theme.breakpoints.up('md')]: {
      minWidth: `${() => {
        if (size === 'small') return 30
        return 60
      }}px`
    }
  }),
  dangerButton: {
    backgroundColor: theme.palette.error.main,
    '&:focus': {
      backgroundColor: theme.palette.error.main
    },
    '&:hover': {
      backgroundColor: theme.palette.error.main
    }
  }
}))

const CustomButton = ({
  children,
  color,
  variant,
  onClick,
  disabled,
  size,
  danger,
  className,
  ...props
}) => {
  const classes = useStyles({ variant, color, size, danger })
  return (
    <Button
      variant={variant}
      disableElevation
      color={color}
      className={clsx(
        classes.button,
        danger && classes.dangerButton,
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  )
}

CustomButton.defaultProps = {
  danger: false,
  color: 'primary',
  variant: 'contained',
  disabled: false,
  size: 'medium'
}

CustomButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  danger: PropTypes.bool
}

export default CustomButton
