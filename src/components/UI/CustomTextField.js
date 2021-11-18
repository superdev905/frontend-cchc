import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Box, InputLabel, TextField, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: '15px',
    color: theme.palette.gray.gray600
  },
  input: ({ gray, error }) => ({
    '& input': {
      backgroundColor: gray ? '#F5F8FA' : 'transparent',
      color: error ? theme.palette.error.main : theme.palette.common.black,
      border: `1px solid ${theme.palette.gray.gray50}`
    }
  })
}))

const CustomTextField = ({
  id,
  fullWidth,
  placeholder,
  label,
  margin,
  variant,
  error,
  helperText,
  onChange,
  onBlur,
  required,
  value,
  inputProps,
  gray,
  className,
  maxLength,
  type,
  ...props
}) => {
  const classes = useStyles({ gray, error })

  const handleOnChange = (event) => {
    if (onChange && type !== 'password') {
      const currentEvent = { ...event }
      currentEvent.target.value = currentEvent.target.value.toUpperCase()
      onChange(currentEvent)
    }
    if (onChange && type === 'password') {
      const currentEventPass = { ...event }
      onChange(currentEventPass)
    }
  }

  return (
    <Box>
      <InputLabel htmlFor={id} className={classes.label} required={required}>
        {label}
      </InputLabel>
      <TextField
        id={id}
        className={clsx(classes.input, className)}
        margin={margin}
        variant={variant}
        fullWidth={fullWidth}
        placeholder={placeholder}
        helperText={helperText}
        error={error}
        onChange={handleOnChange}
        onBlur={onBlur}
        value={value}
        type={type}
        InputLabelProps={{
          shrink: false
        }}
        inputProps={{
          maxLength,
          ...inputProps
        }}
        {...props}
      />
    </Box>
  )
}

CustomTextField.defaultProps = {
  fullWidth: true,
  margin: 'dense',
  variant: 'outlined',
  placeholder: '',
  type: 'text',
  required: false,
  maxLength: 50,
  inputProps: {}
}

CustomTextField.propTypes = {
  margin: PropTypes.oneOf(['dense', 'none', 'normal']),
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
  fullWidth: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  inputProps: PropTypes.object
}

export default CustomTextField
