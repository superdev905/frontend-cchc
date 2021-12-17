import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { Box, Menu, Fade, Typography, Grid } from '@material-ui/core'
import { Select, Button } from '../UI'
import common from '../../state/actions/common'
import questionActions from '../../state/actions/questions'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      minWidth: '700px'
    }
  }
}))

const FiltersMenu = ({ open, anchorEl, onClose }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { areas, regions } = useSelector((state) => state.common)
  const { uiFilters, query } = useSelector((state) => state.questions)
  const [localUi, setLocalUi] = useState({ ...uiFilters })
  const [queryLocal, setQueryLocal] = useState({ ...query })
  const closeFilterMenu = () => {
    onClose()
  }

  const handleChange = (e, label) => {
    const { name, value } = e.target
    const updateFilter = { ...localUi }
    const updateQuery = { ...queryLocal }
    updateQuery[name] = value
    updateFilter[name] = {
      label,
      value,
      data: value
    }

    if (updateFilter?.areaId?.value) {
      const foundArea = areas.find(
        (item) => item.id === parseInt(updateFilter.areaId.value, 10)
      )
      updateFilter.areaId = {
        ...updateFilter.areaId,
        data: foundArea.name
      }
    }

    setLocalUi(updateFilter)
    setQueryLocal(updateQuery)
  }

  const applyFilter = () => {
    dispatch(questionActions.updateUIFilters(localUi))
    dispatch(questionActions.updateQuery({ ...query, ...queryLocal }))
    closeFilterMenu()
  }

  useEffect(() => {
    dispatch(common.getAreas())
    dispatch(common.getRegions())
  }, [])

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
      <Box>
        <Box pt={2} px={3}>
          <Box mb={2}>
            <Typography align="center">Filtros</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Select
                name="status"
                label="Estado"
                value={localUi?.status?.value || ''}
                onChange={(e) => handleChange(e, 'Estado')}
              >
                <option value="">Todos</option>
                {['INGRESADO', 'ASIGNADA', 'RESPONDIDA'].map((item) => (
                  <option key={`status-filter${item}`} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Select
                name="areaId"
                label="Area"
                value={localUi?.areaId?.value || ''}
                onChange={(e) => handleChange(e, 'Area')}
              >
                <option value="">Todos</option>
                {areas.map((item) => (
                  <option key={`area-option-${item.id}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Select
                name="delegation"
                label="Delegación"
                value={localUi?.delegation?.value || ''}
                onChange={(e) => handleChange(e, 'Delegación')}
              >
                <option value="">TODOS</option>
                {regions.map((item) => (
                  <option key={`regions-option${item.id}`} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={applyFilter}>Aplicar</Button>
          </Box>
        </Box>
      </Box>
    </Menu>
  )
}

export default FiltersMenu
