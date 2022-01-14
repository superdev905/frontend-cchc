import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import {
  Box,
  Menu,
  Fade,
  TextField,
  Typography,
  Checkbox
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import {
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon
} from '@material-ui/icons'

import { Button } from '../../components/UI'
import usersActions from '../../state/actions/users'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />
const viewOnlyOp = ['VER TODO', 'SOLO TAREAS', 'SOLO VISITAS']

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      minWidth: '400px'
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
  assistenceListFiltered,
  setAssistenceListFiltered,
  otherFilters,
  setOtherFilters,
  applyFilters
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [assistanceList, setAssistanceList] = useState([])

  const handleChangeAssistance = (value) => {
    if (!value) {
      return
    }
    setAssistenceListFiltered(value)
  }
  const handleChangeView = (value) => {
    if (!value) {
      return
    }
    setOtherFilters({
      ...otherFilters,
      view: value
    })
  }

  useEffect(() => {
    dispatch(usersActions.getSocialAssistanceList()).then((response) => {
      setAssistanceList(response)
    })
  }, [])

  useEffect(() => {
    const ids = []
    if (assistenceListFiltered) {
      assistenceListFiltered.forEach((item) => {
        ids.push(item.id)
      })
      setOtherFilters({
        ...otherFilters,
        assistenceIdList: ids
      })
    }
  }, [assistenceListFiltered])

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
            value={assistenceListFiltered}
            options={assistanceList}
            disableCloseOnSelect
            onChange={(e, value) => handleChangeAssistance(value)}
            getOptionLabel={(option) =>
              `${option.names} ${option.paternal_surname} ${option.maternal_surname}` ||
              ''
            }
            renderOption={(option) => (
              <>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={Boolean(assistenceListFiltered.indexOf(option) > -1)}
                />
                {`${option.names} ${option.paternal_surname} ${option.maternal_surname}` ||
                  ''}
              </>
            )}
            style={{ width: 500 }}
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
          <Autocomplete
            options={viewOnlyOp}
            value={otherFilters.view}
            onChange={(e, value) => handleChangeView(value)}
            getOptionSelected={(option, value) => option === value}
            getOptionLabel={(option) => option || ''}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Ver"
                placeholder=""
              />
            )}
          />
        </Box>

        <Box width="100%" display="flex" justifyContent="center">
          <Button onClick={onClose} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={applyFilters}>Aplicar</Button>
        </Box>
      </Box>
    </Menu>
  )
}

export default FiltersMenu
