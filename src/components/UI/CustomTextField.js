import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Box, InputLabel, TextField, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: '14px',
    color: theme.palette.common.black,
    opacity: 0.7
  },
  input: ({ gray }) => ({
    '& input': {
      backgroundColor: gray ? '#F5F8FA' : 'transparent'
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
  ...props
}) => {
  const classes = useStyles({ gray })
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
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        InputLabelProps={{
          shrink: false
        }}
        inputProps={{
          maxLength: 50,
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
