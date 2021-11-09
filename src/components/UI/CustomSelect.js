import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Box, TextField, InputLabel, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: '14px',
    color: theme.palette.common.black,
    opacity: 0.7
  },
  input: ({ readOnly }) => ({
    '&.Mui-disabled': {
      color: readOnly ? 'black' : 'inherit'
    }
  })
}))

const CustomSelect = ({
  label,
  required,
  onChange,
  children,
  error,
  helperText,
  native,
  disabled,
  readOnly,
  className,
  ...props
}) => {
  const classes = useStyles({ readOnly })
  return (
    <Box>
      <InputLabel required={required} className={classes.label}>
        {label}
      </InputLabel>
      <TextField
        className={clsx(classes.input, className)}
        variant="outlined"
        fullWidth
        margin="dense"
        select
        SelectProps={{ native }}
        onChange={onChange}
        error={error}
        helperText={helperText}
        InputLabelProps={{
          shrink: false
        }}
        disabled={disabled || readOnly}
        {...props}
      >
        {children}
      </TextField>
    </Box>
  )
}

CustomSelect.defaultProps = {
  required: false,
  native: true,
  disabled: false,
  readOnly: false
}

CustomSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  required: PropTypes.bool.isRequired
}

export default CustomSelect
