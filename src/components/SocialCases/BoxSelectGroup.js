import React from 'react'
import { Box } from '@material-ui/core'

const BoxSelectGroup = ({ list, label, onChange }) => (
  <Box width="100%">
    {label}:
    <Select name={label} onChange={onChange}>
      <option value="">-Seleccione-</option>
      {list.map((item) => (
        <option key={`application--filters-${label}${item.id}`} value={item.id}>
          {item.name}
        </option>
      ))}
    </Select>
  </Box>
)

export default BoxSelectGroup
