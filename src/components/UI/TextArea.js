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
    fontSize: 14
  },
  textarea: ({ fullWidth, error }) => ({
    padding: `10px ${theme.spacing(1) + 4}px`,
    width: fullWidth ? '100%' : 'auto',
    borderRadius: 5,
    fontSize: 16,
    margin: '10px 0px 0px 0px',
    border: `1px solid ${
      error ? theme.palette.error.main : theme.palette.primary.main
    }`,
    '&&:focus': {
      border: `1px solid ${
        error ? theme.palette.error.main : theme.palette.primary.main
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
  return (
    <Box>
      <InputLabel className={classes.label} required={required}>
        {label}
      </InputLabel>
      <TextareaAutosize
        className={classes.textarea}
        rowsMin={rowsMin}
        onChange={onChange}
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
