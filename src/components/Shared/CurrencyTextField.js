import NumberFormat from 'react-number-format'
import { TextField } from '../UI'

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        })
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  )
}

const CurrencyTextField = ({ ...props }) => (
  <TextField
    InputProps={{
      inputComponent: NumberFormatCustom
    }}
    {...props}
  />
)

export default CurrencyTextField
