import React from 'react'
import PropTypes from 'prop-types'
import { InputLabel, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: '15px',
    color: theme.palette.gray.gray600,
    marginBottom: 5
  }
}))
const InputLabelCustom = ({ id, required, children }) => {
  const classes = useStyles()
  return (
    <InputLabel htmlFor={id} className={classes.label} required={required}>
      {children}
    </InputLabel>
  )
}

InputLabelCustom.propTypes = {
  id: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.string
}

export default InputLabelCustom
