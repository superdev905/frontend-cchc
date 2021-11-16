import PropTypes from 'prop-types'
import {
  TextareaAutosize,
  makeStyles,
  Box,
  InputLabel,
  FormHelperText
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: 15,
    color: theme.palette.gray.gray600
  },
  textarea: ({ fullWidth, error }) => ({
    padding: `10px ${theme.spacing(1) + 4}px`,
    width: fullWidth ? '100%' : 'auto',
    borderRadius: 5,
    fontSize: 16,
    margin: '10px 0px 0px 0px',
    border: `1px solid ${
      error ? theme.palette.error.main : theme.palette.gray.gray400
    }`,
    '&&:focus': {
      border: `1px solid ${
        error ? theme.palette.error.main : theme.palette.gray.gray400
      }`,
      outline: 'none'
    }
  })
}))

const TextArea = ({
  rowsMin,
  onChange,
  onBlur,
  value,
  fullWidth,
  label,
  required,
  error,
  helperText,
  ...props
}) => {
  const classes = useStyles({ fullWidth, error })

  const handleOnChange = (event) => {
    if (onChange) {
      const currentEvent = { ...event }
      currentEvent.target.value = currentEvent.target.value.toUpperCase()
      onChange(currentEvent)
    }
  }

  return (
    <Box>
      <InputLabel className={classes.label} required={required}>
        {label}
      </InputLabel>
      <TextareaAutosize
        className={classes.textarea}
        rowsMin={rowsMin}
        onChange={handleOnChange}
        onBlur={onBlur}
        value={value}
        {...props}
      />
      {error && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </Box>
  )
}

TextArea.defaultProps = {
  rowsMin: 4,
  fullWidth: true,
  required: false
}
TextArea.propTypes = {
  rowsMin: PropTypes.number,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  required: PropTypes.bool
}

export default TextArea
