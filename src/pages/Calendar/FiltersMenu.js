import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  Box,
  Menu,
  Fade,
  Typography,
  Checkbox,
  makeStyles
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import {
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon
} from '@material-ui/icons'
import { Button, TextField, Select } from '../../components/UI'
import usersActions from '../../state/actions/users'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    [theme.breakpoints.up('md')]: {
      width: '450px'
    }
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '10px',
    gap: '8px'
  }
}))

const FiltersMenu = ({
  open,
  onClose,
  anchorEl,
  handleChangeUsers,
  handleChangeType,
  value
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [selectedUsers, setSelectedUsers] = useState([])

  const [assistanceList, setAssistanceList] = useState([])

  useEffect(() => {
    dispatch(usersActions.getSocialAssistanceList()).then((response) => {
      setAssistanceList(response)
    })
  }, [])

  useEffect(() => {
    handleChangeUsers(selectedUsers.map((item) => item.id))
  }, [selectedUsers])

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
      <Box className={classes.content}>
        <Box width="100%">
          <Typography>Filtros</Typography>
          <Autocomplete
            multiple
            value={selectedUsers}
            options={assistanceList}
            disableCloseOnSelect
            onChange={(__, values) => setSelectedUsers(values)}
            getOptionLabel={(option) =>
              `${option.names} ${option.paternal_surname} ${option.maternal_surname}` ||
              ''
            }
            renderOption={(option) => (
              <>
                <Checkbox
                  color="primary"
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={Boolean(value.users.indexOf(option.id) > -1)}
                />
                {`${option.names} ${option.paternal_surname} ${option.maternal_surname}`.toUpperCase() ||
                  ''}
              </>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Asistentes"
                placeholder="Selecciona a los Asistentes"
              />
            )}
          />
        </Box>
        <Box width="100%">
          <Select
            label="Ver"
            onChange={(e) => handleChangeType(e.target.value)}
          >
            {[
              { key: '', name: 'VER TODO' },
              { key: 'TASKS', name: 'SOLO TAREAS' },
              { key: 'VISITS', name: 'SOLO VISITAS' }
            ].map((item) => (
              <option key={`option-type-${item.key}`} value={item.key}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>

        <Box width="100%" display="flex" justifyContent="center">
          <Button onClick={onClose}>Aceptar</Button>
        </Box>
      </Box>
    </Menu>
  )
}

export default FiltersMenu
