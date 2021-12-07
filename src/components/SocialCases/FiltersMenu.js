import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Box, Menu, Fade } from '@material-ui/core'
import { Select } from '../UI'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      minWidth: '400px'
    }
  }
}))

const FiltersMenu = ({ open, anchorEl, onClose, handleCompanyChange }) => {
  const classes = useStyles()

  const Empresas = [
    {
      id: 1,
      name: 'empresa 1'
    },
    {
      id: 2,
      name: 'empresa 2'
    }
  ]
  return (
    <Menu
      classes={{ paper: classes.root }}
      TransitionComponent={Fade}
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Select name="status" onChange={handleCompanyChange}>
          <option value="">-Seleccione-</option>
          {Empresas.map((item) => (
            <option key={`application--filters-${item.id}`} value={item.name}>
              {item.name}
            </option>
          ))}
        </Select>
      </Box>
    </Menu>
  )
}

export default FiltersMenu
