import { formatRut } from '../../formatters'
import TextField from './CustomTextField'

const RutTextField = ({ label, required, value, onChange, ...props }) => {
  const handleChange = (e) => {
    e.target.value = formatRut(e.target.value)
    onChange(e)
  }
  return (
    <TextField
      value={value}
      label={label}
      required={required}
      onChange={handleChange}
      {...props}
      inputProps={{ maxLength: 12 }}
    />
  )
}

export default RutTextField
