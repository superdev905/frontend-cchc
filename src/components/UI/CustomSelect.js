import React from 'react'
import PropTypes from 'prop-types'
import { Box, TextField, InputLabel, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: '15px',
    color: theme.palette.common.black,
    opacity: 0.7
  }
}))

const CustomSelect = ({
  label,
  required,
  onChange,
  children,
  error,
  helperText,
  native,
  ...props
}) => {
  const classes = useStyles()
  return (
    <Box>
      <InputLabel required={required} className={classes.label}>
        {label}
      </InputLabel>
      <TextField
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
        {...props}
      >
        {children}
      </TextField>
    </Box>
  )
}

CustomSelect.defaultProps = {
  required: false,
  native: true
}

CustomSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  required: PropTypes.bool.isRequired
}

export default CustomSelect
